"use client";

import { useEffect, useRef, useState } from "react";
import { siteManagement } from "@/content/site";

// ── Design tokens ─────────────────────────────────────────────────────────────
const W   = "white";
const G   = "#2E7D4F";
const BG  = "#1E2428";
const SL  = 1.2;
const SB  = 1.5;
const BA  = 0.40;
const TA  = 0.85;

// Each cell: 300 × 120
const VW = 300;
const VH = 120;

// Arrow — horizontal, pointing right
const AX1 = 118;
const AX2 = 162;
const AY  = 60;

// ── Float animation ───────────────────────────────────────────────────────────
// @keyframes only — no class rules here.
// Animation is applied via inline `style` on each individual shape wrapper <g>
// so it is guaranteed to reach the element (not subject to CSS injection or
// class-selector resolution uncertainty).
//
// prefers-reduced-motion is gated in JS (prefersReduced prop) because a CSS
// media query cannot override an inline style declaration.
//
// transform-box:fill-box makes transform-origin:center relative to each
// shape's own bounding box, not the SVG viewport origin. Having the animated
// <g> directly wrap the shape content (with no SVG transform attribute of its
// own) avoids any conflict between CSS and SVG transforms on the same element.

const KEYFRAMES_CSS = `
@keyframes wmrs-float-1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3px) rotate(.15deg)}}
@keyframes wmrs-float-2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2px) rotate(-.2deg)}}
@keyframes wmrs-float-3{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(.25deg)}}
@keyframes wmrs-float-4{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2.5px) rotate(-.15deg)}}
@keyframes wmrs-float-5{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3.5px) rotate(.2deg)}}
`;

function floatStyle(
  name: string,
  duration: string,
  delay: string,
  prefersReduced: boolean,
): React.CSSProperties {
  if (prefersReduced) return {};
  return {
    animation: `${name} ${duration} ease-in-out ${delay} infinite`,
    transformBox: "fill-box",
    transformOrigin: "center",
  };
}

// ── Mini shapes — drawn at local origin (0,0) ─────────────────────────────────
// fill=BG on the outer rect so stacked shapes occlude each other.

// Mini invoice: 36×50
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

// Mini calendar: 28×38
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

// Mini mobile phone: 18×30
function MP() {
  return (
    <>
      <rect x={0.5} y={0.5} width={17} height={29} stroke={W} strokeWidth={SL} fill={BG} />
      <line x1={5} y1={3}  x2={13} y2={3}  stroke={W} strokeWidth={0.9} />
      <line x1={6} y1={27} x2={12} y2={27} stroke={W} strokeWidth={0.9} />
    </>
  );
}

// Mini report/chart: 36×50 (document + bar chart)
function MR() {
  return (
    <>
      <rect x={0.5} y={0.5} width={35} height={49} stroke={W} strokeWidth={SL} fill={BG} />
      <rect x={4} y={8}  width={20} height={3} fill={W} opacity={BA} />
      <rect x={4} y={14} width={14} height={3} fill={W} opacity={BA} />
      {/* bar chart — baseline at y=41 */}
      <rect x={4}  y={28} width={5} height={13} fill={W} opacity={BA} />
      <rect x={11} y={24} width={5} height={17} fill={W} opacity={TA} />
      <rect x={18} y={26} width={5} height={15} fill={W} opacity={BA} />
      <rect x={25} y={30} width={5} height={11} fill={W} opacity={BA} />
    </>
  );
}

// ── Clusters ──────────────────────────────────────────────────────────────────
// Two-level <g> per shape:
//   Outer <g transform="...">  — SVG attribute for position + tilt
//   Inner <g style={floatStyle(...)}>  — CSS animation, no SVG transform attr
//
// Keeping the animation on the inner <g> (which has no SVG transform of its
// own) means CSS transform and SVG transform never compete on the same element.
// transform-box:fill-box on the inner <g> calculates the bounding box from the
// shape content directly inside it, giving the correct rotation pivot.

type ClusterProps = { prefersReduced: boolean };

