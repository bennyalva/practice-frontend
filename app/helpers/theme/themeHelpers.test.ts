import { describe, it, expect, beforeEach } from "vitest";
import { applyTheme } from "./themeHelpers";

describe("applyTheme", () => {
  beforeEach(() => {
    document.documentElement.classList.remove("dark");
  });

  it('adds the "dark" class when theme is "dark"', () => {
    applyTheme("dark");

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it('removes the "dark" class when theme is "light"', () => {
    document.documentElement.classList.add("dark");

    applyTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });




});
