import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import LoginPage from "./page";

describe("LoginPage", () => {
  it("renders the login heading", () => {
    const { container } = render(<LoginPage />);

    expect(container.textContent).toContain("loginPage");
  });

  it("renders a main element with padding", () => {
    const { container } = render(<LoginPage />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});
