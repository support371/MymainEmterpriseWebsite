import { cookies } from 'next/headers';

export const ADMIN_COOKIE = 'gem_admin_session';

function configuredToken(): string {
  return process.env.ADMIN_ACCESS_TOKEN || 'change-me-admin-token';
}

export function isValidAdminToken(token: string): boolean {
  return Boolean(token) && token === configuredToken();
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  return isValidAdminToken(session ?? '');
}
