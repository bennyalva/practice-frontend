import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import SpeechIcon from "./speechIcon";

describe("SpeechIcon", () => {
  it("renders the microphone path when listening is false (default)", () => {
    const { container } = render(<SpeechIcon />);

    const path = container.querySelector("path")!;
    expect(path).toBeInTheDocument();
    expect(path.getAttribute("d")).toContain("M12 18.75a6");
  });

  it("renders the stop/square path when listening is true", () => {
    const { container } = render(<SpeechIcon listening />);

    const path = container.querySelector("path")!;
    expect(path).toBeInTheDocument();
    expect(path.getAttribute("d")).toContain("M5.25 7.5A2.25");
  });

  it("renders different path data for each state", () => {
    const { container: idleContainer } = render(<SpeechIcon listening={false} />);
    const { container: listeningContainer } = render(<SpeechIcon listening={true} />);

    const idlePath = idleContainer.querySelector("path")!.getAttribute("d");
    const listeningPath = listeningContainer.querySelector("path")!.getAttribute("d");

    expect(idlePath).not.toEqual(listeningPath);
  });


});
