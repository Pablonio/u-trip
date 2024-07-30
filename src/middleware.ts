import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import { parse } from 'cookie';

const allowedOrigins = ['https://www.u-trip.online', 'https://u-trip-git-models-pablonios-projects.vercel.app', 'https://u-trip-pablonios-projects.vercel.app'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(request: NextRequest) {
  // Check the origin from the request
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // Handle preflighted requests
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

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
    '/api/:path*',
    '/Paginas/:path*',
    '/Paginas/Recuperar/:path*',
    '/Paginas/Turista/:path*',
    '/Paginas/Guia/:path*',
    '/Paginas/Administrador/:path*',
    '/Baneado/:path*',
  ],
};