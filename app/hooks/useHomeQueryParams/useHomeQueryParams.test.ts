import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useHomeQueryParams } from "./useHomeQueryParams";
import { WELCOME_TITLES } from "../constantsHooks";
import { ASSETS_PATHS, GTM_EVENTS, VIEW_OPTIONS } from "@/app/constantsGlobals";

const mockGet = vi.fn();
const mockPushToDataLayer = vi.fn();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({ get: mockGet }),
}));

vi.mock("@/app/libs/gtm/gtm", () => ({
  pushToDataLayer: (...args: unknown[]) => mockPushToDataLayer(...args),
}));

describe("useHomeQueryParams", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("view resolution", () => {
    it("defaults to Elektra Loan when no query param is present", () => {
      mockGet.mockReturnValue(null);

      const { result } = renderHook(() => useHomeQueryParams());

      expect(result.current.welcomeTitle).toBe(
        "¡Te damos la bienvenida a Préstamo Elektra!",
      );
    });

    it("returns Elektra Loan config when num=2", () => {
      mockGet.mockReturnValue(VIEW_OPTIONS.ELEKTRA_LOAN);

      const { result } = renderHook(() => useHomeQueryParams());

      expect(result.current.welcomeTitle).toBe(
        WELCOME_TITLES.ELEKTRA_LOAN
      );
    });

    it("returns Shopinbaz config when num=1", () => {
      mockGet.mockReturnValue(VIEW_OPTIONS.SHOPINBAZ);

      const { result } = renderHook(() => useHomeQueryParams());

      expect(result.current.welcomeTitle).toBe(
        WELCOME_TITLES.SHOPINBAZ
      );
    });

  });

  describe("logoUrl", () => {
    it("returns Elektra dark logo for Elektra Loan view", () => {
      mockGet.mockReturnValue(VIEW_OPTIONS.ELEKTRA_LOAN);

      const { result } = renderHook(() => useHomeQueryParams());

      expect(result.current.logoUrl).toBe(ASSETS_PATHS.LOGOS.ELEKTRA_DARK);
    });


  });


  describe("GTM", () => {
    it("pushes THEME_LOADED event to dataLayer on mount", () => {
      mockGet.mockReturnValue(VIEW_OPTIONS.SHOPINBAZ);

      renderHook(() => useHomeQueryParams());

      expect(mockPushToDataLayer).toHaveBeenCalledWith({
        event: GTM_EVENTS.THEME_LOADED,
        num: VIEW_OPTIONS.SHOPINBAZ,
      });
    });
  });
});
