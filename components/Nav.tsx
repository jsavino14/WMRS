"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { navLinks, company } from "@/content/site";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-charcoal/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" onClick={() => setMobileOpen(false)}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={company.phoneHref}
              className="text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-150"
            >
              {company.phone}
            </a>
            <Link
              href="/contact"
              className="bg-charcoal text-white text-sm font-semibold px-4 py-2 hover:bg-charcoal/85 transition-colors duration-150"
            >
              Send us an invoice
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-charcoal/70 hover:text-charcoal"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-white">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="py-3 text-sm text-charcoal/70 hover:text-charcoal border-b border-charcoal/5 last:border-0 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href={company.phoneHref}
                className="text-sm text-charcoal/60 hover:text-charcoal"
                onClick={() => setMobileOpen(false)}
              >
                {company.phone}
              </a>
              <Link
                href="/contact"
                className="bg-charcoal text-white text-sm font-semibold px-4 py-3 text-center hover:bg-charcoal/85 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Send us an invoice
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
