import { THEMES } from "@/app/constantsGlobals";

export function applyTheme(theme: string): void {
  const root = document.documentElement;
  if (theme === THEMES.DARK) {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
}
