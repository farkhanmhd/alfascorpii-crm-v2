// app/middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const loginPath = '/login';

  if (!token && req.nextUrl.pathname !== loginPath) {
    return NextResponse.redirect(new URL(loginPath, req.url));
  }

  if (token && req.nextUrl.pathname === loginPath) {
    return NextResponse.redirect(new URL('/staff', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/login', '/staff', '/verify-email'],
};
