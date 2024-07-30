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
    ADMINISTRADOR: ['/Paginas/Administrador', '/Paginas/Administrador/Usuarios', '/Paginas/Administrador/Itinerarios', '/Paginas/Administrador/Reservas'],
    BANEADO: ['/Baneado'],
  };

  const userRoles: (keyof typeof protectedRoutes)[] = ['INCOGNITO', 'TURISTA', 'GUIA', 'ADMINISTRADOR', 'BANEADO'];

  const response = NextResponse.next();

  // Configura los encabezados de CORS
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  response.headers.set('Access-Control-Allow-Credentials', 'true');

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: response.headers,
    });
  }

  if (!role || role === 'INCOGNITO') {
    if (protectedRoutes.INCOGNITO.some(route => request.nextUrl.pathname.startsWith(route))) {
      return response;
    } else {
      return NextResponse.redirect(new URL('/Error404', request.url));
    }
  }

  if (userRoles.includes(role as keyof typeof protectedRoutes)) {
    const userRoutes = protectedRoutes[role as keyof typeof protectedRoutes];

    if (userRoutes.some(route => request.nextUrl.pathname.startsWith(route))) {
      return response;
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
