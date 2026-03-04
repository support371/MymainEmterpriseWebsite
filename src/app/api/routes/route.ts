import { NextResponse } from 'next/server';
import { legacyRedirects, routeCoverage } from '@/data/routeInventory';

export async function GET() {
  return NextResponse.json({
    routes: routeCoverage,
    redirects: legacyRedirects,
    generatedAt: new Date().toISOString(),
  });
}
