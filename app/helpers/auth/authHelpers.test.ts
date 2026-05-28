import { describe, it, expect, vi } from "vitest";
import { isProtectedRoute, getSessionToken, buildLoginRedirect } from "./authHelpers";
import { NextRequest } from "next/dist/server/web/exports";
import { ROUTES } from "@/app/constantsGlobals";

function mockRequest(cookies: Record<string, string | undefined>, url = "https://example.com/dashboard") {
  return {
    cookies: {
      get: vi.fn((name: string) => {
        const value = cookies[name];
        return value !== undefined ? { name, value } : undefined;
      }),
    },
    url,
  } as unknown as NextRequest;
}

describe("isProtectedRoute", () => {
  it("returns true for /dashboard", () => {
    expect(isProtectedRoute(ROUTES.DASHBOARD)).toBe(true);
  });



  it("returns true for /admin", () => {
    expect(isProtectedRoute(ROUTES.ADMIN)).toBe(true);
  });

  it("returns true for /profile", () => {
    expect(isProtectedRoute(ROUTES.PROFILE)).toBe(true);
  });

  it("returns false for /login", () => {
    expect(isProtectedRoute(ROUTES.LOGIN)).toBe(false);
  });

  it("returns false for /pages/home", () => {
    expect(isProtectedRoute(ROUTES.HOME)).toBe(false);
  });

  it("returns false for root /", () => {
    expect(isProtectedRoute("/")).toBe(false);
  });
});

describe("getSessionToken", () => {
  it("returns the token value when cookie exists", () => {
    const req = mockRequest({ session_token: "abc123" });

    expect(getSessionToken(req)).toBe("abc123");
  });

  it("returns undefined when cookie does not exist", () => {
    const req = mockRequest({});

    expect(getSessionToken(req)).toBeUndefined();
  });

});
