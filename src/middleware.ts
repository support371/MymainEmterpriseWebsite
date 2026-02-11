import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ADMIN_COOKIE } from './lib/adminAuth';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const session = request.cookies.get(ADMIN_COOKIE)?.value;
  const isValid = session && session === (process.env.ADMIN_ACCESS_TOKEN || 'change-me-admin-token');

  if (isValid) {
    return NextResponse.next();
  }

  const loginUrl = new URL('/admin/login', request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/admin/:path*'],
};
