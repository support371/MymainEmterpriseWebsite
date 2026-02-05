import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, createSessionToken } from '@/lib/adminAuth';
import { authenticateUser } from '@/lib/adminUsers';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  const user = await authenticateUser(email, password);

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = createSessionToken({
    userId: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
  });

  const response = NextResponse.json({ success: true, role: user.role, name: user.name });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
