import { NextResponse } from 'next/server';
import { appRoutes, legacyRedirects } from '@/lib/siteRoutes';

export async function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    routes: appRoutes,
    redirects: legacyRedirects,
    totals: {
      routes: appRoutes.length,
      redirects: legacyRedirects.length,
    },
  });
}
