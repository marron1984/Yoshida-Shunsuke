import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/chat', '/home', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for Supabase session cookies
  const hasSupabaseSession =
    request.cookies.has('sb-access-token') ||
    request.cookies.has('sb-refresh-token') ||
    Array.from(request.cookies.getAll()).some(
      (c) => c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    )

  // Check for app-level auth cookie (set by dummy login)
  const hasAppSession = request.cookies.get('yoshida-os-auth')?.value === 'true'

  const isAuthenticated = hasSupabaseSession || hasAppSession

  // Protect authenticated routes
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
