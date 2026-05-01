import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export function middleware(request: NextRequest) {
  // Admin routes are handled by their own server-component auth check
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
