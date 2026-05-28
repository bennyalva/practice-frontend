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



  it("does not remove other classes from the root element", () => {
    document.documentElement.classList.add("dark", "custom-class");

    applyTheme("light");

    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(document.documentElement.classList.contains("custom-class")).toBe(true);
  });


});
