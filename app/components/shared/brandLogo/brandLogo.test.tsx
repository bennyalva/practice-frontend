import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BrandLogo } from "./brandLogo";

describe("BrandLogo", () => {
  describe("when logoUrl is provided", () => {
    it("renders an img element with the given URL", () => {
      const { container } = render(<BrandLogo logoUrl="https://example.com/logo.png" />);

      const img = container.querySelector("img")!;
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute("src", "https://example.com/logo.png");
    });

    it("applies correct image styling classes", () => {
      const { container } = render(<BrandLogo logoUrl="https://example.com/logo.png" />);

      const img = container.querySelector("img")!;
      expect(img).toHaveClass("h-6", "w-auto", "object-contain");
    });

    it("uses the default alt text when altText is not provided", () => {
      const { container } = render(<BrandLogo logoUrl="https://example.com/logo.png" />);

      const img = container.querySelector("img")!;
      expect(img).toHaveAttribute("alt", "Logo Elektra");
    });

    it("uses custom alt text when altText is provided", () => {
      const { container } = render(
        <BrandLogo logoUrl="https://example.com/logo.png" altText="Mi App" />,
      );

      const img = container.querySelector("img")!;
      expect(img).toHaveAttribute("alt", "Mi App");
    });
  });

  describe("when logoUrl is null", () => {
    it("renders the fallback text logo", () => {
      const { container } = render(<BrandLogo logoUrl={null} />);

      expect(container.textContent).toContain("elektra");
      expect(container.textContent).toContain("⚡");
    });

  });
});
