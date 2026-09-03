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
 *   - Skips client-side navigation requests (Next.js soft transitions +
 *     prefetches) so the SPA navigation never 308-loops on a non-canonical
 *     host. Those requests carry `Next-Router-State-Tree` (RSC navigation)
 *     or `purpose: prefetch` headers — both are pass-through.
 *   - Skips the RSC data endpoint (`?_rsc=...`) used by App Router
 *     client transitions.
 */
const CANONICAL_HOST = "www.guess-your-face.web.id";
const CANONICAL_PROTO = "https:";

function isClientNavigation(request: NextRequest): boolean {
  // App Router soft navigation carries the router state header
  if (request.headers.has("next-router-state-tree")) return true;
  // Next.js prefetch requests
  const purpose = request.headers.get("purpose");
  if (purpose && purpose.toLowerCase().includes("prefetch")) return true;
  // RSC data fetches (?_rsc=...)
  if (request.nextUrl.searchParams.has("_rsc")) return true;
  return false;
}

export function proxy(request: NextRequest) {
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  // Never 308 a client-side navigation — that would break SPA transitions
  // and create redirect loops when the user lands on a non-canonical host.
  if (isClientNavigation(request)) {
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
