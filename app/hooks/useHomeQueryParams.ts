"use client";

import { useSearchParams } from "next/navigation";
import { THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";
import { getLogoUrl } from "@/app/helpers/assets/getAssetPath";
import { QUERY_PARAM_KEYS, WELCOME_TITLES } from "./constantsHooks";


const viewConfigs: Record<string, Pick<HomeQueryParamsResult, "welcomeTitle">> = {
  [VIEW_OPTIONS.elektraLoan]: {
    welcomeTitle: WELCOME_TITLES.elektraLoan,
  },
  [VIEW_OPTIONS.shopinbaz]: {
    welcomeTitle: WELCOME_TITLES.shopinbaz,
  },
};

function getViewConfig(
  config: string | null,
): Pick<HomeQueryParamsResult, "welcomeTitle"> {
  if (config && config in viewConfigs) {
    return viewConfigs[config];
  }
  return viewConfigs[VIEW_OPTIONS.elektraLoan];
}

export function useHomeQueryParams(): HomeQueryParamsResult {
  const searchParams = useSearchParams();

  const configView = searchParams.get(QUERY_PARAM_KEYS.VIEW) || VIEW_OPTIONS.elektraLoan;
  const theme = searchParams.get(QUERY_PARAM_KEYS.THEME) || THEMES.LIGHT;


  return {
    ...getViewConfig(configView),
    logoUrl: getLogoUrl(configView, theme),
    theme,
  };
}
