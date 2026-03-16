/**
 * In-memory feed article store with automatic refresh.
 * Fetches RSS feeds from all enabled providers, parses them,
 * and caches results. Re-fetches when cache expires.
 */

import { getEnabledProviders, type FeedProvider, type FeedCategory } from './providers';
import { parseRssFeed, type ParsedFeedItem } from './parse-rss';

export interface FeedArticle {
  id: string;
  providerId: string;
  providerName: string;
  providerColor: string;
  category: FeedCategory;
  title: string;
  link: string;
  description: string;
  imageUrl: string | null;
  publishedAt: number;
  fetchedAt: number;
}

interface CacheEntry {
  articles: FeedArticle[];
  fetchedAt: number;
  expiresAt: number;
}

const cache: Map<string, CacheEntry> = new Map();

/** Global merged feed cache */
let mergedCache: { articles: FeedArticle[]; builtAt: number } = { articles: [], builtAt: 0 };
const MERGED_TTL = 5 * 60 * 1000; // 5 min

function timeAgo(dateStr: string): number {
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? Date.now() : d.getTime();
}

async function fetchProviderFeed(provider: FeedProvider): Promise<FeedArticle[]> {
  const cached = cache.get(provider.id);
  if (cached && Date.now() < cached.expiresAt) {
    return cached.articles;
  }

  try {
    const res = await fetch(provider.feedUrl, {
      signal: AbortSignal.timeout(8000),
      headers: { 'User-Agent': 'GEM-Cyber-Intel/1.0' },
    });

    if (!res.ok) {
      // Return stale cache if available
      if (cached) return cached.articles;
      return [];
    }

    const xml = await res.text();
    const items = parseRssFeed(xml);

    const articles: FeedArticle[] = items.map((item, idx) => ({
      id: `${provider.id}_${idx}_${Date.now()}`,
      providerId: provider.id,
      providerName: provider.name,
      providerColor: provider.color,
      category: provider.category,
      title: item.title,
      link: item.link,
      description: item.description,
      imageUrl: item.imageUrl,
      publishedAt: timeAgo(item.pubDate),
      fetchedAt: Date.now(),
    }));

    const entry: CacheEntry = {
      articles,
      fetchedAt: Date.now(),
      expiresAt: Date.now() + provider.refreshMinutes * 60 * 1000,
    };
    cache.set(provider.id, entry);

    return articles;
  } catch {
    const cached = cache.get(provider.id);
    if (cached) return cached.articles;
    return [];
  }
}

/**
 * Get all articles from all enabled providers, merged and sorted by date.
 * Results are cached for 5 minutes to avoid hammering feeds on every page load.
 */
export async function getAllArticles(): Promise<FeedArticle[]> {
  if (mergedCache.articles.length > 0 && Date.now() - mergedCache.builtAt < MERGED_TTL) {
    return mergedCache.articles;
  }

  const providers = getEnabledProviders();

  // Fetch all providers in parallel with individual timeouts
  const results = await Promise.allSettled(
    providers.map((p) => fetchProviderFeed(p))
  );

  const articles: FeedArticle[] = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value);
    }
  }

  // Sort by publish date descending (newest first)
  articles.sort((a, b) => b.publishedAt - a.publishedAt);

  mergedCache = { articles, builtAt: Date.now() };
  return articles;
}

/**
 * Get articles filtered by category.
 */
export async function getArticlesByCategory(category: FeedCategory): Promise<FeedArticle[]> {
  const all = await getAllArticles();
  return all.filter((a) => a.category === category);
}

/**
 * Get feed stats for the automation panel.
 */
export async function getFeedStats() {
  const all = await getAllArticles();
  const providers = getEnabledProviders();
  const now = Date.now();
  const today = all.filter((a) => now - a.publishedAt < 24 * 60 * 60 * 1000);
  const categories = new Set(all.map((a) => a.category));

  return {
    totalArticles: all.length,
    todayCount: today.length,
    providerCount: providers.length,
    categoryCount: categories.size,
    lastRefresh: mergedCache.builtAt || now,
  };
}
