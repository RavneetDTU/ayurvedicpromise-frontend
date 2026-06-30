import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('ap_token')?.value;
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const isAdminRoute = pathname.startsWith('/admin');
  const isLoginPage = pathname === '/admin/login';

  if (isAdminRoute && !isLoginPage && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL('/admin/leads', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
