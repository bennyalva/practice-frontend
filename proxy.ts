import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/dashboard', '/admin', '/profile'];

export function proxy(request: NextRequest) {
console.error('Proxy ejecutado para:', request.nextUrl.pathname);
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('session_token')?.value;

  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    // Guardamos la ruta original para redirigir al usuario tras el login exitoso
    loginUrl.searchParams.set('callbackUrl', pathname); 
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

//El Matcher optimiza el rendimiento ejecutando el código SOLO en las páginas
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * - api (rutas de API)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico, sitemap.xml, robots.txt (archivos de SEO)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
