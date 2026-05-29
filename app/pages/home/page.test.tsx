import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import HomePage from "./page";
import { WELCOME_TITLES } from "@/app/hooks/constantsHooks";
import { ASSETS_PATHS } from "@/app/constantsGlobals";

vi.mock("@/app/hooks/useHomeQueryParams/useHomeQueryParams", () => ({
  useHomeQueryParams: () => ({
    logoUrl: ASSETS_PATHS.LOGOS.ELEKTRA_DARK,
    welcomeTitle: WELCOME_TITLES.ELEKTRA_LOAN,
    colorTitle: "text-title-elektra",
  }),
}));

vi.mock("@/app/hooks/useModal/useModal", () => ({
  useModal: () => ({
    modal: { isOpen: false, type: "info", title: "", message: "" },
    showInfo: vi.fn(),
    showByError: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

vi.mock("@/app/libs/gtm/gtm", () => ({
  pushToDataLayer: vi.fn(),
}));

describe("HomePage", () => {
  it("renders the welcome title inside Suspense", async () => {
    const { container } = render(<HomePage />);

    expect(container.textContent).toContain(WELCOME_TITLES.ELEKTRA_LOAN);
  });

  it("renders the 'Comenzar' button", () => {
    const { container } = render(<HomePage />);

    expect(container.textContent).toContain("Comenzar");
  });
});
