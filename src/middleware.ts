import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Define the routes that do not require authentication
const publicRoutes = ['/login', '/register'];

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (token || publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const url = new URL('login', req.url);
  url.searchParams.set('callbackUrl', encodeURI(req.url));
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/customers/:path*',
    '/staff',
    '/dealer',
    '/leasing',
    '/model',
    '/hari-besar',
    '/metode-fu',
    '/keterangan-fu',
    '/keterangan-hasil',
  ],
};
