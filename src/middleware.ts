import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

/**
 * Protected route prefixes that require authentication.
 * Unauthenticated users are redirected to /login.
 */
const PROTECTED_PREFIXES = ['/admin', '/ceo', '/tech-lead']

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

export async function middleware(request: NextRequest) {
  const { user, supabaseResponse } = await updateSession(request)
  const { pathname } = request.nextUrl

  // Protected routes: redirect to login if not authenticated
  if (isProtectedRoute(pathname) && !user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If user is authenticated and visiting /login, redirect to admin
  if (user && pathname === '/login') {
    const adminUrl = request.nextUrl.clone()
    adminUrl.pathname = '/admin'
    return NextResponse.redirect(adminUrl)
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
