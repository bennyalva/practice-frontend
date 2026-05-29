import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import AdminPage from "./page";

describe("AdminPage", () => {
  it("renders the admin heading", () => {
    const { container } = render(<AdminPage />);

    expect(container.textContent).toContain("adminPage");
  });

  it("renders a main element with padding", () => {
    const { container } = render(<AdminPage />);

    const main = container.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});
