"use client";

import { useEffect, useRef, useState } from "react";
import { siteManagement } from "@/content/site";

// ── Design tokens ─────────────────────────────────────────────────────────────
const W   = "white";
const G   = "#2E7D4F";
const BG  = "#1E2428"; // section background — used as fill so shapes occlude each other
const SL  = 1.2;       // stroke-width for mini shapes
const SB  = 1.5;       // stroke-width for large shapes
const BA  = 0.40;      // bar opacity
const TA  = 0.85;      // total-bar opacity

// viewBox: 640 × 110
const VW = 640;
const VH = 110;

// Arrow
const AX1 = 160;
const AX2 = 242;
const AY  = 55;

// ── Floating animation CSS ─────────────────────────────────────────────────────
// Each shape in the left cluster drifts independently (2–4 px vertical, < 0.3°).
// Classes wmrs-f1..f5 are assigned to outer <g> wrappers per shape so they never sync.
// prefers-reduced-motion: all animations suppressed.

const FLOAT_CSS = `
@keyframes wmrs-float-1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3px) rotate(.15deg)}}
@keyframes wmrs-float-2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2px) rotate(-.2deg)}}
@keyframes wmrs-float-3{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(.25deg)}}
@keyframes wmrs-float-4{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2.5px) rotate(-.15deg)}}
@keyframes wmrs-float-5{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3.5px) rotate(.2deg)}}
.wmrs-f1{animation:wmrs-float-1 7s   ease-in-out        infinite}
.wmrs-f2{animation:wmrs-float-2 9s   ease-in-out  -3s   infinite}
.wmrs-f3{animation:wmrs-float-3 8s   ease-in-out  -5s   infinite}
.wmrs-f4{animation:wmrs-float-4 10s  ease-in-out  -2s   infinite}
.wmrs-f5{animation:wmrs-float-5 7.5s ease-in-out  -7s   infinite}
@media(prefers-reduced-motion:reduce){
  .wmrs-f1,.wmrs-f2,.wmrs-f3,.wmrs-f4,.wmrs-f5{animation:none!important}
}
`;

// ── Mini shapes — drawn at local origin (0,0), positioned via SVG <g transform> ──
// Each outer rect has fill=BG so shapes in a stack properly occlude those behind them.

// Mini invoice: 36 × 50
function MI() {
  return (
    <>
      <rect x={0.5} y={0.5} width={35} height={49} stroke={W} strokeWidth={SL} fill={BG} />
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
      <rect x={0.5} y={0.5} width={27} height={37} stroke={W} strokeWidth={SL} fill={BG} />
      <line x1={0.5} y1={10} x2={27.5} y2={10} stroke={W} strokeWidth={0.75} opacity={0.4} />
      <line x1={8}  y1={0} x2={8}  y2={4} stroke={W} strokeWidth={1.5} />
      <line x1={20} y1={0} x2={20} y2={4} stroke={W} strokeWidth={1.5} />
      <line x1={10} y1={10} x2={10} y2={37} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={19} y1={10} x2={19} y2={37} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={0.5} y1={23} x2={27.5} y2={23} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

// Mini mobile phone: 18 × 30 — reads unmistakably as a phone at small sizes
function MP() {
  return (
    <>
      <rect x={0.5} y={0.5} width={17} height={29} stroke={W} strokeWidth={SL} fill={BG} />
      <line x1={5} y1={3}  x2={13} y2={3}  stroke={W} strokeWidth={0.9} /> {/* speaker */}
      <line x1={6} y1={27} x2={12} y2={27} stroke={W} strokeWidth={0.9} /> {/* home bar */}
    </>
  );
}

// ── Clusters — overlapping mini shapes, back-to-front, each wrapped in a float class ──
// Two-level <g> nesting: outer carries the float CSS class, inner carries the SVG
// attribute transform for position and tilt. Both compose without conflict.

function InvoiceCluster() {
  // MI center: (18, 25)
  return (
    <>
      <g className="wmrs-f3"><g transform="translate(72,8) rotate(-8,18,25)"><MI /></g></g>
      <g className="wmrs-f1"><g transform="translate(48,4) rotate(6,18,25)"><MI /></g></g>
      <g className="wmrs-f4"><g transform="translate(20,12) rotate(-4,18,25)"><MI /></g></g>
      <g className="wmrs-f2"><g transform="translate(38,20) rotate(0,18,25)"><MI /></g></g>
    </>
  );
}

function CalendarCluster() {
  // MC center: (14, 19)
  return (
    <>
      <g className="wmrs-f2"><g transform="translate(76,10) rotate(-7,14,19)"><MC /></g></g>
      <g className="wmrs-f4"><g transform="translate(52,6) rotate(5,14,19)"><MC /></g></g>
      <g className="wmrs-f1"><g transform="translate(24,14) rotate(-3,14,19)"><MC /></g></g>
      <g className="wmrs-f3"><g transform="translate(44,22) rotate(0,14,19)"><MC /></g></g>
    </>
  );
}

function PhoneCluster() {
  // MP center: (9, 15); 5 phones so the cluster reads as "many"
  return (
    <>
      <g className="wmrs-f5"><g transform="translate(82,8) rotate(-7,9,15)"><MP /></g></g>
      <g className="wmrs-f3"><g transform="translate(60,4) rotate(5,9,15)"><MP /></g></g>
      <g className="wmrs-f1"><g transform="translate(38,12) rotate(-4,9,15)"><MP /></g></g>
      <g className="wmrs-f4"><g transform="translate(62,20) rotate(3,9,15)"><MP /></g></g>
      <g className="wmrs-f2"><g transform="translate(18,8) rotate(-2,9,15)"><MP /></g></g>
    </>
  );
}

// ── Large single shapes — absolute coords, right of the arrow ─────────────────
// Wider than before to fill the full measure. Static: no float animation.

function LargeInvoice() {
  const X = 248, Y = 5;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={229} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 8} y={Y + 12} width={160} height={5} fill={W} opacity={BA} />
      <rect x={X + 8} y={Y + 21} width={200} height={5} fill={W} opacity={BA} />
      <rect x={X + 8} y={Y + 30} width={120} height={5} fill={W} opacity={BA} />
      <rect x={X + 8} y={Y + 39} width={185} height={5} fill={W} opacity={BA} />
      <rect x={X + 8} y={Y + 48} width={145} height={5} fill={W} opacity={BA} />
      <line x1={X + 8} y1={Y + 66} x2={X + 220} y2={Y + 66} stroke={W} strokeWidth={0.4} opacity={0.18} />
      <rect x={X + 8} y={Y + 71} width={175} height={10} fill={W} opacity={TA} />
    </>
  );
}

