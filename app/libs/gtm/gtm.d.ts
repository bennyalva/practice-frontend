import type { DataLayerObject } from "../interfacesLibs";

declare global {
  interface Window {
    dataLayer: DataLayerObject[];
  }
}

export { };
