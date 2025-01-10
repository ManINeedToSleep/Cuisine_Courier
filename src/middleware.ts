// The bouncer of our application
// Checks if users have VIP access (valid token) to enter protected routes

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/utils/auth'

// List of routes that need a VIP pass
const protectedPaths = ['/dashboard']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // If they're trying to access the VIP area...
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = request.cookies.get('auth-token')?.value

    // No token? No entry!
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

// Tell Next.js which routes to guard
// It's like a bouncer's checklist
export const config = {
  matcher: [
    '/dashboard/:path*',
    // Add more VIP areas here
  ]
} 