import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Phase 1: dummy auth check via cookie
  // Will be replaced with Supabase session check later
  const isAuthenticated = request.cookies.get('yoshida-os-auth')?.value === 'true'

  // Protect authenticated routes
  if (pathname.startsWith('/chat') || pathname.startsWith('/home') || pathname.startsWith('/admin')) {
    // In development, allow access without auth for easier testing
    // In production, uncomment the redirect below
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }
  }

  // Redirect authenticated users away from login
  if (pathname === '/login' && isAuthenticated) {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
