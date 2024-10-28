import { getToken } from 'next-auth/jwt';
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from 'next/server';

// const onlyAdminPage = ['/dashboard'];
const authPages = ['/login', '/register'];

const requireAuth = [
  '/',
  '/login',
  '/register',
  '/staff',
  '/customers',
  '/customers/hobi',
  '/customers/kerabat',
  '/customers/pekerjaan',
  '/customers/pendidikan',
  '/customers/pengeluaran',
  '/customers/income',
  '/customers/status-rumah',
  '/keterangan-fu',
  '/keterangan-hasil',
  '/metode-fu',
];

export default function withAuth(middleware: NextMiddleware) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const { pathname } = req.nextUrl;

    const token = await getToken({
      req,
      secret: process.env.NEXTAUTH_SECRET,
    });

    //  if require auth equal pathname
    if (requireAuth.includes(pathname)) {
      // if token not exist and not in auth page
      if (!token && !authPages.includes(pathname)) {
        // create login url with callback url
        const url = new URL('login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));

        // redirect it
        return NextResponse.redirect(url);
      }

      // if token exist
      if (token) {
        // if url in auth page
        if (authPages.includes(pathname)) {
          return NextResponse.redirect(new URL('/', req.url));
        }

        // if role is admin and pathname
        // if (token.role !== 'admin' && onlyAdminPage.includes(pathname)) {
        //   return NextResponse.redirect(new URL('/', req.url));
        // }
      }
    }
    return middleware(req, next);
  };
}
