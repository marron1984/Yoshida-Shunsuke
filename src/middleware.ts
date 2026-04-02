import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/chat', '/home', '/admin']
const PUBLIC_PATHS = ['/login', '/auth']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Supabase stores session in cookies; check for auth tokens
  const hasSession =
    request.cookies.has('sb-access-token') ||
    request.cookies.has('sb-refresh-token') ||
    // Supabase SSR uses project-specific cookie names
    Array.from(request.cookies.getAll()).some((c) =>
      c.name.startsWith('sb-') && c.name.endsWith('-auth-token')
    )

  // Protect authenticated routes
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))
  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Redirect authenticated users away from login
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))
  if (isPublic && hasSession && pathname === '/login') {
    return NextResponse.redirect(new URL('/chat', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
