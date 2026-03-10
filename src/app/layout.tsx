import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Aromatherapy Herbarium",
  description:
    "Vintage-inspired aromatherapy lookup with Archive.org herbarium scans, world scent lanes, and blend layering guides.",
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
