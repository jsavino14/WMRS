"use client";

import { useEffect, useRef, useState } from "react";
import { siteManagement } from "@/content/site";

// ── Design tokens ─────────────────────────────────────────────────────────────
const W  = "white";
const G  = "#2E7D4F";
const SL = 1.2;   // stroke-width for mini (small) shapes
const SB = 1.5;   // stroke-width for large (big) shapes
const BA = 0.40;  // bar fill opacity
const TA = 0.85;  // total-bar fill opacity

// viewBox: 640 × 110. Content spans x ≈ 0..400, right 240 is breathing room.
const VW = 640;
const VH = 110;

// Arrow coords
const AX1 = 162;
const AX2 = 232;
const AY  = 55;

// ── Mini shapes — local coords, positioned via SVG <g transform> ──────────────

// Mini invoice: 36 × 50
function MI() {
  return (
    <>
      <rect x={0.5} y={0.5} width={35} height={49} stroke={W} strokeWidth={SL} fill="none" />
      <rect x={4} y={8}  width={22} height={3} fill={W} opacity={BA} />
      <rect x={4} y={14} width={27} height={3} fill={W} opacity={BA} />
      <rect x={4} y={20} width={15} height={3} fill={W} opacity={BA} />
      <line x1={4} y1={33} x2={31} y2={33} stroke={W} strokeWidth={0.4} opacity={0.18} />
      <rect x={4} y={37} width={20} height={7} fill={W} opacity={TA} />
    </>
  );
}

// Mini calendar: 28 × 38
function MC() {
  return (
    <>
      <rect x={0.5} y={0.5} width={27} height={37} stroke={W} strokeWidth={SL} fill="none" />
      <line x1={0.5} y1={10} x2={27.5} y2={10} stroke={W} strokeWidth={0.75} opacity={0.4} />
      <line x1={8}  y1={0} x2={8}  y2={4} stroke={W} strokeWidth={1.5} />
      <line x1={20} y1={0} x2={20} y2={4} stroke={W} strokeWidth={1.5} />
      <line x1={10} y1={10} x2={10} y2={37} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={19} y1={10} x2={19} y2={37} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={0.5} y1={23} x2={27.5} y2={23} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

// Mini phone handset: 22 × 36
function MP() {
  return (
    <>
      <rect x={5.5} y={1.5}  width={11} height={8}  stroke={W} strokeWidth={SL} fill="none" />
      <rect x={5.5} y={26.5} width={11} height={8}  stroke={W} strokeWidth={SL} fill="none" />
      <line x1={5.5}  y1={5.5}  x2={1.5}  y2={5.5}  stroke={W} strokeWidth={SL} />
      <line x1={1.5}  y1={5.5}  x2={1.5}  y2={30.5} stroke={W} strokeWidth={SL} />
      <line x1={1.5}  y1={30.5} x2={5.5}  y2={30.5} stroke={W} strokeWidth={SL} />
      <line x1={16.5} y1={5.5}  x2={20.5} y2={5.5}  stroke={W} strokeWidth={SL} />
      <line x1={20.5} y1={5.5}  x2={20.5} y2={30.5} stroke={W} strokeWidth={SL} />
      <line x1={20.5} y1={30.5} x2={16.5} y2={30.5} stroke={W} strokeWidth={SL} />
    </>
  );
}

// ── Clusters — 4 overlapping mini shapes at slight angles ────────────────────
// SVG renders back-to-front, so deepest shape listed first.

function InvoiceCluster() {
  // MI center: (18, 25); 4 overlapping invoices
  return (
    <>
      <g transform="translate(72,8) rotate(-8,18,25)"><MI /></g>
      <g transform="translate(48,4) rotate(6,18,25)"><MI /></g>
      <g transform="translate(20,12) rotate(-4,18,25)"><MI /></g>
      <g transform="translate(38,20) rotate(0,18,25)"><MI /></g>
    </>
  );
}

function CalendarCluster() {
  // MC center: (14, 19); 4 overlapping calendars
  return (
    <>
      <g transform="translate(76,10) rotate(-7,14,19)"><MC /></g>
      <g transform="translate(52,6) rotate(5,14,19)"><MC /></g>
      <g transform="translate(24,14) rotate(-3,14,19)"><MC /></g>
      <g transform="translate(44,22) rotate(0,14,19)"><MC /></g>
    </>
  );
}

function PhoneCluster() {
  // MP center: (11, 18); 5 phones (narrower shape needs more for "many")
  return (
    <>
      <g transform="translate(88,10) rotate(-8,11,18)"><MP /></g>
      <g transform="translate(64,5)  rotate(6,11,18)"><MP /></g>
      <g transform="translate(40,14) rotate(-5,11,18)"><MP /></g>
      <g transform="translate(68,22) rotate(3,11,18)"><MP /></g>
      <g transform="translate(18,10) rotate(-2,11,18)"><MP /></g>
    </>
  );
}

// ── Large single shapes — absolute coords in the viewBox ─────────────────────

function LargeInvoice() {
  const X = 250, Y = 5;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={87} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 6}  y={Y + 12} width={62} height={5} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 21} width={72} height={5} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 30} width={48} height={5} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 39} width={68} height={5} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 48} width={55} height={5} fill={W} opacity={BA} />
      <line x1={X + 6} y1={Y + 66} x2={X + 81} y2={Y + 66} stroke={W} strokeWidth={0.4} opacity={0.18} />
      <rect x={X + 6}  y={Y + 71} width={62} height={10} fill={W} opacity={TA} />
    </>
  );
}

