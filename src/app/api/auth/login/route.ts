import { NextResponse } from 'next/server';
import { PORTAL_COOKIE, createPortalToken } from '@/lib/auth/session';
import { authenticatePortalUser } from '@/lib/auth/users';
import { writeAuditEntry } from '@/lib/audit';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email : '';
  const password = typeof body.password === 'string' ? body.password : '';

  const user = await authenticatePortalUser(email, password);

  if (!user) {
    await writeAuditEntry({
      actorUserId: null,
      actorEmail: email || null,
      action: 'login_failed',
      target: '/api/auth/login',
      meta: { reason: 'invalid_credentials' },
      result: 'failure',
    });
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = createPortalToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await writeAuditEntry({
    actorUserId: user.id,
    actorEmail: user.email,
    action: 'login_success',
    target: '/api/auth/login',
    meta: { role: user.role },
    result: 'success',
  });

  const response = NextResponse.json({ success: true, role: user.role, name: user.name });
  response.cookies.set(PORTAL_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  });

  return response;
}
