import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ─── Password gate ─────────────────────────────────────────────────────────
// To disable the password gate entirely: remove the SITE_PASSWORD env var
// or delete the body of this function and return NextResponse.next().

const COOKIE_NAME = "wmrs_auth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Always allow the password page and API routes
  if (
    pathname === "/password" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  const sitePassword = process.env.SITE_PASSWORD;

  // No env var set → gate is off
  if (!sitePassword) {
    return NextResponse.next();
  }

  const authCookie = request.cookies.get(COOKIE_NAME);

  if (authCookie?.value !== sitePassword) {
    const url = request.nextUrl.clone();
    url.pathname = "/password";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Run on everything except static files and images
    "/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|ico|webp|gif|woff2?)).*)",
  ],
};
