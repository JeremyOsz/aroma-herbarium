import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aromatherapy Herbarium",
  description:
    "Vintage-inspired aromatherapy lookup with Archive.org herbarium scans, world scent lanes, and blend layering guides.",
  themeColor: "#E8E2D4",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", rel: "icon", type: "image/svg+xml" },
    ],
    apple: [{ url: "/icon.svg" }],
    shortcut: [{ url: "/icon.svg" }],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
