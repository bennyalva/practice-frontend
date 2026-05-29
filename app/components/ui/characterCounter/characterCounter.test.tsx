import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CharacterCounter } from "./characterCounter";

describe("CharacterCounter", () => {
  it("renders the current and max values in the correct format", () => {
    const { container } = render(<CharacterCounter current={7} max={15} />);

    expect(container.textContent).toContain("7/15");
  });




});