function InvoiceCluster({ prefersReduced }: ClusterProps) {
  const f = (n: string, d: string, de: string) => floatStyle(n, d, de, prefersReduced);
  return (
    <>
      <g transform="translate(72,8) rotate(-8,18,25)">
        <g style={f("wmrs-float-3", "8s",   "-5s")}><MI /></g>
      </g>
      <g transform="translate(48,4) rotate(6,18,25)">
        <g style={f("wmrs-float-1", "7s",   "0s")}><MI /></g>
      </g>
      <g transform="translate(20,12) rotate(-4,18,25)">
        <g style={f("wmrs-float-4", "10s",  "-2s")}><MI /></g>
      </g>
      <g transform="translate(38,20) rotate(0,18,25)">
        <g style={f("wmrs-float-2", "9s",   "-3s")}><MI /></g>
      </g>
    </>
  );
}

function CalendarCluster({ prefersReduced }: ClusterProps) {
  const f = (n: string, d: string, de: string) => floatStyle(n, d, de, prefersReduced);
  return (
    <>
      <g transform="translate(76,10) rotate(-7,14,19)">
        <g style={f("wmrs-float-2", "9s",   "-3s")}><MC /></g>
      </g>
      <g transform="translate(52,6) rotate(5,14,19)">
        <g style={f("wmrs-float-4", "10s",  "-2s")}><MC /></g>
      </g>
      <g transform="translate(24,14) rotate(-3,14,19)">
        <g style={f("wmrs-float-1", "7s",   "0s")}><MC /></g>
      </g>
      <g transform="translate(44,22) rotate(0,14,19)">
        <g style={f("wmrs-float-3", "8s",   "-5s")}><MC /></g>
      </g>
    </>
  );
}

function PhoneCluster({ prefersReduced }: ClusterProps) {
  const f = (n: string, d: string, de: string) => floatStyle(n, d, de, prefersReduced);
  return (
    <>
      <g transform="translate(82,8) rotate(-7,9,15)">
        <g style={f("wmrs-float-5", "7.5s", "-7s")}><MP /></g>
      </g>
      <g transform="translate(60,4) rotate(5,9,15)">
        <g style={f("wmrs-float-3", "8s",   "-5s")}><MP /></g>
      </g>
      <g transform="translate(38,12) rotate(-4,9,15)">
        <g style={f("wmrs-float-1", "7s",   "0s")}><MP /></g>
      </g>
      <g transform="translate(62,20) rotate(3,9,15)">
        <g style={f("wmrs-float-4", "10s",  "-2s")}><MP /></g>
      </g>
      <g transform="translate(18,8) rotate(-2,9,15)">
        <g style={f("wmrs-float-2", "9s",   "-3s")}><MP /></g>
      </g>
    </>
  );
}

function ReportCluster({ prefersReduced }: ClusterProps) {
  const f = (n: string, d: string, de: string) => floatStyle(n, d, de, prefersReduced);
  return (
    <>
      <g transform="translate(72,8) rotate(-8,18,25)">
        <g style={f("wmrs-float-3", "8s",   "-5s")}><MR /></g>
      </g>
      <g transform="translate(48,4) rotate(6,18,25)">
        <g style={f("wmrs-float-1", "7s",   "0s")}><MR /></g>
      </g>
      <g transform="translate(20,12) rotate(-4,18,25)">
        <g style={f("wmrs-float-4", "10s",  "-2s")}><MR /></g>
      </g>
      <g transform="translate(38,20) rotate(0,18,25)">
        <g style={f("wmrs-float-2", "9s",   "-3s")}><MR /></g>
      </g>
    </>
  );
}

// ── Consolidated shapes — right of arrow, static (no float) ───────────────────
// Portrait invoice: 80×100
function RightInvoice() {
  const X = 168, Y = 10;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={79} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 6}  y={Y + 12} width={55} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 20} width={67} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 28} width={42} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 36} width={60} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 44} width={50} height={4} fill={W} opacity={BA} />
      <line x1={X + 6} y1={Y + 60} x2={X + 73} y2={Y + 60} stroke={W} strokeWidth={0.4} opacity={0.18} />
      <rect x={X + 6}  y={Y + 65} width={60} height={9}  fill={W} opacity={TA} />
    </>
  );
}

