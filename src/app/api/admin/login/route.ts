import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, isValidAdminToken } from '@/lib/adminAuth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const token = typeof body.token === 'string' ? body.token : '';

  if (!isValidAdminToken(token)) {
    return NextResponse.json({ message: 'Invalid access token' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
