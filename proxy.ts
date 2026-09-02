import { NextResponse, type NextRequest } from "next/server";

/**
 * Guess Your Face — canonical domain proxy.
 *
 * Next.js 16 renamed `middleware.ts` → `proxy.ts` (runs on Node.js runtime).
 * This proxy forces all incoming traffic to the canonical production host:
 *   https://www.guess-your-face.web.id
 *
 * Behavior:
 *   - In production: 308 redirect to canonical host (preserves path + query).
 *   - In development: pass-through (localhost is left alone).
 *   - Skips Next.js internal assets to keep overhead low.
 */
const CANONICAL_HOST = "www.guess-your-face.web.id";
const CANONICAL_PROTO = "https:";

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  const host = request.headers.get("host") ?? "";

  if (!host || host === CANONICAL_HOST) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.protocol = CANONICAL_PROTO;
  url.host = CANONICAL_HOST;
  url.port = "";

  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files served from /public
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|llms.txt|llms-full.txt|icon.png|apple-icon.png|logo.png|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)",
  ],
};