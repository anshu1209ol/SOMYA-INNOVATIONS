import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Protected route prefixes that require authentication.
 * Unauthenticated users are redirected to /login.
 */
const PROTECTED_PREFIXES = ['/admin', '/ceo', '/tech-lead', '/profile', '/settings']

/**
 * Public routes that should never trigger auth redirects.
 */
const PUBLIC_ROUTES = [
  '/',
  '/about',
  '/ai-solutions',
  '/it-solutions',
  '/digital-solutions',
  '/products',
  '/industries',
  '/work',
  '/resources',
  '/services',
  '/contact',
  '/request-quote',
  '/careers',
  '/privacy-policy',
  '/terms',
  '/refund-policy',
  '/cookie-policy',
  '/design-system',
  '/login',
  '/signup',
  '/forgot-password',
  '/reset-password',
  '/verify-email',
  '/unauthorized',
  '/auth/callback',
]

/**
 * Check if a pathname matches any of the public routes or their sub-paths.
 */
function isPublicRoute(pathname: string): boolean {
  // API routes, static files, and Next.js internals are always public
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return true
  }

  // Exact match or starts with a public prefix
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + '/')
  )
}

/**
 * Check if a pathname requires authentication.
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
}

export async function proxy(request: NextRequest) {
  // ── Canonical Domain & HTTPS Enforcement ──
  const host = request.headers.get("host") || "";
  const isLocal = host.includes("localhost") || host.includes("127.0.0.1");

  if (!isLocal) {
    // Redirect non-www (somyainnovations.in) to canonical www (www.somyainnovations.in)
    if (host === "somyainnovations.in") {
      const canonicalUrl = request.nextUrl.clone();
      canonicalUrl.host = "www.somyainnovations.in";
      canonicalUrl.protocol = "https:";
      return NextResponse.redirect(canonicalUrl, 301);
    }

    // Redirect HTTP to HTTPS in production
    const proto = request.headers.get("x-forwarded-proto");
    if (proto === "http") {
      const httpsUrl = request.nextUrl.clone();
      httpsUrl.protocol = "https:";
      return NextResponse.redirect(httpsUrl, 301);
    }
  }

  const { user, supabase, supabaseResponse } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Legacy attendance compatibility redirect
  if (pathname === '/attendance' || pathname.startsWith('/attendance/')) {
    const adminAttendanceUrl = request.nextUrl.clone()
    adminAttendanceUrl.pathname = '/admin/attendance'
    return NextResponse.redirect(adminAttendanceUrl, 307)
  }

  // If an OAuth code landed on public home or non-callback route, redirect to role dashboard
  const code = request.nextUrl.searchParams.get('code')
  if (code && !pathname.startsWith('/auth/callback') && user) {
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)

    const roles = (userRoles as Array<{ role: string }> | null)?.map((r) => r.role) ?? []

    const targetUrl = request.nextUrl.clone()
    targetUrl.searchParams.delete('code')
    if (roles.includes('tech_lead')) {
      targetUrl.pathname = '/tech-lead'
    } else if (roles.includes('ceo')) {
      targetUrl.pathname = '/ceo'
    } else {
      targetUrl.pathname = '/admin'
    }
    return NextResponse.redirect(targetUrl)
  }

  // Protected routes: redirect to login if not authenticated
  if (isProtectedRoute(pathname) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and visiting /login, redirect to role-specific dashboard
  if (user && pathname === '/login') {
    const { data: userRoles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', user.id)

    const roles = (userRoles as Array<{ role: string }> | null)?.map((r) => r.role) ?? []

    const targetUrl = request.nextUrl.clone()
    if (roles.includes('tech_lead')) {
      targetUrl.pathname = '/tech-lead'
    } else if (roles.includes('ceo')) {
      targetUrl.pathname = '/ceo'
    } else {
      targetUrl.pathname = '/admin'
    }
    return NextResponse.redirect(targetUrl)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - icon.svg, icon.png (app icons)
     * - robots.txt, sitemap.xml
     */
    '/((?!_next/static|_next/image|favicon.ico|icon\\.svg|icon\\.png|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}
