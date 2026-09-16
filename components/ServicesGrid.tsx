"use client";
import { useState } from "react";
import Link from "next/link";
import { servicesGrid } from "@/content/site";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DUR = "220ms";

export function ServicesGrid() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
      {servicesGrid.map((item) => {
        const on = hovered === item.slug;
        return (
          <Link
            key={item.slug}
            href={item.href}
            className="block"
            onMouseEnter={() => setHovered(item.slug)}
            onMouseLeave={() => setHovered(null)}
            style={{
              transformOrigin: "left center",
              transform: on ? "scale(1.05)" : "scale(1)",
              transition: `transform ${DUR} ${EASE}`,
            }}
          >
            {/* Icon + name row */}
            <div className="flex items-center gap-3 mb-3">
              <div style={{ flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/icons/services/${item.icon}.svg`}
                  alt=""
                  aria-hidden="true"
                  style={{ height: 36, width: "auto", display: "block" }}
                />
              </div>
              <div style={{ minWidth: 0 }}>
                <h3
                  className="text-base font-black leading-snug"
                  style={{
                    color: on ? "#2E7D4F" : "#262d34",
                    transition: `color ${DUR} ${EASE}`,
                  }}
                >
                  <span className="block">{item.gridLines[0]}</span>
                  <span className="block">{item.gridLines[1]}</span>
                </h3>
              </div>
            </div>
            {/* Description */}
            <p className="text-sm text-charcoal/55 leading-relaxed">
              {item.gridDescription}
            </p>
          </Link>
        );
      })}
    </div>
  );
}
