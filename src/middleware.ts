import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decryptSession } from './app/lib/actions/auth/session';

const publicRoutes = ['/login'];

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get('sd')?.value;
  const session = await decryptSession(encryptedSession);

  if (isProtectedRoute && !session?.userId) {
    const redirectUrl = new URL('/login', req.nextUrl.origin);
    redirectUrl.searchParams.set('redirectUrl', req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (isPublicRoute && session?.userId) {
    const redirectUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/((?!api|_next/static|favicon.ico|sitemap.xml|robots.txt).*)'],
};

export default middleware;
