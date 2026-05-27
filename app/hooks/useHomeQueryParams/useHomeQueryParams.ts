"use client";

import { useSearchParams } from "next/navigation";
import { THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";
import { getLogoUrl } from "@/app/helpers/assets/getAssetPath";
import { QUERY_PARAM_KEYS, WELCOME_TITLES } from "../constantsHooks";

const VALID_VIEWS = Object.values(VIEW_OPTIONS) as string[];
const VALID_THEMES = Object.values(THEMES) as string[];

function resolveView(view: string | null): string {
  if (!view) return VIEW_OPTIONS.elektraLoan;
  return VALID_VIEWS.includes(view) ? view : VIEW_OPTIONS.elektraLoan;
}

function resolveTheme(theme: string | null): string {
  if (!theme) return THEMES.LIGHT;
  return VALID_THEMES.includes(theme) ? theme : THEMES.LIGHT;
}

const viewConfigs: Record<string, Pick<HomeQueryParamsResult, "welcomeTitle">> = {
  [VIEW_OPTIONS.elektraLoan]: {
    welcomeTitle: WELCOME_TITLES.elektraLoan,
  },
  [VIEW_OPTIONS.shopinbaz]: {
    welcomeTitle: WELCOME_TITLES.shopinbaz,
  },
};

export function useHomeQueryParams(): HomeQueryParamsResult {
  const searchParams = useSearchParams();

  const configView = resolveView(searchParams.get(QUERY_PARAM_KEYS.VIEW));
  const theme = resolveTheme(searchParams.get(QUERY_PARAM_KEYS.THEME));

  return {
    ...viewConfigs[configView],
    logoUrl: getLogoUrl(configView, theme),
    theme,
  };
}
