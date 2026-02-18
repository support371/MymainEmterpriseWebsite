import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'gem-cyber-web',
    timestamp: new Date().toISOString(),
  });
}
