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


  });
});
