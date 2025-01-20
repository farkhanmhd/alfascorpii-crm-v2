import { NextResponse } from 'next/server';
import { auth } from '@/auth';

export default auth(async (req) => {
  const { pathname } = req.nextUrl;
  if (!req.auth && pathname !== '/login') {
    const newUrl = new URL('/login', req.nextUrl.origin);
    newUrl.searchParams.set('redirectUrl', pathname);
    return Response.redirect(newUrl);
  }

  if (req.auth && pathname === '/login') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return Response.redirect(newUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
