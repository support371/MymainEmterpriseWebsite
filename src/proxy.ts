import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE, readSessionToken } from './lib/adminAuth';

function isPublicAdminPath(pathname: string): boolean {
  return pathname.startsWith('/admin/login');
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const isAdminRoute = pathname.startsWith('/admin');
  const isAdminApiRoute = pathname.startsWith('/api/admin');

  if (!isAdminRoute && !isAdminApiRoute) {
    return NextResponse.next();
  }

  if (isAdminRoute && isPublicAdminPath(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  const session = readSessionToken(token || '');

  if (session) {
    return NextResponse.next();
  }

  if (isAdminApiRoute) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
