"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { GTM_EVENTS, THEMES, VIEW_OPTIONS } from "@/app/constantsGlobals";
import { getLogoUrl } from "@/app/helpers/assets/getAssetPath";
import { QUERY_PARAM_KEYS, TITLE_COLOR_CLASSES, WELCOME_TITLES } from "../constantsHooks";
import type { HomeQueryParamsResult } from "../interfacesHooks";
import { pushToDataLayer } from "@/app/libs/gtm/gtm";

const VALID_VIEWS = Object.values(VIEW_OPTIONS) as string[];
const VALID_THEMES = Object.values(THEMES) as string[];


function resolveView(view: string | null): string {
  if (!view) return VIEW_OPTIONS.ELEKTRA_LOAN;
  return VALID_VIEWS.includes(view) ? view : VIEW_OPTIONS.ELEKTRA_LOAN;
}

function resolveTheme(theme: string | null): string {
  if (!theme) return THEMES.LIGHT;
  return VALID_THEMES.includes(theme) ? theme : THEMES.LIGHT;
}

const viewConfigs: Record<string, Pick<HomeQueryParamsResult, "welcomeTitle">> = {
  [VIEW_OPTIONS.ELEKTRA_LOAN]: {
    welcomeTitle: WELCOME_TITLES.ELEKTRA_LOAN,
  },
  [VIEW_OPTIONS.SHOPINBAZ]: {
    welcomeTitle: WELCOME_TITLES.SHOPINBAZ,
  },
};

export function useHomeQueryParams(): HomeQueryParamsResult {
  const searchParams = useSearchParams();

  const configView = resolveView(searchParams.get(QUERY_PARAM_KEYS.VIEW));
  const theme = resolveTheme(searchParams.get(QUERY_PARAM_KEYS.THEME));

  useEffect(() => {
    pushToDataLayer({
      event: GTM_EVENTS.THEME_LOADED,
      num: configView,
    });
  }, [pushToDataLayer]);

  return {
    ...viewConfigs[configView],
    logoUrl: getLogoUrl(configView, theme),
    theme,
    colorTitle: TITLE_COLOR_CLASSES[configView],
  };
}
