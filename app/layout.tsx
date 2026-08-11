import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://wmrs.com"),
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
