import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { HomePageContent } from "./HomePageContent";
import { WELCOME_TITLES } from "@/app/hooks/constantsHooks";
import { GTM_EVENTS, ASSETS_PATHS } from "@/app/constantsGlobals";

const mockPushToDataLayer = vi.fn();
const mockShowInfo = vi.fn();
const mockShowByError = vi.fn();
const mockCloseModal = vi.fn();

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
    showInfo: mockShowInfo,
    showByError: mockShowByError,
    closeModal: mockCloseModal,
  }),
}));

vi.mock("@/app/libs/gtm/gtm", () => ({
  pushToDataLayer: (...args: unknown[]) => mockPushToDataLayer(...args),
}));

describe("HomePageContent", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the welcome title", () => {
      const { container } = render(<HomePageContent />);

      expect(container.textContent).toContain(WELCOME_TITLES.ELEKTRA_LOAN);
    });

    it("renders the description text", () => {
      const { container } = render(<HomePageContent />);

      expect(container.textContent).toContain(
        "Usa tu préstamo como dinero en efectivo o compra en donde quieras.",
      );
    });




    it("renders the PrimaryButton with 'Comenzar' text", () => {
      const { container } = render(<HomePageContent />);

      expect(container.textContent).toContain("Comenzar");
    });

    it("renders the InputField component", () => {
      const { container } = render(<HomePageContent />);

      const input = container.querySelector("input");
      expect(input).toBeInTheDocument();
    });
  });


  describe("GTM events", () => {
    it("pushes NAME_DISPLAYED event when the button is clicked", () => {
      const { container } = render(<HomePageContent />);

      const input = container.querySelector("input")!;
      fireEvent.change(input, { target: { value: "Benny" } });
      fireEvent.blur(input);

      const button = container.querySelector("button")!;
      fireEvent.click(button);

      expect(mockPushToDataLayer).toHaveBeenCalledWith({
        event: GTM_EVENTS.NAME_DISPLAYED,
      });
    });
  });

  describe("modal interaction", () => {
    it("calls showInfo when the button is clicked with a valid name", () => {
      const { container } = render(<HomePageContent />);

      const input = container.querySelector("input")!;
      fireEvent.change(input, { target: { value: "Benny" } });
      fireEvent.blur(input);

      const button = container.querySelector("button")!;
      fireEvent.click(button);

      expect(mockShowInfo).toHaveBeenCalledWith(
        "¡Nombre registrado!",
        "Has ingresado: Benny",
        expect.any(Function),
      );
    });
  });
});
