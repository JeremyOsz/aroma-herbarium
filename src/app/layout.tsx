import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aromatherapy Herbarium",
  description:
    "Scent, mood, and layering—browse families, regional scent lanes, and top–heart–base blending notes.",
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
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
