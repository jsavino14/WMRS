"use client";

import { useState } from "react";
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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-charcoal/10">
      {FILTERED.map((industry, i) => {
        const iconSrc = INDUSTRY_ICONS[industry.name];
        const isHovered = hoveredCard === i;
        return (
          <div
            key={i}
            className="bg-offwhite py-7 md:px-8"
            onMouseEnter={() => setHoveredCard(i)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            {iconSrc && (
              <div className="h-12 flex items-end mb-4">
                <div style={{ display: "inline-block", transform: isHovered ? "translateY(-4px)" : "translateY(0)", transition: TRANSITION }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    style={{ height: 40, width: "auto", display: "block" }}
                  />
                </div>
              </div>
            )}
            <h3 className="text-base font-bold text-charcoal mb-2">
              {industry.name}
            </h3>
            <p className="text-sm text-charcoal/55 leading-relaxed">
              {industry.note}
            </p>
          </div>
        );
      })}
    </div>
  );
}
