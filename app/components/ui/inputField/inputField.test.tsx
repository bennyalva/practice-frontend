import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { InputField } from "./inputField";

vi.mock("@/app/hooks/useSpeechRecognition/useSpeechRecognition", () => ({
  useSpeechRecognition: vi.fn(),
}));

import { useSpeechRecognition } from "@/app/hooks/useSpeechRecognition/useSpeechRecognition";

const mockSpeech = useSpeechRecognition as ReturnType<typeof vi.fn>;

const defaultProps = {
  label: "¿Cómo prefieres que te llamemos?",
  value: "",
  onChange: vi.fn(),
  maxLength: 15,
  placeholder: "Escribe o dicta tu nombre...",
};

function buildProps(overrides = {}) {
  return { ...defaultProps, ...overrides };
}

describe("InputField", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSpeech.mockReturnValue({
      isListening: false,
      hasSupport: false,
      toggleListening: vi.fn(),
    });
  });

  describe("rendering", () => {
    it("renders the label text", () => {
      const { container } = render(<InputField {...buildProps()} />);

      const label = container.querySelector("label")!;
      expect(label).toBeInTheDocument();
      expect(label.textContent).toBe(defaultProps.label);
    });

    it("renders the input with correct placeholder", () => {
      const { container } = render(<InputField {...buildProps()} />);

      const input = container.querySelector("input")!;
      expect(input).toHaveAttribute("placeholder", defaultProps.placeholder);
    });

    it("sets maxLength on the input", () => {
      const { container } = render(<InputField {...buildProps()} />);

      const input = container.querySelector("input")!;
      expect(input).toHaveAttribute("maxlength", defaultProps.maxLength.toString());
    });

    it("renders the input with the initial value from props", () => {
      const { container } = render(<InputField {...buildProps({ value: "Benny" })} />);

      const input = container.querySelector("input")! as HTMLInputElement;
      expect(input.value).toBe("Benny");
    });

    it("renders the character counter", () => {
      const { container } = render(<InputField {...buildProps({ value: "abc" })} />);

      expect(container.textContent).toContain("3");
      expect(container.textContent).toContain("15");
    });
  });


});

describe("validation", () => {
  it("shows error when value is shorter than minimum length on blur", () => {
    const { container } = render(<InputField {...buildProps()} />);

    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.blur(input);

    expect(container.textContent).toContain("Mínimo 4 caracteres");
  });

  it("does not show error when value meets minimum length", () => {
    const { container } = render(<InputField {...buildProps()} />);

    const input = container.querySelector("input")!;
    fireEvent.change(input, { target: { value: "Benny" } });
    fireEvent.blur(input);

    expect(container.textContent).not.toContain("Mínimo 4 caracteres");
  });

});
