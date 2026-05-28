import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ModalIcon } from "./modalIcon";


describe("ModalIcon", () => {
  it("renders the info variant with blue background", () => {
    const { container } = render(<ModalIcon type="info" />);

    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass("bg-blue-500");
    expect(wrapper).toHaveClass("w-9", "h-9", "rounded-full", "flex", "items-center", "justify-center", "flex-shrink-0");
  });

  it("renders the warning variant with amber background", () => {
    const { container } = render(<ModalIcon type="warning" />);

    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass("bg-amber-500");
  });

  it("renders the error variant with red background", () => {
    const { container } = render(<ModalIcon type="error" />);

    const wrapper = container.firstElementChild!;
    expect(wrapper).toHaveClass("bg-red-500");
  });



});