function LargeCalendar() {
  const X = 248, Y = 5;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={215} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <line x1={X + 0.5} y1={Y + 22} x2={X + 215.5} y2={Y + 22} stroke={W} strokeWidth={1} opacity={0.5} />
      <line x1={X + 25} y1={Y}       x2={X + 25}    y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 188} y1={Y}      x2={X + 188}   y2={Y + 9}  stroke={W} strokeWidth={2} />
      {/* 4 column dividers (5 columns) */}
      <line x1={X + 44} y1={Y + 22} x2={X + 44} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 87} y1={Y + 22} x2={X + 87} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 130} y1={Y + 22} x2={X + 130} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 173} y1={Y + 22} x2={X + 173} y2={Y + 104} stroke={W} strokeWidth={0.4} opacity={0.25} />
      {/* 2 row dividers (3 rows) */}
      <line x1={X + 0.5} y1={Y + 48} x2={X + 215.5} y2={Y + 48} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 74} x2={X + 215.5} y2={Y + 74} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

// Row 3: one consolidated contact — a wide card with name and contact lines
function LargeContactCard() {
  const X = 248, Y = 22;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={215} height={64} stroke={W} strokeWidth={SB} fill="none" />
      {/* Name line (bold/thick) */}
      <rect x={X + 10} y={Y + 14} width={100} height={7} fill={W} opacity={TA} />
      {/* Contact lines */}
      <rect x={X + 10} y={Y + 28} width={145} height={4} fill={W} opacity={BA} />
      <rect x={X + 10} y={Y + 37} width={120} height={4} fill={W} opacity={BA} />
      <rect x={X + 10} y={Y + 46} width={95}  height={4} fill={W} opacity={BA} />
    </>
  );
}

// ── Green arrow ────────────────────────────────────────────────────────────────

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
  invoice:  { Cluster: InvoiceCluster,  Single: LargeInvoice      },
  calendar: { Cluster: CalendarCluster, Single: LargeCalendar      },
  phone:    { Cluster: PhoneCluster,    Single: LargeContactCard   },
};

// ── Diagram row ───────────────────────────────────────────────────────────────

type Row = { shape: keyof typeof SHAPE_MAP; leftLabel: string; rightLabel: string };

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  lineHeight: 1.35,
};

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

  // Scroll-triggered convergence: whole cluster shifts slightly toward the arrow
  const clusterStyle: React.CSSProperties = {
    transform: animated && !prefersReduced ? "translateX(14px)" : "translateX(0)",
    transition: !prefersReduced ? "transform 600ms ease-out" : "none",
  };

  return (
    <div>
      <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" aria-hidden="true" style={{ overflow: "visible" }}>
        {/* Cluster: scroll-shift wrapper, per-shape float classes nested inside */}
        <g style={clusterStyle}>
          <Cluster />
        </g>
        <Arrow />
        <Single />
      </svg>

      {/* Labels span full container width; min-height ensures wrapping doesn't shift rows */}
      <div className="flex mt-3" style={{ alignItems: "flex-end", minHeight: "2.25rem" }}>
        <div style={{ width: "26%" }}>
          <span style={LABEL_STYLE}>{row.leftLabel}</span>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{ ...LABEL_STYLE, textAlign: "right" }}>{row.rightLabel}</span>
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
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: FLOAT_CSS }} />
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
