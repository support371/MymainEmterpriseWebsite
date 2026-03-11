import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const PORTAL_COOKIE = 'gem_portal_session';

export type PortalRole = 'admin' | 'analyst' | 'client' | 'viewer';

export interface PortalSession {
  userId: string;
  email: string;
  name: string;
  role: PortalRole;
  exp: number;
}

function authSecret(): string {
  return process.env.PORTAL_AUTH_SECRET || process.env.ADMIN_AUTH_SECRET || 'change-me-portal-secret';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', authSecret()).update(payload).digest('hex');
}

export function createPortalToken(session: Omit<PortalSession, 'exp'>): string {
  const payload: PortalSession = {
    ...session,
    exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
  };
  const encoded = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${encoded}.${sign(encoded)}`;
}

export function readPortalToken(token: string): PortalSession | null {
  if (!token || !token.includes('.')) return null;
  const [encoded, signature] = token.split('.');
  if (!encoded || !signature) return null;

  const expected = sign(encoded);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(encoded, 'base64url').toString('utf8')) as PortalSession;
    if (!parsed.exp || parsed.exp < Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function getCurrentPortalSession(): Promise<PortalSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_COOKIE)?.value;
  return readPortalToken(token || '');
}
