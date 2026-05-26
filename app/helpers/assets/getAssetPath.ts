import { ASSETS_PATHS, THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";

const logoMap: Record<string, Record<string, string>> = {
  [VIEW_OPTIONS.elektraLoan]: {
    [THEMES.LIGHT]: ASSETS_PATHS.LOGOS.ELEKTRA_LIGHT,
    [THEMES.DARK]: ASSETS_PATHS.LOGOS.ELEKTRA_DARK,
  },
  [VIEW_OPTIONS.shopinbaz]: {
    [THEMES.LIGHT]: ASSETS_PATHS.LOGOS.SHOPINBAZ_LIGHT,
    [THEMES.DARK]: ASSETS_PATHS.LOGOS.SHOPINBAZ_DARK,
  },
};

/** Retorna el logo correspondiente según la vista (view) y el tema. */
export function getLogoUrl(view: string, theme: string): string {
  return logoMap[view]?.[theme] ?? ASSETS_PATHS.LOGOS.ELEKTRA_LIGHT;
}
