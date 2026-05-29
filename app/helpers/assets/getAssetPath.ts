import { ASSETS_PATHS, THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";

const logoMap: Record<string, Record<string, string>> = {
  [VIEW_OPTIONS.ELEKTRA_LOAN]: {
    [THEMES.LIGHT]: ASSETS_PATHS.LOGOS.ELEKTRA_LIGHT,
    [THEMES.DARK]: ASSETS_PATHS.LOGOS.ELEKTRA_DARK,
  },
  [VIEW_OPTIONS.SHOPINBAZ]: {
    [THEMES.LIGHT]: ASSETS_PATHS.LOGOS.SHOPINBAZ_LIGHT,
    [THEMES.DARK]: ASSETS_PATHS.LOGOS.SHOPINBAZ_DARK,
  },
};


export function getLogoUrl(view: string, theme: string): string {
  return logoMap[view]?.[theme] ?? ASSETS_PATHS.LOGOS.ELEKTRA_LIGHT;
}
