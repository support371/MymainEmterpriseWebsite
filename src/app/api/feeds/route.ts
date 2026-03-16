import { NextRequest, NextResponse } from 'next/server';
import { getAllArticles, getArticlesByCategory, getFeedStats } from '@/lib/feeds/feed-store';
import type { FeedCategory } from '@/lib/feeds/providers';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category') as FeedCategory | null;
  const statsOnly = req.nextUrl.searchParams.get('stats');

  if (statsOnly === '1') {
    const stats = await getFeedStats();
    return NextResponse.json({ stats });
  }

  const articles = category
    ? await getArticlesByCategory(category)
    : await getAllArticles();

  const stats = await getFeedStats();

  return NextResponse.json({
    articles: articles.slice(0, 60),
    stats,
  });
}
