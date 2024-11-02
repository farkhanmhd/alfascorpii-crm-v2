import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { cookies } from 'next/headers';

export default auth(async (req) => {
  const session = await auth();
  const cookieStore = await cookies();
  const token = cookieStore.get('at');

  if (!session && token) {
    cookieStore.delete('at');
    const newUrl = new URL('/login', req.url);
    newUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(newUrl);
  }

  if (!req.auth && req.nextUrl.pathname !== '/login') {
    const newUrl = new URL('/login', req.url);
    newUrl.searchParams.set('callbackUrl', encodeURI(req.url));
    return NextResponse.redirect(newUrl);
  }

  if (req.auth && req.nextUrl.pathname === '/login') {
    const newUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next({
    request: {
      headers: req.headers,
    },
  });
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
