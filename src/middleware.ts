import { NextResponse, NextRequest } from 'next/server';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('at');
  const session = await auth();

  if (!token && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.url);
    newUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(newUrl);
  }

  if (!session && token) {
    cookieStore.delete('at');
    const newUrl = new URL('/login', req.url);
    newUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(newUrl);
  }

  if (session && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
