/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { HerbariumExplorer } from "@/components/herbarium-explorer";

let searchParamsValue = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(searchParamsValue),
}));

vi.mock("next/image", () => ({
  default: ({ alt, ...props }: { alt: string }) => <img alt={alt} {...props} />,
}));

describe("HerbariumExplorer seasonality tab", () => {
  it("renders a London Flora tab trigger", () => {
    searchParamsValue = "";
    render(<HerbariumExplorer />);

    expect(screen.getByRole("tab", { name: "London Flora" })).toBeInTheDocument();
  });

  it("renders seasonality content from URL tab param", () => {
    searchParamsValue = "tab=seasonality";
    render(<HerbariumExplorer />);

    expect(screen.getByText("London Flora Through the Year")).toBeInTheDocument();
    expect(screen.getByText("Monthly Sunshine, Sunset, and Temperature")).toBeInTheDocument();
    expect(screen.getByText("Sunshine hours (avg)")).toBeInTheDocument();
    expect(screen.getByText("Mean air temp (°C)")).toBeInTheDocument();
    expect(screen.getByText("Monthly mean air temperature")).toBeInTheDocument();
    expect(screen.getByText(/86\s*·\s*Signature/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "London monthly sunshine, mean temperature, and sunset averages chart with three vertical scales",
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /Birch botanical reference plate/i })).toBeInTheDocument();
    expect(screen.getByText("Timothy Grass")).toBeInTheDocument();
    expect(screen.getByText("Meadow Grasses (Poa)")).toBeInTheDocument();
  });
});
