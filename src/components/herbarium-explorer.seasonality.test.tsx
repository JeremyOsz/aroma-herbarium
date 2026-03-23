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
  it("renders a London Seasonality trigger", () => {
    searchParamsValue = "";
    render(<HerbariumExplorer />);

    expect(screen.getByRole("tab", { name: "London Seasonality" })).toBeInTheDocument();
  });

  it("renders seasonality content from URL tab param", () => {
    searchParamsValue = "tab=seasonality";
    render(<HerbariumExplorer />);

    expect(screen.getByText("General Guide to London Seasonality")).toBeInTheDocument();
    expect(screen.getByText("Monthly Sunshine and Sunset Averages")).toBeInTheDocument();
    expect(screen.getByText("Sunshine hours (avg)")).toBeInTheDocument();
    expect(screen.getByText(/86\s*·\s*Very High/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", {
        name: "London monthly sunshine and sunset averages chart with dual axes",
      }),
    ).toBeInTheDocument();
  });
});
