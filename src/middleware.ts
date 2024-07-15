import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const role = cookies.rol as string;

  const protectedRoutes = {
    INCOGNITO: '/Paginas',
    TURISTA: '/Paginas/Turista',
    GUIA: '/Paginas/Turista',
    ADMINISTRADOR: '/Paginas/Administrador',
    BANEADO: '/Baneado',
  };

  const userRoles: (keyof typeof protectedRoutes)[] = ['INCOGNITO', 'TURISTA', 'GUIA', 'ADMINISTRADOR', 'BANEADO'];

  if (!role || role === 'INCOGNITO') {
    if (request.nextUrl.pathname === '/Paginas') {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/Error404', request.url));
    }
  }

  if (userRoles.includes(role as keyof typeof protectedRoutes)) {
    const userRoute = protectedRoutes[role as keyof typeof protectedRoutes];
    
    if (request.nextUrl.pathname.startsWith(userRoute)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(userRoute, request.url));
    }
  }
  return NextResponse.redirect(new URL('/Error404', request.url));
}

export const config = {
  matcher: ['/Paginas/:path*', '/Paginas/Turista/:path*', '/Paginas/Administrador/:path*', '/Baneado/:path*'],
};