import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
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

// generateMetadata reads the request host so metadataBase — and therefore
// og:image / twitter:image — resolve to whatever domain is serving the page.
// This means no config change is needed when DNS moves to wmrservice.com.
// Trade-off: reading headers() opts the root layout into dynamic rendering.
// Vercel caches the responses, so there is no perceptible performance impact.
export async function generateMetadata(): Promise<Metadata> {
  const h = await headers();
  const host = h.get("host") ?? "wmrs.vercel.app";
  const proto = h.get("x-forwarded-proto") ?? "http";
  const base = new URL(`${proto}://${host}`);

  return {
    metadataBase: base,
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
    },
    twitter: {
      card: "summary_large_image",
      title: "You're probably overpaying for trash.",
      description:
        "WMRS audits your waste invoices, renegotiates your rates, and takes over the billing. The audit is free. Find nothing and you owe nothing.",
    },
  };
}

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
