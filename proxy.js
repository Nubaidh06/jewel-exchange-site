/**
 * middleware.js  —  Jewel Exchange Coming Soon Gate
 *
 * When NEXT_PUBLIC_COMING_SOON=true (set in Vercel env vars), every
 * public request is redirected to /coming-soon.
 *
 * Routes that are always allowed through (bypass the gate):
 *   • /coming-soon  — the page itself (avoids redirect loop)
 *   • /studio/*     — Sanity Studio (so you can still edit content)
 *   • /_next/*      — Next.js internals
 *   • /api/*        — API routes
 *   • /favicon.ico, /opengraph-image.png, etc. — static files
 *
 * ─── TO LAUNCH THE REAL SITE ────────────────────────────────────────
 * In Vercel → Project → Settings → Environment Variables:
 *   Change NEXT_PUBLIC_COMING_SOON from "true" to "false" (or delete it)
 *   and redeploy. That's it.
 * ─────────────────────────────────────────────────────────────────────
 */

import { NextResponse } from 'next/server';

/** Routes that must always pass through, even when coming-soon is active. */
const BYPASS_PREFIXES = [
  '/coming-soon',
  '/studio',
  '/_next',
  '/api',
];

const BYPASS_FILES = [
  '/favicon.ico',
  '/opengraph-image.png',
  '/robots.txt',
  '/sitemap.xml',
];

export function proxy(request) {
  const comingSoon = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

  if (!comingSoon) {
    // Gate is off — let everything through normally.
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  // Always allow bypass routes.
  if (
    BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    BYPASS_FILES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the coming-soon page.
  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.redirect(url);
}

export const config = {
  /*
   * Match all request paths EXCEPT:
   *   - _next/static  (static files)
   *   - _next/image   (image optimisation)
   *   - image files (svg, png, jpg, etc.)
   *
   * We still handle the bypass logic inside the function above because
   * we need runtime env-var access.
   */
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf|eot)$).*)',
  ],
};
