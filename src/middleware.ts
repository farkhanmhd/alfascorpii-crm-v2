import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { checkPermission } from './lib/utils';
import { decryptSession } from './app/lib/actions/auth/session';
import { getUserPermissions } from './app/lib/data/auth';
import { Permission } from './lib/permissions';

const publicRoutes = ['/login'];

// Mapping of route prefixes to required permission(s). For master data routes,
// we require both the specific permission and the global "view_master_data".
const routePermissionMap: Record<string, string | string[]> = {
  // sales
  '/customers': ['view_sales', 'view_sales_customer'],
  '/follow-up': ['view_sales', 'view_sales_follow_up'],
  '/duplicatedata': ['view_sales', 'view_sales_duplicate_data'],

  // report
  '/deal': ['view_report', 'view_report_deal'],

  // user list
  '/staff': 'view_user_list',

  // master data
  '/dealers': ['view_master_data', 'view_dealers'],
  '/leasing': ['view_master_data', 'view_leasings'],
  '/customerjobs': ['view_master_data', 'view_jobs'],
  '/holidays': ['view_master_data', 'view_holidays'],
  '/relations': ['view_master_data', 'view_relations'],
  '/degrees': ['view_master_data', 'view_education_degrees'],
  '/expenses': ['view_master_data', 'view_expenses'],
  '/incomes': ['view_master_data', 'view_incomes'],
  '/hobbies': ['view_master_data', 'view_hobbies'],
  '/houseownerships': ['view_master_data', 'view_house_ownerships'],
  '/motorcycles': ['view_master_data', 'view_motorcycles'],
  '/colors': ['view_master_data', 'view_colors'],
  '/fumethod': ['view_master_data', 'view_follow_up_methods'],
  '/statusfus': ['view_master_data', 'view_status_follow_up'],
  '/detailfu': ['view_master_data', 'view_follow_up_details'],
  '/furesult': ['view_master_data', 'view_follow_up_results'],
};

export async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);

  const cookieStore = await cookies();
  const encryptedSession = cookieStore.get('sd')?.value;
  const session = await decryptSession(encryptedSession);

  // Redirect unauthenticated users trying to access protected routes.
  if (!isPublicRoute && !session?.userId) {
    const redirectUrl = new URL('/login', origin);
    redirectUrl.searchParams.set('redirectUrl', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect authenticated users away from public routes.
  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', origin));
  }

  // Fetch permissions once for all subsequent checks.
  let permissions: Permission[] = [];
  if (session?.userId) {
    permissions = await getUserPermissions(session.userId as string);

    if (!permissions) {
      return NextResponse.redirect(new URL('/login', origin));
    }
  }

  const customerDetailRegex = /^\/customers\/[^/]+$/;
  if (customerDetailRegex.test(pathname)) {
    const hasAllPermissions =
      checkPermission('sales_fu_view_detail_customer_data', permissions) ||
      checkPermission('sales_customer_view_detail_customer_data', permissions);

    if (!hasAllPermissions) {
      return NextResponse.redirect(new URL('/', origin));
    }
  }

  // Add deal detail regex check after customer detail check
  const dealDetailRegex = /^\/deal\/[^/]+$/;
  if (dealDetailRegex.test(pathname)) {
    const requiredPermissions = [
      'view_report',
      'view_report_deal',
      'view_detail_deal',
    ];

    const hasAllPermissions = requiredPermissions.every((perm) =>
      checkPermission(perm, permissions)
    );

    if (!hasAllPermissions) {
      return NextResponse.redirect(new URL('/', origin));
    }
  }

  // Check if the current route requires specific permission(s).
  const matchedRoute = Object.keys(routePermissionMap).find(
    (route) => pathname === route
  );

  if (matchedRoute) {
    const requiredPermissions = routePermissionMap[matchedRoute];

    if (Array.isArray(requiredPermissions)) {
      // Use Array.every to ensure the user has all required permissions.
      const hasAllPermissions = requiredPermissions.every((permission) =>
        checkPermission(permission, permissions)
      );

      if (!hasAllPermissions) {
        return NextResponse.redirect(new URL('/', origin));
      }
    } else {
      // For single permission routes.
      const hasPermission = checkPermission(requiredPermissions, permissions);

      if (!hasPermission) {
        return NextResponse.redirect(new URL('/', origin));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};

export default middleware;
