import crypto from 'node:crypto';
import { cookies } from 'next/headers';
import type { AdminRole } from './adminUsers';

export const ADMIN_COOKIE = 'gem_admin_session';

interface SessionPayload {
  userId: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
}

function authSecret(): string {
  return process.env.ADMIN_AUTH_SECRET || 'change-me-auth-secret';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', authSecret()).update(payload).digest('hex');
}

export function createSessionToken(session: Omit<SessionPayload, 'exp'>): string {
  const payload: SessionPayload = {
    ...session,
    exp: Date.now() + 1000 * 60 * 60 * 12,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function readSessionToken(token: string): SessionPayload | null {
  if (!token || !token.includes('.')) {
    return null;
  }

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expected = sign(encodedPayload);

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as SessionPayload;

    if (!parsed.exp || parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getCurrentAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE)?.value;
  return readSessionToken(token || '');
}

export function hasRole(role: AdminRole, allowedRoles: AdminRole[]): boolean {
  return allowedRoles.includes(role);
}
