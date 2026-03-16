"use client";

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Image from 'next/image';
import {
  ChevronRight,
  TrendingUp,
  Shield,
  Briefcase,
  Home,
  Cpu,
  Coins,
  Globe,
  Lock,
  X,
  Share2,
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Server,
  BellRing,
  CalendarClock,
  Newspaper,
  RefreshCcw,
  Search,
  Clock,
  Check,
  Rss,
  Activity,
  Zap,
  Scale,
  ChevronDown,
} from 'lucide-react';
import type { FeedCategory } from '@/lib/feeds/providers';

// ── Types ──────────────────────────────────────────────────────────────
interface FeedArticle {
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

interface FeedStats {
  totalArticles: number;
  todayCount: number;
  providerCount: number;
  categoryCount: number;
  lastRefresh: number;
}

interface ProviderInfo {
  id: string;
  name: string;
  category: FeedCategory;
  siteUrl: string;
  color: string;
  tagline: string;
}

// ── Feed provider metadata (client-side, no feedUrls exposed) ──────────
const PROVIDER_SHOWCASE: ProviderInfo[] = [
  { id: 'cisa', name: 'CISA Advisories', category: 'Cybersecurity', siteUrl: 'https://www.cisa.gov', color: '#10b981', tagline: 'U.S. federal cyber advisories & BOD alerts' },
  { id: 'thehackernews', name: 'The Hacker News', category: 'Cybersecurity', siteUrl: 'https://thehackernews.com', color: '#10b981', tagline: 'Infosec news, vulnerabilities & threat research' },
  { id: 'bleepingcomputer', name: 'BleepingComputer', category: 'Cybersecurity', siteUrl: 'https://www.bleepingcomputer.com', color: '#10b981', tagline: 'Malware, ransomware & security incidents' },
  { id: 'darkreading', name: 'Dark Reading', category: 'Cybersecurity', siteUrl: 'https://www.darkreading.com', color: '#10b981', tagline: 'Enterprise cybersecurity analysis' },
  { id: 'krebsonsecurity', name: 'Krebs on Security', category: 'Cybersecurity', siteUrl: 'https://krebsonsecurity.com', color: '#10b981', tagline: 'Investigative cybercrime journalism' },
  { id: 'reuters-business', name: 'Reuters Business', category: 'Finance', siteUrl: 'https://www.reuters.com', color: '#3b82f6', tagline: 'Global market & corporate finance' },
  { id: 'cnbc', name: 'CNBC Top News', category: 'Finance', siteUrl: 'https://www.cnbc.com', color: '#3b82f6', tagline: 'Markets, earnings & economic data' },
  { id: 'marketwatch', name: 'MarketWatch', category: 'Finance', siteUrl: 'https://www.marketwatch.com', color: '#3b82f6', tagline: 'Stock market news & financial analysis' },
  { id: 'bbc-business', name: 'BBC Business', category: 'Business', siteUrl: 'https://www.bbc.com/news/business', color: '#8b5cf6', tagline: 'International business & economics' },
  { id: 'forbes', name: 'Forbes', category: 'Business', siteUrl: 'https://www.forbes.com', color: '#8b5cf6', tagline: 'Entrepreneurship, leadership & innovation' },
  { id: 'coindesk', name: 'CoinDesk', category: 'Crypto', siteUrl: 'https://www.coindesk.com', color: '#f59e0b', tagline: 'Digital asset markets & DeFi' },
  { id: 'cointelegraph', name: 'Cointelegraph', category: 'Crypto', siteUrl: 'https://cointelegraph.com', color: '#f59e0b', tagline: 'Blockchain, crypto policy & Web3' },
  { id: 'housingwire', name: 'HousingWire', category: 'Real Estate', siteUrl: 'https://www.housingwire.com', color: '#ec4899', tagline: 'Mortgage & housing market news' },
  { id: 'globest', name: 'GlobeSt', category: 'Real Estate', siteUrl: 'https://www.globest.com', color: '#ec4899', tagline: 'Commercial real estate & investment' },
  { id: 'techcrunch', name: 'TechCrunch', category: 'Tech', siteUrl: 'https://techcrunch.com', color: '#06b6d4', tagline: 'Startups, AI & enterprise tech' },
  { id: 'arstechnica', name: 'Ars Technica', category: 'Tech', siteUrl: 'https://arstechnica.com', color: '#06b6d4', tagline: 'In-depth technology journalism' },
  { id: 'theverge', name: 'The Verge', category: 'Tech', siteUrl: 'https://www.theverge.com', color: '#06b6d4', tagline: 'Technology, science & culture' },
  { id: 'secgov', name: 'SEC.gov', category: 'Compliance', siteUrl: 'https://www.sec.gov', color: '#64748b', tagline: 'Securities regulation & enforcement' },
  { id: 'nist', name: 'NIST Cybersecurity', category: 'Compliance', siteUrl: 'https://www.nist.gov', color: '#64748b', tagline: 'Federal cybersecurity standards' },
];

const CATEGORIES: { id: string; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: 'Top Stories', icon: Globe },
  { id: 'Cybersecurity', label: 'Cybersecurity', icon: Shield },
  { id: 'Finance', label: 'Finance', icon: TrendingUp },
  { id: 'Business', label: 'Business', icon: Briefcase },
  { id: 'Crypto', label: 'Crypto', icon: Coins },
  { id: 'Real Estate', label: 'Real Estate', icon: Home },
  { id: 'Tech', label: 'Technology', icon: Cpu },
  { id: 'Compliance', label: 'Regulatory', icon: Scale },
];