// Square calendar: 96×96
function RightCalendar() {
  const X = 168, Y = 12;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={95} height={95} stroke={W} strokeWidth={SB} fill="none" />
      <line x1={X + 0.5} y1={Y + 22} x2={X + 95.5} y2={Y + 22} stroke={W} strokeWidth={1} opacity={0.5} />
      <line x1={X + 24} y1={Y}       x2={X + 24}    y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 71} y1={Y}       x2={X + 71}    y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 24} y1={Y + 22} x2={X + 24} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 48} y1={Y + 22} x2={X + 48} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 71} y1={Y + 22} x2={X + 71} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 47} x2={X + 95.5} y2={Y + 47} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 71} x2={X + 95.5} y2={Y + 71} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

// Single large phone — matches the MP() mini shape vocabulary, ~3× size (54×90)
// X=184 centres the shape at 184+27=211 = 70% of VW, matching the label column.
function RightPhone() {
  const X = 184, Y = 15;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={53} height={89} stroke={W} strokeWidth={SB} fill="none" />
      <line x1={X + 16} y1={Y + 10} x2={X + 38} y2={Y + 10} stroke={W} strokeWidth={1.5} />
      <line x1={X + 18} y1={Y + 81} x2={X + 36} y2={Y + 81} stroke={W} strokeWidth={1.5} />
    </>
  );
}

// Portrait report with bar chart: 80×100
function RightReport() {
  const X = 168, Y = 10;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={79} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 6}  y={Y + 12} width={55} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 20} width={38} height={4} fill={W} opacity={BA} />
      {/* 4 bars, baseline at Y+90 */}
      <rect x={X + 6}  y={Y + 52} width={14} height={38} fill={W} opacity={BA} />
      <rect x={X + 24} y={Y + 42} width={14} height={48} fill={W} opacity={TA} />
      <rect x={X + 42} y={Y + 48} width={14} height={42} fill={W} opacity={BA} />
      <rect x={X + 60} y={Y + 58} width={12} height={32} fill={W} opacity={BA} />
    </>
  );
}

// ── Arrow ──────────────────────────────────────────────────────────────────────
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

// ── Shape map ──────────────────────────────────────────────────────────────────
const SHAPE_MAP = {
  invoice:  { Cluster: InvoiceCluster,  Single: RightInvoice  },
  calendar: { Cluster: CalendarCluster, Single: RightCalendar  },
  phone:    { Cluster: PhoneCluster,    Single: RightPhone     },
  report:   { Cluster: ReportCluster,   Single: RightReport    },
};

type Row = { shape: keyof typeof SHAPE_MAP; leftLabel: string; rightLabel: string };

// ── Label layout ───────────────────────────────────────────────────────────────
// Column percentages derived from the SVG coordinate system (VW=300):
//   Left cluster visual center  ≈ x=66  → 22% of VW
//   Right shape visual center   ≈ x=211 → 70% of VW (both phone and invoice pairs)
//
// Grid columns: [44% left-label | 9% arrow-spacer | 34% right-label | 13% trailing]
//   Left label  centres at 0+22=22%  ✓
//   Right label centres at 44+9+17=70% ✓
//
// alignItems:start means the top edge of both labels is flush — a two-line
// label on one side doesn't push the row's height and misalign the other.

const LABEL_STYLE: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  lineHeight: 1.35,
  textAlign: "center",
};

// ── Diagram cell ───────────────────────────────────────────────────────────────

function DiagramCell({
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
          <Cluster prefersReduced={prefersReduced} />
        </g>
        <Arrow />
        <Single />
      </svg>

      {/* Labels centred under their respective shapes */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44% 9% 34% 13%",
          marginTop: 10,
          alignItems: "start",
        }}
      >
        <span style={LABEL_STYLE}>{row.leftLabel}</span>
        <span /> {/* arrow-region spacer */}
        <span style={LABEL_STYLE}>{row.rightLabel}</span>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────

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
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES_CSS }} />
      {/* gap-x-20 (80px) between the two column pairs; gap-y-14 between rows */}
      <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-14">
        {siteManagement.consolidationRows.map((row, i) => (
          <DiagramCell
            key={i}
            row={row}
            animated={animated}
            prefersReduced={prefersReduced}
          />
        ))}
      </div>
    </>
  );
}
