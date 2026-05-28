import { describe, it, expect, vi, afterEach } from "vitest";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { Modal } from "./modal";

const defaultProps = {
  isOpen: true,
  onClose: vi.fn(),
  title: "Título del modal",
  message: "Este es el mensaje del modal.",
  type: "info" as const,
};

function buildProps(overrides = {}) {
  return { ...defaultProps, ...overrides };
}

// Headless UI Dialog renders via portal to document.body, not into RTL's container.
// We query document.body directly and clean up between tests to avoid DOM accumulation.
afterEach(() => {
  cleanup();
});

function queryDOM() {
  return {
    body: document.body,
    title: () => document.body.textContent ?? "",
    button: () => document.body.querySelector<HTMLButtonElement>('button[aria-label="Cerrar"]'),
    svg: () => document.body.querySelector("svg"),
    iconByBg: (bg: string) => document.body.querySelector(`.${bg}`),
  };
}

describe("Modal", () => {
  describe("when isOpen is true", () => {
    it("renders the title", () => {
      render(<Modal {...buildProps()} />);

      expect(queryDOM().title()).toContain(defaultProps.title);
    });

    it("renders the message", () => {
      render(<Modal {...buildProps()} />);

      expect(queryDOM().title()).toContain(defaultProps.message);
    });

    it("renders the close button with accessible label", () => {
      render(<Modal {...buildProps()} />);

      expect(queryDOM().button()).toBeInTheDocument();
    });

    it("calls onClose when the close button is clicked", () => {
      const onClose = vi.fn();
      render(<Modal {...buildProps({ onClose })} />);

      fireEvent.click(queryDOM().button()!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("renders the ModalIcon (contains an SVG)", () => {
      render(<Modal {...buildProps()} />);

      expect(queryDOM().svg()).toBeInTheDocument();
    });


  });

  describe("when isOpen is false", () => {
    it("does not render the title", () => {
      render(<Modal {...buildProps({ isOpen: false })} />);

      expect(queryDOM().title()).not.toContain(defaultProps.title);
    });

    it("does not render the message", () => {
      render(<Modal {...buildProps({ isOpen: false })} />);

      expect(queryDOM().title()).not.toContain(defaultProps.message);
    });

    it("does not render the close button", () => {
      render(<Modal {...buildProps({ isOpen: false })} />);

      expect(queryDOM().button()).toBeNull();
    });
  });
});
