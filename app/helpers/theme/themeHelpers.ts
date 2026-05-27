import { THEMES } from "@/app/constantsGlobals";

export function applyTheme(theme: string): void {
  const root = document.documentElement;
  if (theme === THEMES.DARK) {
    root.classList.add(THEMES.DARK);
  } else {
    root.classList.remove(THEMES.DARK);
  }
}
