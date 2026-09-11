"use client";

import { useEffect, useRef, useState } from "react";
import { siteManagement } from "@/content/site";

// 10 small rects in a loose staggered cluster — reads as "many" without a count
const CLUSTER: { x: number; y: number }[] = [
  { x: 2,  y: 2  }, { x: 18, y: 0  }, { x: 34, y: 4  },
  { x: 6,  y: 14 }, { x: 24, y: 11 }, { x: 42, y: 15 },
  { x: 2,  y: 26 }, { x: 18, y: 23 }, { x: 36, y: 28 },
  { x: 10, y: 38 },
];
const RW = 10;
const RH = 7;

export function ConsolidationDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    setPrefersReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-10 max-w-xl">
      {siteManagement.consolidationRows.map((row, i) => (
        <DiagramRow
          key={i}
          row={row}
          animated={animated}
          prefersReduced={prefersReduced}
        />
      ))}
    </div>
  );
}

function DiagramRow({
  row,
  animated,
  prefersReduced,
}: {
  row: { leftLabel: string; rightLabel: string };
  animated: boolean;
  prefersReduced: boolean;
}) {
  const clusterStyle: React.CSSProperties = {
    transform: animated && !prefersReduced ? "translateX(14px)" : "translateX(0)",
    transition: !prefersReduced ? "transform 600ms ease-out" : "none",
  };

  return (
    <div>
      {/* SVG: viewBox 360×52. Cluster occupies x≈0–54, arrow x≈76–247, right rect x=258–338 */}
      <svg
        viewBox="0 0 360 52"
        width="100%"
        style={{ overflow: "visible" }}
        aria-hidden="true"
      >
        {/* Left cluster — translates on scroll */}
        <g style={clusterStyle}>
          {CLUSTER.map((r, i) => (
            <rect
              key={i}
              x={r.x}
              y={r.y + 3}
              width={RW}
              height={RH}
              fill="white"
              opacity={0.6}
            />
          ))}
        </g>

        {/* Arrow (green accent) */}
        <line x1="76" y1="26" x2="246" y2="26" stroke="#2E7D4F" strokeWidth="1.5" />
        <polyline
          points="240,21 247,26 240,31"
          fill="none"
          stroke="#2E7D4F"
          strokeWidth="1.5"
        />

        {/* Single right rect — solid white, larger than each cluster rect */}
        <rect x="258" y="7" width="80" height="38" fill="white" opacity={0.9} />
      </svg>

      {/* Labels beneath */}
      <div className="flex text-[10px] uppercase tracking-[0.12em] text-white/35 mt-3">
        <span style={{ width: "22%" }}>{row.leftLabel}</span>
        <span className="flex-1" />
        <span style={{ width: "28%", textAlign: "right" }}>{row.rightLabel}</span>
      </div>
    </div>
  );
}
