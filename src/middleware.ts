import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const PROTECTED_PATHS = ['/chat', '/home', '/admin']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Refresh Supabase session
  const response = await updateSession(request)

  // Check for Supabase session cookies
  const hasSupabaseSession = request.cookies
    .getAll()
    .some(
      (c) =>
        c.name.startsWith('sb-') &&
        (c.name.endsWith('-auth-token') ||
          c.name.endsWith('-auth-token.0') ||
          c.name.endsWith('-auth-token.1'))
    )

  // Check for app-level auth cookie (fallback for demo without Supabase)
  const hasAppSession =
    request.cookies.get('yoshida-os-auth')?.value === 'true'

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

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
