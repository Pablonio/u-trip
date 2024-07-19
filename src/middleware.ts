import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

export async function middleware(request: NextRequest) {
  const cookieHeader = request.headers.get('cookie');
  const cookies = cookieHeader ? parse(cookieHeader) : {};
  const role = cookies.rol as string;

  const protectedRoutes = {
    INCOGNITO: ['/Paginas', '/Paginas/Recuperar'],
    TURISTA: ['/Paginas/Turista'],
    GUIA: ['/Paginas/Guia'],
    ADMINISTRADOR: ['/Paginas/Administrador'],
    BANEADO: ['/Baneado'],
  };

  const userRoles: (keyof typeof protectedRoutes)[] = ['INCOGNITO', 'TURISTA', 'GUIA', 'ADMINISTRADOR', 'BANEADO'];

  if (!role || role === 'INCOGNITO') {
    if (protectedRoutes.INCOGNITO.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL('/Error404', request.url));
    }
  }

  if (userRoles.includes(role as keyof typeof protectedRoutes)) {
    const userRoutes = protectedRoutes[role as keyof typeof protectedRoutes];

    if (userRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL(userRoutes[0], request.url));
    }
  }

  return NextResponse.redirect(new URL('/Error404', request.url));
}

export const config = {
  matcher: [
    '/Paginas/:path*',
    '/Paginas/Recuperar/:path*',
    '/Paginas/Turista/:path*',
    '/Paginas/Guia/:path*',
    '/Paginas/Administrador/:path*',
    '/Baneado/:path*',
  ],
};
