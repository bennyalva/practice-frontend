import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CharacterCounter } from "./characterCounter";

describe("CharacterCounter", () => {
  it("renders the current and max values in the correct format", () => {
    const { container } = render(<CharacterCounter current={7} max={15} />);

    expect(container.textContent).toContain("7/15");
  });


  it("updates when current and max props change", () => {
    const { container, rerender } = render(<CharacterCounter current={3} max={15} />);

    expect(container.textContent).toContain("3/15");

    rerender(<CharacterCounter current={5} max={15} />);
    expect(container.textContent).toContain("5/15");

    rerender(<CharacterCounter current={5} max={20} />);
    expect(container.textContent).toContain("5/20");
  });

  it("applies the text size and color classes", () => {
    const { container } = render(<CharacterCounter current={7} max={10} />);

    const span = container.querySelector("span")!;
    expect(span).toHaveClass("text-xs", "text-secondary");
  });

});
