import { DataLayerObject } from "../interfacesLibs";


/**
 * Pushes an event to the GTM dataLayer.
 * Safe to call during SSR — silently no-ops when `window` is unavailable.
 */
export function pushToDataLayer(data: DataLayerObject): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}
