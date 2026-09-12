"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { navLinks, company } from "@/content/site";

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const close = useCallback(() => setMobileOpen(false), []);

  // Lock body scroll while menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, close]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-charcoal/10">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0" onClick={close}>
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
                Send us one invoice
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex items-center justify-center w-11 h-11 -mr-2 text-charcoal/70 hover:text-charcoal"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </Container>
      </header>

      {/* Full-screen mobile menu */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white flex flex-col">
          {/* Header row — same height and gutter as the collapsed header */}
          <div className="flex-shrink-0 border-b border-charcoal/10">
            <Container>
              <div className="flex items-center justify-between h-16">
                <Link href="/" className="flex-shrink-0" onClick={close}>
                  <Logo />
                </Link>
                <button
                  onClick={close}
                  aria-label="Close menu"
                  className="flex items-center justify-center w-11 h-11 -mr-2 text-charcoal/70 hover:text-charcoal"
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4l12 12M16 4L4 16" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </Container>
          </div>

          {/* Nav items — scrollable so very short phones don't clip the button */}
          <div className="flex-1 overflow-y-auto">
            <Container>
              {/* Nav group */}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center w-full min-h-[64px] py-4 border-b border-charcoal/10 text-[28px] font-black tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
                  onClick={close}
                >
                  {link.label}
                </Link>
              ))}

              {/* Contact block — more space above, no rules between items */}
              <div className="pt-10 pb-8 flex flex-col gap-1">
                <a
                  href={company.phoneHref}
                  className="flex items-center w-full min-h-[44px] text-[18px] text-charcoal/70 hover:text-charcoal transition-colors"
                  onClick={close}
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}?subject=Invoice%20for%20review`}
                  className="flex items-center w-full min-h-[44px] text-[18px] text-charcoal/70 hover:text-charcoal transition-colors"
                  onClick={close}
                >
                  {company.email}
                </a>
                <div className="pt-4">
                  <Link
                    href="/contact"
                    className="block w-full bg-charcoal text-white text-sm font-semibold px-4 py-4 text-center hover:bg-charcoal/85 transition-colors"
                    onClick={close}
                  >
                    Send us one invoice
                  </Link>
                </div>
              </div>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}