function LargeCalendar() {
  const X = 250, Y = 5;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={83} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <line x1={X + 0.5} y1={Y + 22} x2={X + 83.5} y2={Y + 22} stroke={W} strokeWidth={1} opacity={0.5} />
      <line x1={X + 20} y1={Y}       x2={X + 20}   y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 62} y1={Y}       x2={X + 62}   y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 29} y1={Y + 22} x2={X + 29} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 56} y1={Y + 22} x2={X + 56} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 48} x2={X + 83.5} y2={Y + 48} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 74} x2={X + 83.5} y2={Y + 74} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

function LargePhone() {
  // Centered at (283, 55), outer span x=250..316, y=12..98
  const X = 250, Y = 12;
  return (
    <>
      <rect x={X + 14} y={Y + 0}  width={26} height={16} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 14} y={Y + 70} width={26} height={16} stroke={W} strokeWidth={SB} fill="none" />
      {/* Left rail */}
      <line x1={X + 14} y1={Y + 8}  x2={X + 4}  y2={Y + 8}  stroke={W} strokeWidth={SB} />
      <line x1={X + 4}  y1={Y + 8}  x2={X + 4}  y2={Y + 78} stroke={W} strokeWidth={SB} />
      <line x1={X + 4}  y1={Y + 78} x2={X + 14} y2={Y + 78} stroke={W} strokeWidth={SB} />
      {/* Right rail */}
      <line x1={X + 40} y1={Y + 8}  x2={X + 50} y2={Y + 8}  stroke={W} strokeWidth={SB} />
      <line x1={X + 50} y1={Y + 8}  x2={X + 50} y2={Y + 78} stroke={W} strokeWidth={SB} />
      <line x1={X + 50} y1={Y + 78} x2={X + 40} y2={Y + 78} stroke={W} strokeWidth={SB} />
    </>
  );
}

// ── Arrow ─────────────────────────────────────────────────────────────────────

function Arrow() {
  return (
    <>
      <line x1={AX1} y1={AY} x2={AX2 - 2} y2={AY} stroke={G} strokeWidth={1.5} />
      <polyline
        points={`${AX2 - 7},${AY - 5} ${AX2},${AY} ${AX2 - 7},${AY + 5}`}
        fill="none"
        stroke={G}
        strokeWidth={1.5}
      />
    </>
  );
}

// ── Row shape map ─────────────────────────────────────────────────────────────

const SHAPE_MAP = {
  invoice:  { Cluster: InvoiceCluster,  Single: LargeInvoice  },
  calendar: { Cluster: CalendarCluster, Single: LargeCalendar },
  phone:    { Cluster: PhoneCluster,    Single: LargePhone     },
};

// ── Diagram row ───────────────────────────────────────────────────────────────

type Row = { shape: keyof typeof SHAPE_MAP; leftLabel: string; rightLabel: string };

function DiagramRow({
  row,
  animated,
  prefersReduced,
}: {
  row: Row;
  animated: boolean;
  prefersReduced: boolean;
}) {
  const { Cluster, Single } = SHAPE_MAP[row.shape];

  const clusterStyle: React.CSSProperties = {
    transform: animated && !prefersReduced ? "translateX(14px)" : "translateX(0)",
    transition: !prefersReduced ? "transform 600ms ease-out" : "none",
  };

  return (
    <div>
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" aria-hidden="true" style={{ overflow: "visible" }}>
        <g style={clusterStyle}>
          <Cluster />
        </g>
        <Arrow />
        <Single />
      </svg>

      {/* Labels — fixed min-height with items-end so wrapping labels baseline-align */}
      <div
        className="flex mt-3"
        style={{ minHeight: "2.25rem", alignItems: "flex-end" }}
      >
        {/* Left label: under cluster (0..155 of 640 = 24%) */}
        <div style={{ width: "26%" }}>
          <span
            style={{
              display: "block",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.35,
            }}
          >
            {row.leftLabel}
          </span>
        </div>
        {/* Spacer: under arrow area */}
        <div style={{ flex: 1 }} />
        {/* Right label: under right shape (250..340 of 640 = 39..53%) */}
        <div style={{ width: "20%" }}>
          <span
            style={{
              display: "block",
              fontSize: "10px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              lineHeight: 1.35,
            }}
          >
            {row.rightLabel}
          </span>
        </div>
        {/* Dead space: right 37% matches SVG dead space (400..640 of 640) */}
        <div style={{ width: "37%" }} />
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

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
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="space-y-10">
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
