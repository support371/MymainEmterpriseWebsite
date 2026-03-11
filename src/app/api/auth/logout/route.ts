import { NextRequest, NextResponse } from 'next/server';
import { PORTAL_COOKIE, getCurrentPortalSession } from '@/lib/auth/session';
import { writeAuditEntry } from '@/lib/audit';

export async function POST(request: NextRequest) {
  const session = await getCurrentPortalSession();

  if (session) {
    await writeAuditEntry({
      actorUserId: session.userId,
      actorEmail: session.email,
      action: 'logout',
      target: '/api/auth/logout',
      meta: {},
      result: 'success',
    });
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
