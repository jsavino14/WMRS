"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef, useState } from "react";

type Page = { readonly slug: string; readonly label: string };
type DocWithVT = Document & { startViewTransition?: (cb: () => void) => unknown };

const STRIP_BG = "#F7F8F7";
const STRIP_BORDER = "#E5E8E6";

export function SectionTabStrip({
  pages,
  basePath,
}: {
  pages: readonly Page[];
  basePath: string;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = pages.findIndex(
    (p) => pathname === `${basePath}/${p.slug}`
  );

  // Track previous index for popstate direction detection
  const prevIndexRef = useRef(activeIndex);
  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Per-tab refs so we can scrollIntoView on the active one
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Scroll active tab into view on mount and when route changes
  useEffect(() => {
    tabRefs.current[activeIndex]?.scrollIntoView({
      behavior: "auto",
      block: "nearest",
      inline: "nearest",
    });
  }, [activeIndex]);

  // Fade mask visibility
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  function updateFades() {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 1);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateFades();
    el.addEventListener("scroll", updateFades, { passive: true });
    const ro = new ResizeObserver(updateFades);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateFades);
      ro.disconnect();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-check fades after active tab changes (scroll position may have shifted)
  useEffect(() => { updateFades(); }, [activeIndex]);

  // Set direction attribute for browser back/forward
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

  function canTransition(): boolean {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    return (
      !!(document as DocWithVT).startViewTransition &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleTabClick(toIndex: number, slug: string) {
    if (toIndex === activeIndex) return;
    const href = `${basePath}/${slug}`;
    if (!canTransition()) {
      router.push(href);
      return;
    }
    document.documentElement.dataset.vtDirection =
      toIndex < activeIndex ? "back" : "forward";
    (document as DocWithVT).startViewTransition!(() => {
      startTransition(() => router.push(href));
    });
  }

  return (
    <div
      className="relative"
      style={{ background: STRIP_BG, borderBottom: `1px solid ${STRIP_BORDER}` }}
    >
      {/* Left fade — shown once scrolled away from start */}
      {showLeft && (
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-10 z-10"
          style={{ background: `linear-gradient(to right, ${STRIP_BG}, transparent)` }}
        />
      )}
      {/* Right fade — shown when more tabs are off-screen to the right */}
      {showRight && (
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-10 z-10"
          style={{ background: `linear-gradient(to left, ${STRIP_BG}, transparent)` }}
        />
      )}

      {/* Scrollable row — full-bleed bg already on parent, no inner bg needed */}
      <div
        ref={scrollRef}
        className="hide-scrollbar overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        <div className="flex px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {pages.map((page, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={page.slug}
                ref={(el) => { tabRefs.current[i] = el; }}
                onClick={() => handleTabClick(i, page.slug)}
                className={`whitespace-nowrap flex-shrink-0 px-4 py-[13px] text-[13px] font-medium border-b-2 transition-colors duration-150 ${
                  isActive
                    ? "border-accent text-charcoal font-semibold"
                    : "border-transparent text-charcoal/55 hover:text-charcoal"
                }`}
              >
                {page.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
