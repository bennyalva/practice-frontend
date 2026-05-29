import { describe, it, expect } from "vitest";
import { getLogoUrl } from "./getAssetPath";
import { ASSETS_PATHS, THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";

describe("getLogoUrl", () => {
  describe("Elektra Loan (view=2)", () => {
    it("returns the light Elektra logo for light theme", () => {
      expect(getLogoUrl(VIEW_OPTIONS.ELEKTRA_LOAN, THEMES.LIGHT)).toBe(ASSETS_PATHS.LOGOS.ELEKTRA_LIGHT);
    });

    it("returns the dark Elektra logo for dark theme", () => {
      expect(getLogoUrl(VIEW_OPTIONS.ELEKTRA_LOAN, THEMES.DARK)).toBe(ASSETS_PATHS.LOGOS.ELEKTRA_DARK);
    });
  });

  describe("Shopinbaz (view=1)", () => {
    it("returns the light Shopinbaz logo for light theme", () => {
      expect(getLogoUrl(VIEW_OPTIONS.SHOPINBAZ, THEMES.LIGHT)).toBe(ASSETS_PATHS.LOGOS.SHOPINBAZ_LIGHT);
    });

    it("returns the dark Shopinbaz logo for dark theme", () => {
      expect(getLogoUrl(VIEW_OPTIONS.SHOPINBAZ, THEMES.DARK)).toBe(ASSETS_PATHS.LOGOS.SHOPINBAZ_DARK);
    });
  });

});
