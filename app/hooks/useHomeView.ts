"use client";

import { useSearchParams } from "next/navigation";
import { ViewOptions } from "@/app/constantsGlobals";

const viewConfigs: Record<string, HomeQueryParamsResult> = {
  [ViewOptions.elektraLoan]: {
    logoUrl: "/images/pages/home/elecktraLight.png",
    welcomeTitle: "¡Te damos la bienvenida a Préstamo Elektra!",
  },
  [ViewOptions.shopinbaz]: {
    logoUrl: "/images/pages/home/shopinbazLight.png",
    welcomeTitle: "¡Te damos la bienvenida a Shopinbaz!",

  },
};


function getViewConfig(config: string | null): HomeQueryParamsResult {
  if (config && config in viewConfigs) {
    return viewConfigs[config];
  }
  return viewConfigs[ViewOptions.elektraLoan];
}



export function useHomeQueryParams(): HomeQueryParamsResult {
  const searchParams = useSearchParams();

  const configView = searchParams.get("num") || ViewOptions.elektraLoan;
  //const view = searchParams.get("view");
;

  return {
    ...getViewConfig(configView),
  };
}
