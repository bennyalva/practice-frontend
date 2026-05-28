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



    it("calls onClose when the close button is clicked", () => {
      const onClose = vi.fn();
      render(<Modal {...buildProps({ onClose })} />);

      fireEvent.click(queryDOM().button()!);

      expect(onClose).toHaveBeenCalledTimes(1);
    });




  });
});
