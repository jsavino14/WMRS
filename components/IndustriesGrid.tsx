"use client";

import { useState, useEffect, useRef } from "react";
import { industries } from "@/content/site";

const INDUSTRY_ICONS: Record<string, string> = {
  "Restaurant Groups":              "/icons/industries/restaurant-groups.svg",
  "Hotel & Hospitality":            "/icons/industries/hotel-hospitality.svg",
  "Retail Chains":                  "/icons/industries/retail-chains.svg",
  "Commercial Property Management": "/icons/industries/commercial-property.svg",
  "Healthcare Facilities":          "/icons/industries/healthcare.svg",
  "Grocery & Food Service":         "/icons/industries/grocery-food.svg",
  "Manufacturing":                  "/icons/industries/manufacturing.svg",
  "Entertainment Venues":           "/icons/industries/entertainment.svg",
  "Educational Institutions":       "/icons/industries/education.svg",
};

const TRANSITION = "transform 200ms ease-out";

const FILTERED = industries.filter((ind) => ind.name !== "Office Buildings");

export function IndustriesGrid() {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!isTouch || prefersReduced) return;
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => setActiveCard(prev =>
          entry.isIntersecting ? i : prev === i ? null : prev
        ),
        { rootMargin: "-45% 0px -45% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [isTouch, prefersReduced]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
      {FILTERED.map((industry, i) => {
        const iconSrc = INDUSTRY_ICONS[industry.name];
        const isActive = !prefersReduced && activeCard === i;
        const t = prefersReduced ? "none" : TRANSITION;

        const iconEl = iconSrc ? (
          <div style={{ display: "inline-block", transform: isActive ? "translateY(-4px)" : "translateY(0)", transition: t }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={iconSrc} alt="" aria-hidden="true" style={{ height: 40, width: "auto", display: "block" }} />
          </div>
        ) : null;

        return (
          <div
            key={i}
            ref={el => { cardRefs.current[i] = el; }}
            className="bg-offwhite py-7 md:px-8"
            onMouseEnter={() => { if (!isTouch && !prefersReduced) setActiveCard(i); }}
            onMouseLeave={() => { if (!isTouch && !prefersReduced) setActiveCard(null); }}
          >
            {/* Mobile: icon + name inline, description below (< md) */}
            <div className="flex items-center gap-4 mb-2 md:hidden">
              <div className="flex-shrink-0">{iconEl}</div>
              <h3 className="text-base font-bold text-charcoal leading-snug">{industry.name}</h3>
            </div>
            <p className="text-sm text-charcoal/55 leading-relaxed md:hidden">{industry.note}</p>

            {/* Desktop: stacked layout (md+) */}
            <div className="hidden md:block">
              <div className="h-12 flex items-end mb-4">{iconEl}</div>
              <h3 className="text-base font-bold text-charcoal mb-2">{industry.name}</h3>
              <p className="text-sm text-charcoal/55 leading-relaxed">{industry.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
