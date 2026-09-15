"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";
import { useNavHover } from "./NavHoverContext";
import { servicePages } from "@/content/site";

type Page = { readonly slug: string; readonly label: string };
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

const STRIP_BG = "#E6EAE7";

// Only services uses the hover strip now
const SECTION_PAGES: Record<string, readonly Page[]> = {
  services: servicePages,
};

export function SectionTabStrip({
  pages,
  basePath,
}: {
  pages: readonly Page[];
  basePath: string;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { hoveredSection, cancelClose, closeSection } = useNavHover();

  const ownSection = basePath.slice(1); // "/services" → "services"

  // ── Crossfade when hoveredSection changes to a different section ─────────
  const [displayedSection, setDisplayedSection] = useState<string | null>(null);
  const [fading, setFading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const targetSection = hoveredSection ?? ownSection;
    const currentSection = displayedSection ?? ownSection;
    if (targetSection === currentSection) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setDisplayedSection(hoveredSection);
      return;
    }

    setFading(true);
    const t = setTimeout(() => {
      setDisplayedSection(hoveredSection);
      setFading(false);
    }, 70);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredSection]);

  // ── CSS variable: full sticky-stack height ────────────────────────────────
  useEffect(() => {
    function update() {
      const header = document.querySelector("header");
      const strip = wrapperRef.current;
      if (!header || !strip) return;
      document.documentElement.style.setProperty(
        "--sticky-stack-h",
        `${header.offsetHeight + strip.offsetHeight}px`
      );
    }
    update();
    const ro = new ResizeObserver(update);
    const header = document.querySelector("header");
    if (header) ro.observe(header);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const displaySection = displayedSection ?? ownSection;
  const displayPages = SECTION_PAGES[displaySection] ?? pages;
  const displayBasePath = `/${displaySection}`;

  // Active underline only when showing own content and not in hover-preview
  const showActive = displaySection === ownSection;
  const activeIndex = showActive
    ? displayPages.findIndex((p) => pathname === `${displayBasePath}/${p.slug}`)
    : -1;

  // ── Track previous index for popstate direction detection ─────────────────
  const prevIndexRef = useRef(activeIndex);
  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // ── Popstate direction ────────────────────────────────────────────────────
  useEffect(() => {
    function handlePopState() {
      const newPath = window.location.pathname;
      const newIndex = pages.findIndex((p) => newPath === `${basePath}/${p.slug}`);
      if (newIndex === -1) return;
      document.documentElement.dataset.vtDirection =
        newIndex < prevIndexRef.current ? "back" : "forward";
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [basePath, pages]);

  // ── View transitions ──────────────────────────────────────────────────────
  function canTransition(): boolean {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    return (
      !!(document as DocWithVT).startViewTransition &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleTabClick(toIndex: number, slug: string) {
    const href = `${displayBasePath}/${slug}`;
    if (pathname === href) return;
    if (!canTransition()) {
      router.push(href);
      return;
    }
    if (displaySection === ownSection) {
      document.documentElement.dataset.vtDirection =
        toIndex < activeIndex ? "back" : "forward";
    } else {
      delete document.documentElement.dataset.vtDirection;
    }
    (document as DocWithVT).startViewTransition!(() => {
      startTransition(() => router.push(href));
    });
  }

  return (
    <div
      ref={wrapperRef}
      className="relative"
      style={{
        background: STRIP_BG,
        opacity: fading ? 0 : 1,
        transition: "opacity 70ms ease",
      }}
      onMouseEnter={cancelClose}
      onMouseLeave={closeSection}
    >
      <div className="flex px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {displayPages.map((page, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={page.slug}
                onClick={() => handleTabClick(i, page.slug)}
                className={`whitespace-nowrap flex-shrink-0 px-[13px] py-3 text-[12.5px] font-medium border-b-2 transition-colors duration-150 ${
                  isActive
                    ? "border-accent text-charcoal font-semibold"
                    : "border-transparent text-charcoal/50 hover:text-charcoal"
                }`}
              >
                {page.label}
              </button>
            );
          })}
      </div>
    </div>
  );
}
