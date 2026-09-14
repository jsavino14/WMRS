"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { nav, company } from "@/content/site";

function ChevronDown({ style }: { style?: React.CSSProperties }) {
  return (
    <svg
      width="11" height="11" viewBox="0 0 11 11" fill="none"
      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
      aria-hidden="true"
      style={style}
    >
      <path d="M2 4l3.5 3.5L9 4" />
    </svg>
  );
}

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const close = useCallback(() => {
    setMobileOpen(false);
    setExpandedItem(null);
  }, []);

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
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((item) => {
                if (item.dropdown) {
                  return (
                    <div key={item.label} className="relative group">
                      {item.href ? (
                        <Link
                          href={item.href}
                          className="flex items-center gap-1.5 h-16 px-4 text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-150"
                        >
                          {item.label}
                          <ChevronDown />
                        </Link>
                      ) : (
                        <button
                          className="flex items-center gap-1.5 h-16 px-4 text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-150"
                          aria-haspopup="true"
                        >
                          {item.label}
                          <ChevronDown />
                        </button>
                      )}
                      {/* Dropdown panel — appears on group hover */}
                      <div
                        className="absolute left-0 top-full z-40 pointer-events-none opacity-0 group-hover:pointer-events-auto group-hover:opacity-100 transition-opacity duration-150"
                      >
                        <div className="bg-white shadow-lg border border-charcoal/10 py-1.5 min-w-[210px]">
                          {item.dropdown.map((d) => (
                            <Link
                              key={d.href}
                              href={d.href}
                              className="block px-4 py-2.5 text-sm text-charcoal/65 hover:text-charcoal hover:bg-charcoal/[0.04] transition-colors"
                            >
                              {d.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className="flex items-center h-16 px-4 text-sm text-charcoal/60 hover:text-charcoal transition-colors duration-150"
                  >
                    {item.label}
                  </Link>
                );
              })}
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
          {/* Header row */}
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

          {/* Nav items - scrollable */}
          <div className="flex-1 overflow-y-auto">
            <Container>
              {nav.map((item) => {
                const isExpanded = expandedItem === item.label;

                if (item.dropdown && item.href) {
                  // Services: label links to /services, chevron tap expands submenu
                  return (
                    <div key={item.label}>
                      <div className="flex items-stretch border-b border-charcoal/10">
                        <Link
                          href={item.href}
                          onClick={close}
                          className="flex-1 flex items-center min-h-[64px] py-4 text-[30px] font-black tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
                        >
                          {item.label}
                        </Link>
                        <button
                          onClick={() => setExpandedItem((prev) => prev === item.label ? null : item.label)}
                          aria-label={isExpanded ? "Collapse" : "Expand"}
                          className="flex items-center justify-center w-12 flex-shrink-0 text-charcoal/50 hover:text-charcoal"
                        >
                          <ChevronDown style={{ transform: isExpanded ? "rotate(180deg)" : undefined, transition: "transform 200ms ease" }} />
                        </button>
                      </div>
                      {isExpanded && (
                        <div className="bg-charcoal/[0.03] border-b border-charcoal/10">
                          {item.dropdown.map((d) => (
                            <Link
                              key={d.href}
                              href={d.href}
                              onClick={close}
                              className="flex items-center min-h-[48px] px-4 py-3 text-base text-charcoal/70 hover:text-charcoal border-b border-charcoal/5 last:border-0 transition-colors"
                            >
                              {d.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                if (item.dropdown && !item.href) {
                  // Industries: whole row is expander, no link
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() => setExpandedItem((prev) => prev === item.label ? null : item.label)}
                        className="flex items-center justify-between w-full min-h-[64px] py-4 border-b border-charcoal/10 text-[30px] font-black tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          style={{
                            transform: isExpanded ? "rotate(180deg)" : undefined,
                            transition: "transform 200ms ease",
                            flexShrink: 0,
                            marginRight: "2px",
                          }}
                        />
                      </button>
                      {isExpanded && (
                        <div className="bg-charcoal/[0.03] border-b border-charcoal/10">
                          {item.dropdown.map((d) => (
                            <Link
                              key={d.href}
                              href={d.href}
                              onClick={close}
                              className="flex items-center min-h-[48px] px-4 py-3 text-base text-charcoal/70 hover:text-charcoal border-b border-charcoal/5 last:border-0 transition-colors"
                            >
                              {d.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                }

                // Direct link (Site Management, Who We Are)
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={close}
                    className="flex items-center w-full min-h-[64px] py-4 border-b border-charcoal/10 text-[30px] font-black tracking-tight text-charcoal hover:text-charcoal/70 transition-colors"
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Contact block */}
              <div className="pt-10 pb-8 flex flex-col gap-1">
                <a
                  href={company.phoneHref}
                  onClick={close}
                  className="flex items-center w-full min-h-[44px] text-[18px] text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  {company.phone}
                </a>
                <a
                  href={`mailto:${company.email}?subject=Invoice%20for%20review`}
                  onClick={close}
                  className="flex items-center w-full min-h-[44px] text-[18px] text-charcoal/70 hover:text-charcoal transition-colors"
                >
                  {company.email}
                </a>
                <div className="pt-4 flex flex-col gap-3">
                  <Link
                    href="/contact"
                    onClick={close}
                    className="block w-full bg-charcoal text-white text-sm font-semibold px-4 py-4 text-center hover:bg-charcoal/85 transition-colors"
                  >
                    Send us one invoice
                  </Link>
                  <Link
                    href="/services/temp-containers"
                    onClick={close}
                    className="block w-full border border-charcoal/30 text-charcoal text-sm font-semibold px-4 py-4 text-center hover:border-charcoal transition-colors"
                  >
                    Request a container
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
