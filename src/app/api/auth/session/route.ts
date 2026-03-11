import { NextResponse } from 'next/server';
import { getCurrentPortalSession } from '@/lib/auth/session';

export async function GET() {
  const session = await getCurrentPortalSession();
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    authenticated: true,
    userId: session.userId,
    email: session.email,
    name: session.name,
    role: session.role,
  });
}
