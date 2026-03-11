import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { readPortalToken, PORTAL_COOKIE } from '@/lib/auth/session';
import { isRouteAllowed } from '@/lib/auth/rbac';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /portal/* routes
  if (!pathname.startsWith('/portal')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(PORTAL_COOKIE)?.value;
  const session = readPortalToken(token || '');

  // Not authenticated → redirect to login
  if (!session) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated but not authorized for this route
  if (!isRouteAllowed(pathname, session.role)) {
    return NextResponse.redirect(new URL('/portal?denied=1', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/portal/:path*'],
};
