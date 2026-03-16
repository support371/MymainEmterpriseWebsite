import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { PORTAL_COOKIE } from "@/lib/auth/constants"

export function middleware(req: NextRequest) {
  const session = req.cookies.get(PORTAL_COOKIE)

  if (!session && req.nextUrl.pathname.startsWith("/portal")) {
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/portal/:path*"]
}
