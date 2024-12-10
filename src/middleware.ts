import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import {
  decryptSession,
  decryptToken,
  // verifyAccessToken,
} from './app/lib/actions/auth/session';
// import { refreshAccessToken } from './app/lib/data/auth';

const publicRoutes = ['/login'];

const middleware = async (req: NextRequest) => {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = !publicRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get('sd')?.value;
  const encryptedAccessToken = cookieStore.get('at')?.value;
  const encryptedRefreshToken = cookieStore.get('rt')?.value;

  // Decrypt session and tokens
  const session = await decryptSession(encryptedSession);
  const accessToken = encryptedAccessToken
    ? await decryptToken(encryptedAccessToken)
    : null;
  const refreshToken = encryptedRefreshToken
    ? await decryptToken(encryptedRefreshToken)
    : null;

  // Handle protected routes
  if (isProtectedRoute) {
    if (!session?.id || !accessToken) {
      // Redirect to login if session or access token is missing
      const redirectUrl = new URL('/login', req.nextUrl.origin);
      redirectUrl.searchParams.set('redirectUrl', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Verify access token
    // const isAccessTokenValid = accessToken
    //   ? await verifyAccessToken(accessToken)
    //   : false;

    // if (!isAccessTokenValid) {
    //   if (refreshToken) {
    //     // Attempt to refresh the access token
    //     // const newAccessToken = await refreshAccessToken(refreshToken, session);
    //     if (newAccessToken) {
    //       accessToken = newAccessToken;

    //       const expires = new Date(Date.now() + 15 * 60 * 1000);
    //       cookieStore.set('at', newAccessToken, {
    //         httpOnly: true,
    //         secure: true,
    //         expires,
    //         sameSite: 'lax',
    //         path: '/',
    //       });
    //     } else {
    //       // Redirect to login if refresh fails
    //       const redirectUrl = new URL('/login', req.nextUrl.origin);
    //       redirectUrl.searchParams.set('redirectUrl', req.nextUrl.pathname);
    //       return NextResponse.redirect(redirectUrl);
    //     }
    //   } else {
    //     // Redirect to login if no valid access or refresh token
    //     const redirectUrl = new URL('/login', req.nextUrl.origin);
    //     redirectUrl.searchParams.set('redirectUrl', req.nextUrl.pathname);
    //     return NextResponse.redirect(redirectUrl);
    //   }
    // }
  }

  // If accessing a public route, redirect authenticated users to home
  if (isPublicRoute && session?.userId) {
    const redirectUrl = new URL('/', req.nextUrl.origin);
    return NextResponse.redirect(redirectUrl);
  }

  // Add Authorization header to the request
  const response = NextResponse.next();
  if (accessToken) {
    response.headers.set('Authorization', `Bearer ${accessToken}`);
  }

  return response;
};

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

export default middleware;
