import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { SpeechInputButton } from "./speechInputButton";

describe("SpeechInputButton", () => {
  describe("when hasSupport is false", () => {
    it("returns null (renders nothing)", () => {
      const { container } = render(
        <SpeechInputButton isListening={false} hasSupport={false} onToggle={vi.fn()} />,
      );

      expect(container.firstElementChild).toBeNull();
    });
  });

  describe("when hasSupport is true", () => {
    it("renders a button element", () => {
      const { container } = render(
        <SpeechInputButton isListening={false} hasSupport onToggle={vi.fn()} />,
      );

      expect(container.querySelector("button")).toBeInTheDocument();
    });

    it("renders SpeechIcon inside the button", () => {
      const { container } = render(
        <SpeechInputButton isListening={false} hasSupport onToggle={vi.fn()} />,
      );

      const svg = container.querySelector("svg");
      expect(svg).toBeInTheDocument();
    });

    it("calls onToggle when clicked", () => {
      const onToggle = vi.fn();
      const { container } = render(
        <SpeechInputButton isListening={false} hasSupport onToggle={onToggle} />,
      );

      fireEvent.click(container.querySelector("button")!);

      expect(onToggle).toHaveBeenCalledTimes(1);
    });


    describe("when isListening is true", () => {
      it("applies listening-specific classes", () => {
        const { container } = render(
          <SpeechInputButton isListening hasSupport onToggle={vi.fn()} />,
        );

        const button = container.querySelector("button")!;
        expect(button).toHaveClass("text-red-500", "scale-110", "animate-pulse");
      });

    });

    describe("when isListening is false", () => {
      it("applies idle-specific classes", () => {
        const { container } = render(
          <SpeechInputButton isListening={false} hasSupport onToggle={vi.fn()} />,
        );

        const button = container.querySelector("button")!;
        expect(button).toHaveClass("text-secondary", "hover:text-primary");
      });

    });
  });
});
