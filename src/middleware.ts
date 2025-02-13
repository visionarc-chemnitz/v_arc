import {auth} from '@/auth'
import { getCsrfToken } from 'next-auth/react';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
export async function middleware(req: NextRequest) {                                
  const { pathname } = req.nextUrl;
  const sessionKey = process.env.SESSION_TOKEN_KEY ? process.env.SESSION_TOKEN_KEY : 'authjs.session-token';
  const token = sessionKey ? req.cookies.get(sessionKey) : undefined;
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      const loginUrl = new URL('/auth/signin', req.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (token && pathname.startsWith('/auth/signin')) {
    const dashboardUrl = new URL('/dashboard', req.url);
    return NextResponse.redirect(dashboardUrl);
  }
  return NextResponse.next();
}
export const config = {
  matcher: ['/dashboard/:path*', '/auth/signin']
};
