import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'gem-cyber-web',
    timestamp: new Date().toISOString(),
  });
}
