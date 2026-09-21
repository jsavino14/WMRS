import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://wmrservice.com"),
  title: {
    default: "WMRS - Waste Cost Reduction for Multi-Location Businesses",
    template: "%s | WMRS",
  },
  description:
    "WMRS audits your waste and recycling invoices, renegotiates your rates, and takes over the billing. Free audit, no upfront cost.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WMRS",
    title: "You're probably overpaying for trash.",
    description:
      "WMRS audits your waste invoices, renegotiates your rates, and takes over the billing. The audit is free. Find nothing and you owe nothing.",
    images: [
      {
        url: "https://wmrs.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You're probably overpaying for trash.",
    description:
      "WMRS audits your waste invoices, renegotiates your rates, and takes over the billing. The audit is free. Find nothing and you owe nothing.",
    images: ["https://wmrs.vercel.app/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
