
import { NextRequest } from 'next/dist/server/web/spec-extension/request';

import { buildLoginRedirect, getSessionToken } from './app/helpers/auth/authHelpers';
import { NextResponse } from 'next/dist/server/web/spec-extension/response';
import { PROTECTED_ROUTES } from './app/constantsGlobals';

/**
 * Verifica que las rutas protegidas tengan una cookie de sesión.
 * Si no hay sesión activa, redirige a /login preservando la ruta original.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const token = getSessionToken(request);

  if (!token) {
    return buildLoginRedirect(request, pathname);
  }

  return NextResponse.next();
}

// ─── Matcher ─────────────────────────────────────────────────
/** Ejecuta el middleware solo en páginas, excluyendo assets estáticos y APIs */
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
