import { NextRequest, NextResponse } from 'next/server';
import { PORTAL_COOKIE, getCurrentPortalSession } from '@/lib/auth/session';
import { audit } from '@/lib/audit';

export async function POST(request: NextRequest) {
  const session = await getCurrentPortalSession();

  if (session) {
    audit({ action: 'logout', user: session.email, route: '/api/auth/logout' });
  }

  const response = NextResponse.redirect(new URL('/login', request.url));
  response.cookies.set(PORTAL_COOKIE, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
