import { PROTECTED_ROUTES, ROUTES, SESSION_NAMES } from "@/app/constantsGlobals";
import { NextRequest, NextResponse } from "next/dist/server/web/exports";

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

export function getSessionToken(request: NextRequest): string | undefined {
  return request.cookies.get(SESSION_NAMES.TOKEN)?.value;
}

export function buildLoginRedirect(request: NextRequest, pathname: string): NextResponse {
  const loginUrl = new URL(ROUTES.LOGIN, request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(loginUrl);
}
