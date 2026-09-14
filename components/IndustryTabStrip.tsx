"use client";

import { usePathname, useRouter } from "next/navigation";
import { startTransition, useEffect, useRef } from "react";
import { industryPages } from "@/content/site";

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => unknown;
};

export function IndustryTabStrip() {
  const pathname = usePathname();
  const router = useRouter();

  const activeIndex = industryPages.findIndex(
    (p) => pathname === `/industries/${p.slug}`
  );

  // Tracks the most recent activeIndex so popstate handler can determine direction
  const prevIndexRef = useRef(activeIndex);
  useEffect(() => {
    prevIndexRef.current = activeIndex;
  }, [activeIndex]);

  // Set direction attribute for browser back/forward
  useEffect(() => {
    function handlePopState() {
      const newPath = window.location.pathname;
      const newIndex = industryPages.findIndex(
        (p) => newPath === `/industries/${p.slug}`
      );
      if (newIndex === -1) return;
      const dir = newIndex < prevIndexRef.current ? "back" : "forward";
      document.documentElement.dataset.vtDirection = dir;
    }
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function canTransition(): boolean {
    if (typeof document === "undefined" || typeof window === "undefined") return false;
    const doc = document as DocWithVT;
    return (
      !!doc.startViewTransition &&
      window.innerWidth >= 768 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleTabClick(toIndex: number, slug: string) {
    if (toIndex === activeIndex) return;
    const href = `/industries/${slug}`;
    if (!canTransition()) {
      router.push(href);
      return;
    }
    const dir = toIndex < activeIndex ? "back" : "forward";
    document.documentElement.dataset.vtDirection = dir;
    (document as DocWithVT).startViewTransition!(() => {
      startTransition(() => {
        router.push(href);
      });
    });
  }

  return (
    <div className="bg-white border-b border-charcoal/10">
      <div className="overflow-x-auto">
        <div className="flex px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {industryPages.map((page, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={page.slug}
                onClick={() => handleTabClick(i, page.slug)}
                className={`whitespace-nowrap px-4 py-4 text-sm font-medium border-b-2 transition-colors duration-150 ${
                  isActive
                    ? "border-accent text-charcoal font-semibold"
                    : "border-transparent text-charcoal/55 hover:text-charcoal hover:border-charcoal/20"
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
