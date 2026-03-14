import type { Metadata, Viewport } from "next";

import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#fbf8f2",
};

export const metadata: Metadata = {
  title: "Aromatherapy Herbarium",
  description:
    "Vintage-inspired aromatherapy lookup with Archive.org herbarium scans, world scent lanes, and blend layering guides.",
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
