import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { PrimaryButton } from "./primaryButton";

describe("PrimaryButton", () => {
  it("renders the children text", () => {
    const { container } = render(<PrimaryButton onClick={vi.fn()}>Comenzar</PrimaryButton>);

    expect(container.textContent).toContain("Comenzar");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    const { container } = render(<PrimaryButton onClick={onClick}>Click me</PrimaryButton>);

    fireEvent.click(container.querySelector("button")!);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("applies the disabled attribute to the button", () => {
    const { container } = render(
      <PrimaryButton onClick={vi.fn()} disabled>Comenzar</PrimaryButton>,
    );

    const button = container.querySelector("button")!;
    expect(button).toBeDisabled();
  });


});
