import crypto from 'node:crypto';
import { cookies } from 'next/headers';

export const CLIENT_COOKIE = 'gem_client_session';

interface ClientSessionPayload {
  clientId: string;
  email: string;
  name: string;
  tier: 'starter' | 'growth' | 'institutional';
  exp: number;
}

function authSecret(): string {
  return process.env.CLIENT_AUTH_SECRET || process.env.ADMIN_AUTH_SECRET || 'change-me-client-secret';
}

function sign(payload: string): string {
  return crypto.createHmac('sha256', authSecret()).update(payload).digest('hex');
}

export function createClientSessionToken(session: Omit<ClientSessionPayload, 'exp'>): string {
  const payload: ClientSessionPayload = {
    ...session,
    exp: Date.now() + 1000 * 60 * 60 * 12,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function readClientSessionToken(token: string): ClientSessionPayload | null {
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
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as ClientSessionPayload;

    if (!parsed.exp || parsed.exp < Date.now()) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function getCurrentClientSession(): Promise<ClientSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(CLIENT_COOKIE)?.value;
  return readClientSessionToken(token || '');
}
