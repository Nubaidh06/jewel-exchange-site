import { NextResponse } from 'next/server';

/** Routes that must always pass through, even when coming-soon is active. */
const BYPASS_PREFIXES = [
  '/coming-soon',
  '/studio',
  '/_next',
  '/api',
  '/sys',
  '/cgs',
  '/cgssys',
  '/system',
  '/pos',
  '/inventory',
];

const BYPASS_FILES = [
  '/favicon.ico',
  '/icon.png',
  '/apple-icon.png',
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

  // Always allow bypass routes and files
  if (
    BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix)) ||
    BYPASS_FILES.includes(pathname)
  ) {
    return NextResponse.next();
  }

  // Redirect everything else to the coming-soon page
  const url = request.nextUrl.clone();
  url.pathname = '/coming-soon';
  return NextResponse.redirect(url);
}

export const config = {
  /*
   * Match all request paths EXCEPT:
   *   - _next/static  (static files)
   *   - _next/image   (image optimization)
   *   - image files (svg, png, jpg, etc.)
   */
  matcher: [
    '/((?!_next/static|_next/image|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf|woff2?|ttf|eot)$).*)',
  ],
};