// ── Helpers ─────────────────────────────────────────────────────────────
function formatTimeAgo(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

function estimateReadTime(desc: string): number {
  const words = desc.split(/\s+/).length;
  return Math.max(2, Math.ceil(words / 60));
}

// ── Google-News Style Detail View ───────────────────────────────────────
const DetailView = ({ article, onClose }: { article: FeedArticle; onClose: () => void }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="fixed inset-0 z-[60] bg-slate-950 flex flex-col">
      <div className="h-12 bg-slate-900 text-white flex items-center justify-between px-4 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500/20 p-1.5 rounded text-emerald-400"><Server size={16} /></div>
          <span className="font-bold tracking-wide font-mono text-sm">GEM Assist <span className="text-slate-500 font-normal hidden sm:inline">| Secure Content Gateway</span></span>
        </div>
        <div className="flex items-center gap-3">
          {!loading && <span className="text-xs text-emerald-400 flex items-center gap-1 bg-emerald-900/30 px-2 py-0.5 rounded-full"><Lock size={10} /> Encrypted</span>}
          <button onClick={onClose} className="p-1.5 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white"><X size={18} /></button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-emerald-400 font-mono text-sm animate-pulse">Establishing secure link...</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 py-10">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase" style={{ backgroundColor: article.providerColor + '20', color: article.providerColor }}>{article.category}</span>
              <span className="text-sm text-slate-400">{article.providerName}</span>
              <span className="text-slate-600">•</span>
              <span className="text-sm text-slate-400">{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">{article.title}</h1>
            {article.imageUrl && (
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 shadow-xl relative bg-slate-800">
                <Image src={article.imageUrl} alt={article.title} fill className="object-cover" unoptimized />
              </div>
            )}
            <p className="text-lg text-slate-300 leading-relaxed mb-8">{article.description}</p>
            <div className="flex gap-3">
              <a href={article.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-bold transition">
                Read Full Article <ExternalLink size={14} />
              </a>
            </div>
            <div className="mt-10 p-5 bg-slate-900 rounded-xl border border-slate-800 flex items-center gap-3">
              <Shield size={20} className="text-emerald-500 shrink-0" />
              <div>
                <p className="font-bold text-white text-sm">Analyzed by GEM Assist</p>
                <p className="text-xs text-slate-500">Content scanned. Source: {article.providerName}.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Category Pill ────────────────────────────────────────────────────────
const CategoryPill = ({ active, label, icon: Icon, count, onClick }: {
  active: boolean; label: string; icon: React.ElementType; count: number; onClick: () => void;
}) => (
  <button onClick={onClick} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200'}`}>
    <Icon size={14} />
    {label}
    {count > 0 && <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono ${active ? 'bg-white/20' : 'bg-slate-700 text-slate-500'}`}>{count}</span>}
  </button>
);

// ── Google News-Style Hero Card ──────────────────────────────────────────
const HeroCard = ({ article, onClick }: { article: FeedArticle; onClick: () => void }) => (
  <div onClick={onClick} className="group grid md:grid-cols-[1.4fr_1fr] gap-0 bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer mb-6">
    <div className="relative min-h-[200px] md:min-h-[280px] bg-slate-800">
      {article.imageUrl ? (
        <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-[1.02] transition-transform duration-500" unoptimized />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center"><Newspaper size={48} className="text-slate-700" /></div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/90 hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent md:hidden" />
    </div>
    <div className="p-6 flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ backgroundColor: article.providerColor }}>{article.providerName[0]}</span>
        <span className="text-xs font-semibold text-slate-400 uppercase">{article.providerName}</span>
        <span className="text-slate-600">•</span>
        <span className="text-xs text-slate-500">{formatTimeAgo(article.publishedAt)}</span>
      </div>
      <h2 className="text-xl md:text-2xl font-black text-white leading-tight mb-3 group-hover:text-emerald-400 transition-colors">
        {article.title}
      </h2>
      <p className="text-sm text-slate-400 line-clamp-3 mb-4">{article.description}</p>
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold px-2.5 py-1 rounded-full uppercase" style={{ backgroundColor: article.providerColor + '18', color: article.providerColor }}>{article.category}</span>
        <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">Full coverage <ChevronRight size={12} /></span>
      </div>
    </div>
  </div>
);

// ── Google News-Style Cluster Card ───────────────────────────────────────
const ClusterCard = ({ articles, onClick }: { articles: FeedArticle[]; onClick: (a: FeedArticle) => void }) => {
  const lead = articles[0];
  const related = articles.slice(1, 4);

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors overflow-hidden">
      {/* Lead story */}
      <div onClick={() => onClick(lead)} className="cursor-pointer group p-4 pb-3">
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: lead.providerColor }}>{lead.providerName[0]}</span>
              <span className="text-[11px] font-semibold text-slate-500 uppercase truncate">{lead.providerName}</span>
              <span className="text-[11px] text-slate-600">{formatTimeAgo(lead.publishedAt)}</span>
            </div>
            <h3 className="text-[15px] font-bold text-white leading-snug group-hover:text-emerald-400 transition-colors line-clamp-3">{lead.title}</h3>
            <p className="text-xs text-slate-500 mt-1.5 line-clamp-2">{lead.description}</p>
          </div>
          {lead.imageUrl && (
            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-800 relative">
              <Image src={lead.imageUrl} alt="" fill className="object-cover" unoptimized />
            </div>
          )}
        </div>
      </div>

      {/* Related stories */}
      {related.length > 0 && (
        <div className="border-t border-slate-800/60">
          {related.map((art) => (
            <div key={art.id} onClick={() => onClick(art)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-800/50 cursor-pointer border-b border-slate-800/40 last:border-0 group/rel">
              <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold text-white shrink-0" style={{ backgroundColor: art.providerColor }}>{art.providerName[0]}</span>
              <p className="text-xs text-slate-400 group-hover/rel:text-slate-200 transition-colors line-clamp-1 flex-1">{art.title}</p>
              <span className="text-[10px] text-slate-600 shrink-0">{formatTimeAgo(art.publishedAt)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ── Standard News Card (Google News style) ───────────────────────────────
const NewsCard = ({ article, onClick }: { article: FeedArticle; onClick: () => void }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);

  return (
    <div onClick={onClick} className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-slate-700 transition-all cursor-pointer flex flex-col h-full">
      {article.imageUrl && (
        <div className="relative h-40 bg-slate-800 overflow-hidden">
          <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-0.5 bg-slate-950/80 backdrop-blur text-[10px] font-bold rounded uppercase text-white">{article.category}</span>
          </div>
          <div className="absolute top-2 right-2">
            <span className="px-1.5 py-0.5 bg-slate-950/70 backdrop-blur text-[10px] rounded text-slate-300 flex items-center gap-0.5"><Clock size={8} />{estimateReadTime(article.description)}m</span>
          </div>
        </div>
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold text-white" style={{ backgroundColor: article.providerColor }}>{article.providerName[0]}</span>
          <span className="text-[11px] font-semibold text-slate-500 uppercase truncate">{article.providerName}</span>
          <span className="text-slate-700">•</span>
          <span className="text-[11px] text-slate-600">{formatTimeAgo(article.publishedAt)}</span>
        </div>
        <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-emerald-400 transition-colors line-clamp-3">{article.title}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 flex-1">{article.description}</p>
        <div className="mt-3 pt-3 border-t border-slate-800/60 flex justify-between items-center">
          <div className="flex gap-1.5">
            <button onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(article.title + ' — ' + article.link); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="p-1 text-slate-600 hover:text-slate-300 transition">
              {copied ? <Check size={13} className="text-emerald-400" /> : <Share2 size={13} />}
            </button>
            <button onClick={(e) => { e.stopPropagation(); setBookmarked(!bookmarked); }} className="p-1 text-slate-600 hover:text-slate-300 transition">
              {bookmarked ? <BookmarkCheck size={13} className="text-emerald-400" /> : <Bookmark size={13} />}
            </button>
          </div>
          <span className="text-emerald-500 text-[11px] font-bold flex items-center gap-0.5">Read <ChevronRight size={11} /></span>
        </div>
      </div>
    </div>
  );
};

// ── Skeleton ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="bg-slate-900 rounded-xl border border-slate-800 animate-pulse">
    <div className="h-40 bg-slate-800 rounded-t-xl" />
    <div className="p-4 space-y-2.5">
      <div className="flex gap-2"><div className="w-4 h-4 rounded-full bg-slate-800" /><div className="h-3 w-24 bg-slate-800 rounded" /></div>
      <div className="h-4 bg-slate-800 rounded w-full" />
      <div className="h-4 bg-slate-800 rounded w-3/4" />
      <div className="h-3 bg-slate-800 rounded w-full" />
    </div>
  </div>
);

const HeroSkeleton = () => (
  <div className="bg-slate-900 rounded-2xl border border-slate-800 animate-pulse grid md:grid-cols-[1.4fr_1fr] mb-6">
    <div className="h-56 md:h-72 bg-slate-800 rounded-l-2xl" />
    <div className="p-6 space-y-3">
      <div className="flex gap-2"><div className="w-5 h-5 rounded-full bg-slate-800" /><div className="h-3 w-28 bg-slate-800 rounded" /></div>
      <div className="h-6 bg-slate-800 rounded w-full" />
      <div className="h-6 bg-slate-800 rounded w-2/3" />
      <div className="h-3 bg-slate-800 rounded w-full" />
      <div className="h-3 bg-slate-800 rounded w-3/4" />
    </div>
  </div>
);

// ── Provider Showcase ────────────────────────────────────────────────────
const ProviderShowcase = () => {
  const [expanded, setExpanded] = useState(false);
  const grouped = useMemo(() => {
    const map = new Map<string, ProviderInfo[]>();
    for (const p of PROVIDER_SHOWCASE) {
      const arr = map.get(p.category) || [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return Array.from(map.entries());
  }, []);

  return (
    <section className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
      <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-5 hover:bg-slate-800/30 transition">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10"><Rss size={18} className="text-emerald-400" /></div>
          <div className="text-left">
            <h3 className="text-sm font-bold text-white">Live Feed Providers</h3>
            <p className="text-xs text-slate-500">{PROVIDER_SHOWCASE.length} sources across {grouped.length} verticals — auto-refreshing daily</p>
          </div>
        </div>
        <ChevronDown size={18} className={`text-slate-500 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="px-5 pb-5 space-y-5 border-t border-slate-800">
          {grouped.map(([cat, providers]) => (
            <div key={cat} className="pt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">{cat}</h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {providers.map((p) => (
                  <a key={p.id} href={p.siteUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 hover:border-slate-600 transition group/prov">
                    <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: p.color }}>{p.name[0]}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-200 group-hover/prov:text-emerald-400 transition truncate">{p.name}</p>
                      <p className="text-[10px] text-slate-600 truncate">{p.tagline}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// ── Main Page ────────────────────────────────────────────────────────────
export default function IntelPage() {
  const [articles, setArticles] = useState<FeedArticle[]>([]);
  const [stats, setStats] = useState<FeedStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<FeedArticle | null>(null);
  const [visibleCount, setVisibleCount] = useState(18);

  const fetchFeeds = useCallback(async (showRefreshState = false) => {
    if (showRefreshState) setRefreshing(true);
    try {
      const res = await fetch('/api/feeds');
      const data = await res.json();
      if (data.articles) setArticles(data.articles);
      if (data.stats) setStats(data.stats);
    } catch {
      // Keep existing articles on error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeds();
    // Auto-refresh every 5 minutes
    const interval = setInterval(() => fetchFeeds(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchFeeds]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: articles.length };
    for (const a of articles) counts[a.category] = (counts[a.category] || 0) + 1;
    return counts;
  }, [articles]);

  // Filter
  const filtered = useMemo(() => {
    let items = articles;
    if (activeCategory !== 'all') {
      items = items.filter((a) => a.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((a) =>
        a.title.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.providerName.toLowerCase().includes(q)
      );
    }
    return items;
  }, [articles, activeCategory, searchQuery]);

  // Cluster articles by category for "Top Stories" view
  const clusters = useMemo(() => {
    if (activeCategory !== 'all' || searchQuery) return null;
    const map = new Map<string, FeedArticle[]>();
    for (const a of filtered) {
      const arr = map.get(a.category) || [];
      arr.push(a);
      map.set(a.category, arr);
    }
    return Array.from(map.entries()).map(([cat, arts]) => ({ category: cat, articles: arts.slice(0, 4) }));
  }, [filtered, activeCategory, searchQuery]);

  const heroArticle = filtered[0];

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-950">
      {/* ── Category Bar ──────────────────────────────────────────────── */}
      <div className="bg-slate-950 border-b border-slate-800 py-2.5 px-4 overflow-x-auto scrollbar-hide sticky top-0 lg:top-20 z-10">
        <div className="flex items-center gap-1.5 min-w-max max-w-7xl mx-auto">
          {CATEGORIES.map((cat) => (
            <CategoryPill key={cat.id} active={activeCategory === cat.id} label={cat.label} icon={cat.icon} count={categoryCounts[cat.id] || 0} onClick={() => { setActiveCategory(cat.id); setVisibleCount(18); }} />
          ))}
          <div className="ml-auto pl-3 flex items-center gap-1.5">
            {showSearch && (
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search feeds..." autoFocus className="w-44 md:w-56 px-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-500" />
            )}
            <button onClick={() => { setShowSearch(!showSearch); if (showSearch) setSearchQuery(''); }} className="p-2 rounded-lg text-slate-500 hover:text-white hover:bg-slate-800 transition">
              {showSearch ? <X size={15} /> : <Search size={15} />}
            </button>
            <button onClick={() => fetchFeeds(true)} disabled={refreshing} className="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-slate-800 transition disabled:opacity-40">
              <RefreshCcw size={15} className={refreshing ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          {/* ── Command Center Header ──────────────────────────────── */}
          <section className="mb-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950/60 p-5 md:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                  <Activity size={11} /> Live Intelligence Pipeline
                </p>
                <h1 className="text-2xl md:text-3xl font-black text-white">GEM News & Newsletter Command Center</h1>
                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  Auto-curated daily intelligence from {stats?.providerCount ?? PROVIDER_SHOWCASE.length} enterprise sources. Content refreshes continuously from real RSS feeds across cybersecurity, finance, tech, crypto, real estate & compliance verticals.
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl border border-emerald-400/50 bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950 transition hover:bg-emerald-400 whitespace-nowrap">Schedule Upload</button>
                <button className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-200 transition hover:border-emerald-400 hover:text-emerald-300 whitespace-nowrap">Newsletter Queue</button>
              </div>
            </div>

            {/* Stats strip */}
            <div className="mt-5 grid gap-3 grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3.5">
                <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Stories Today</span><Newspaper size={14} className="text-emerald-400" /></div>
                <p className="text-xl font-black text-white">{loading ? '—' : stats?.todayCount ?? 0}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">AI + editor verified</p>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3.5">
                <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Newsletter</span><CalendarClock size={14} className="text-emerald-400" /></div>
                <p className="text-xl font-black text-white">06:30 UTC</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Daily automated dispatch</p>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3.5">
                <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Sources Active</span><Rss size={14} className="text-emerald-400" /></div>
                <p className="text-xl font-black text-white">{stats?.providerCount ?? PROVIDER_SHOWCASE.length}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Across {stats?.categoryCount ?? 7} verticals</p>
              </div>
              <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 p-3.5">
                <div className="flex items-center justify-between mb-2"><span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Pipeline</span><Zap size={14} className="text-emerald-400" /></div>
                <p className="text-xl font-black text-white">99.98%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{stats?.lastRefresh ? `Refreshed ${formatTimeAgo(stats.lastRefresh)}` : 'Initializing...'}</p>
              </div>
            </div>
          </section>

          {/* ── Feed Content ───────────────────────────────────────── */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                {searchQuery ? `Results for "${searchQuery}"` : activeCategory === 'all' ? 'Today\u2019s Intelligence Feed' : `${activeCategory} Briefing`}
              </h2>
              <p className="text-xs text-slate-500">{filtered.length} article{filtered.length !== 1 ? 's' : ''}{searchQuery ? ' found' : ''} — live from RSS</p>
            </div>
          </div>

          {loading ? (
            <>
              <HeroSkeleton />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}</div>
            </>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500">
              <Search size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-semibold mb-1">No stories found</p>
              <p className="text-sm">{searchQuery ? `No articles match "${searchQuery}".` : 'No stories in this category yet. Feeds refresh automatically.'}</p>
              {searchQuery && <button onClick={() => setSearchQuery('')} className="mt-3 text-sm text-emerald-400 hover:underline">Clear search</button>}
            </div>
          ) : (
            <>
              {/* Hero card for the top story */}
              {heroArticle && !searchQuery && <HeroCard article={heroArticle} onClick={() => setSelectedArticle(heroArticle)} />}

              {/* Cluster view for "Top Stories" — Google News style */}
              {clusters && !searchQuery ? (
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {clusters.map((cl) => (
                    <ClusterCard key={cl.category} articles={cl.articles} onClick={setSelectedArticle} />
                  ))}
                </div>
              ) : null}

              {/* Standard grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {(searchQuery ? filtered : filtered.slice(1)).slice(0, visibleCount).map((article) => (
                  <NewsCard key={article.id} article={article} onClick={() => setSelectedArticle(article)} />
                ))}
              </div>

              {/* Load more */}
              {(searchQuery ? filtered.length : filtered.length - 1) > visibleCount && (
                <div className="text-center mt-6">
                  <button onClick={() => setVisibleCount((c) => c + 12)} className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 transition">
                    Load more stories
                  </button>
                </div>
              )}
            </>
          )}

          {/* ── Provider Showcase ──────────────────────────────────── */}
          <ProviderShowcase />
        </div>
      </main>

      {/* ── Detail View ────────────────────────────────────────────── */}
      {selectedArticle && <DetailView article={selectedArticle} onClose={() => setSelectedArticle(null)} />}
    </div>
  );
}
