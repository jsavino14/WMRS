"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { nav, company, servicePages } from "@/content/site";
import type { NavTopItem } from "@/content/site";
import { useNavHover } from "./NavHoverContext";
import { SectionTabStrip } from "./SectionTabStrip";

const STRIP_BG = "#F1F3F1";

// Services is the only section with a hover strip
const SECTION_PAGES: Record<string, readonly { slug: string; label: string }[]> = {
  services: servicePages,
};

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

function isNavItemActive(item: NavTopItem, pathname: string): boolean {
  if (item.activePrefix) return pathname.startsWith(item.activePrefix);
  if (item.href) return pathname.startsWith(item.href);
  return false;
}

export function Nav() {
  const pathname = usePathname();
  const {
    hoveredSection,
    openSection,
    openImmediate,
    closeSection,
    cancelClose,
    closeImmediate,
  } = useNavHover();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  // Services is the only section with a tab strip in-flow
  const isOnSectionPage = pathname.startsWith("/services");

  // Remember last hovered section so the overlay content persists during fade-out
  const lastSectionRef = useRef<string | null>(null);
  if (hoveredSection !== null) lastSectionRef.current = hoveredSection;
  const overlaySection = hoveredSection ?? lastSectionRef.current;

  // Refs for focus restoration after Escape
  const sectionBtnRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const close = useCallback(() => {
    setMobileOpen(false);
    setExpandedItem(null);
  }, []);

  // Scroll tracking for header border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll(); // initialise
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Close hover on route change
  useEffect(() => {
    closeImmediate();
  }, [pathname, closeImmediate]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Close mobile menu on Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, close]);

  // Close hover strip on Escape and restore focus
  useEffect(() => {
    if (!hoveredSection) return;
    const section = hoveredSection;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeImmediate();
        sectionBtnRefs.current[section]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [hoveredSection, closeImmediate]);

  const overlayOpen = !!hoveredSection && !isOnSectionPage;

  // Header border:
  // - When scrolled: always show border on mobile
  // - When scrolled on desktop section pages: suppress (strip provides separation)
  // - On section pages below 768px: strip is hidden, so border shows normally
  const borderClass = scrolled
    ? isOnSectionPage
      ? "border-b border-charcoal/10 md:border-b-0"
      : "border-b border-charcoal/10"
    : "";

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white transition-[border-color] duration-150 ${borderClass}`}>
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0"
              onClick={close}
              onMouseEnter={() => closeImmediate()}
            >
              <Logo />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {nav.map((item) => {
                const active = isNavItemActive(item, pathname);
                const baseClass = `flex items-center h-16 px-5 transition-colors duration-150 ${
                  active
                    ? "text-charcoal font-semibold"
                    : "text-charcoal/75 font-medium hover:text-charcoal"
                }`;

                if (item.dropdown) {
                  const sectionKey = item.activePrefix!.slice(1);
                  const isOpen = hoveredSection === sectionKey;
                  return (
                    <button
                      key={item.label}
                      ref={(el) => { sectionBtnRefs.current[sectionKey] = el; }}
                      className={`${baseClass} gap-1.5`}
                      style={{ fontSize: "16px" }}
                      aria-expanded={isOpen}
                      aria-controls="nav-section-strip"
                      onMouseEnter={() => openSection(sectionKey)}
                      onMouseLeave={() => closeSection()}
                      onClick={() => {
                        if (isOpen) closeImmediate();
                        else openImmediate(sectionKey);
                      }}
                    >
                      {item.label}
                      <ChevronDown
                        style={{
                          transform: (isOnSectionPage || isOpen) ? "rotate(180deg)" : undefined,
                          transition: prefersReduced || isOnSectionPage
                            ? "none"
                            : isOpen
                              ? "transform 180ms ease-out"
                              : "transform 140ms ease-in",
                        }}
                      />
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    className={baseClass}
                    style={{ fontSize: "16px" }}
                    onMouseEnter={() => closeImmediate()}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div
              className="hidden md:flex items-center gap-4"
              onMouseEnter={() => closeImmediate()}
            >
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

      {/* Services sticky strip — desktop only, sticks directly below header on /services/* */}
      {isOnSectionPage && (
        <div className="hidden md:block sticky top-16 z-40">
          <SectionTabStrip pages={servicePages} basePath="/services" />
        </div>
      )}

      {/* State C: overlay strip — desktop only, slides down below header on non-section pages */}
      <div className="hidden md:block">
        <div
          id="nav-section-strip"
          style={{
            position: "fixed",
            top: "4rem",
            left: 0,
            right: 0,
            zIndex: 49,
            background: STRIP_BG,
            boxShadow: overlayOpen ? "0 6px 16px rgba(30,36,40,0.07)" : "none",
            opacity: overlayOpen ? 1 : 0,
            transform: overlayOpen ? "translateY(0)" : "translateY(-100%)",
            transition: overlayOpen
              ? "opacity 180ms ease-out, transform 180ms ease-out, box-shadow 180ms ease-out"
              : "opacity 140ms ease-in, transform 140ms ease-in, box-shadow 140ms ease-in",
            pointerEvents: overlayOpen ? "auto" : "none",
          }}
          onMouseEnter={cancelClose}
          onMouseLeave={closeSection}
        >
          <div className="overflow-x-auto hide-scrollbar" style={{ scrollbarWidth: "none" }}>
            <div className="flex px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {overlaySection &&
                SECTION_PAGES[overlaySection]?.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/${overlaySection}/${page.slug}`}
                    className="whitespace-nowrap flex-shrink-0 px-[13px] py-3 text-[12.5px] font-medium border-b-2 border-transparent text-charcoal/50 hover:text-charcoal transition-colors duration-150"
                  >
                    {page.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>

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

          {/* Nav items — scrollable */}
          <div className="flex-1 overflow-y-auto">
            <Container>
              {nav.map((item) => {
                const isExpanded = expandedItem === item.label;
                const active = isNavItemActive(item, pathname);
                const itemClass = `text-[30px] font-black tracking-tight transition-colors ${
                  active ? "text-charcoal" : "text-charcoal/70 hover:text-charcoal"
                }`;

                if (item.dropdown) {
                  // Services: mobile accordion
                  return (
                    <div key={item.label}>
                      <button
                        onClick={() =>
                          setExpandedItem((prev) =>
                            prev === item.label ? null : item.label
                          )
                        }
                        className={`flex items-center justify-between w-full min-h-[64px] py-4 border-b border-charcoal/10 ${itemClass}`}
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

                // Plain link (Industries, Site Management, Who We Are)
                return (
                  <Link
                    key={item.label}
                    href={item.href!}
                    onClick={close}
                    className={`flex items-center w-full min-h-[64px] py-4 border-b border-charcoal/10 ${itemClass}`}
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
