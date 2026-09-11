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

// Arrow
const AX1 = 118;
const AX2 = 162;
const AY  = 60;

// Float animation helper — returns inline animation style.
// Uses keyframes wmrs-float-1..5 from globals.css.
// Gated in JS because inline styles can't be overridden by CSS media queries.
function a(
  name: string,
  duration: string,
  delay: string,
  prefersReduced: boolean,
): React.CSSProperties {
  if (prefersReduced) return {};
  return { animation: `${name} ${duration} ease-in-out ${delay} infinite alternate` };
}

// Float animation: keyframes wmrs-float-1..5 are defined in globals.css.
// Animation is applied via inline style (bypasses Tailwind CSS purging).
// Each shape uses two nested <g> elements:
//   Outer <g transform="…">  — SVG attribute: positions and tilts the shape
//   Inner <g style={a(…)}>   — inline style: animation property
// prefers-reduced-motion is gated in JS (inline styles can't be overridden by CSS media queries).

// ── Mini shapes — drawn at local origin (0,0) ─────────────────────────────────

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

function MP() {
  return (
    <>
      <rect x={0.5} y={0.5} width={17} height={29} stroke={W} strokeWidth={SL} fill={BG} />
      <line x1={5} y1={3}  x2={13} y2={3}  stroke={W} strokeWidth={0.9} />
      <line x1={6} y1={27} x2={12} y2={27} stroke={W} strokeWidth={0.9} />
    </>
  );
}

function MR() {
  return (
    <>
      <rect x={0.5} y={0.5} width={35} height={49} stroke={W} strokeWidth={SL} fill={BG} />
      <rect x={4} y={8}  width={20} height={3} fill={W} opacity={BA} />
      <rect x={4} y={14} width={14} height={3} fill={W} opacity={BA} />
      <rect x={4}  y={28} width={5} height={13} fill={W} opacity={BA} />
      <rect x={11} y={24} width={5} height={17} fill={W} opacity={TA} />
      <rect x={18} y={26} width={5} height={15} fill={W} opacity={BA} />
      <rect x={25} y={30} width={5} height={11} fill={W} opacity={BA} />
    </>
  );
}

// ── Clusters ──────────────────────────────────────────────────────────────────

// Y translations are shifted so each cluster's visual centre aligns with AY=60
// (same axis as the arrow and right-side consolidated shape).
// MI/MR are 36×50 → half-height 25 → base Y = 60-25 = 35, stack offset -4..+9
// MC is 28×38 → half-height 19 → base Y = 60-19 = 41, stack offset -4..+9
// MP is 18×30 → half-height 15 → base Y = 60-15 = 45, stack offset -4..+9

function InvoiceCluster({ pr }: { pr: boolean }) {
  return (
    <>
      <g transform="translate(72,31) rotate(-8,18,25)"><g style={a("wmrs-float-3","8s","-5s",pr)}><MI /></g></g>
      <g transform="translate(48,27) rotate(6,18,25)"><g style={a("wmrs-float-1","7s","0s",pr)}><MI /></g></g>
      <g transform="translate(20,35) rotate(-4,18,25)"><g style={a("wmrs-float-4","10s","-2s",pr)}><MI /></g></g>
      <g transform="translate(38,43) rotate(0,18,25)"><g style={a("wmrs-float-2","9s","-3s",pr)}><MI /></g></g>
    </>
  );
}

function CalendarCluster({ pr }: { pr: boolean }) {
  return (
    <>
      <g transform="translate(76,37) rotate(-7,14,19)"><g style={a("wmrs-float-2","9s","-4s",pr)}><MC /></g></g>
      <g transform="translate(52,33) rotate(5,14,19)"><g style={a("wmrs-float-4","7s","-1s",pr)}><MC /></g></g>
      <g transform="translate(24,41) rotate(-3,14,19)"><g style={a("wmrs-float-1","8s","-6s",pr)}><MC /></g></g>
      <g transform="translate(44,49) rotate(0,14,19)"><g style={a("wmrs-float-3","10s","-2s",pr)}><MC /></g></g>
    </>
  );
}

function PhoneCluster({ pr }: { pr: boolean }) {
  return (
    <>
      <g transform="translate(82,41) rotate(-7,9,15)"><g style={a("wmrs-float-5","7s","-3s",pr)}><MP /></g></g>
      <g transform="translate(60,37) rotate(5,9,15)"><g style={a("wmrs-float-3","9s","0s",pr)}><MP /></g></g>
      <g transform="translate(38,45) rotate(-4,9,15)"><g style={a("wmrs-float-1","8s","-5s",pr)}><MP /></g></g>
      <g transform="translate(62,53) rotate(3,9,15)"><g style={a("wmrs-float-4","10s","-1s",pr)}><MP /></g></g>
      <g transform="translate(18,41) rotate(-2,9,15)"><g style={a("wmrs-float-2","6s","-4s",pr)}><MP /></g></g>
    </>
  );
}

function ReportCluster({ pr }: { pr: boolean }) {
  return (
    <>
      <g transform="translate(72,31) rotate(-8,18,25)"><g style={a("wmrs-float-3","8s","-5s",pr)}><MR /></g></g>
      <g transform="translate(48,27) rotate(6,18,25)"><g style={a("wmrs-float-1","7s","0s",pr)}><MR /></g></g>
      <g transform="translate(20,35) rotate(-4,18,25)"><g style={a("wmrs-float-4","10s","-2s",pr)}><MR /></g></g>
      <g transform="translate(38,43) rotate(0,18,25)"><g style={a("wmrs-float-2","9s","-3s",pr)}><MR /></g></g>
    </>
  );
}

// ── Consolidated shapes — right of arrow, static ──────────────────────────────

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

function RightReport() {
  const X = 168, Y = 10;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={79} height={99} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 6}  y={Y + 12} width={55} height={4} fill={W} opacity={BA} />
      <rect x={X + 6}  y={Y + 20} width={38} height={4} fill={W} opacity={BA} />
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
  calendar: { Cluster: CalendarCluster, Single: RightCalendar },
  phone:    { Cluster: PhoneCluster,    Single: RightPhone    },
  report:   { Cluster: ReportCluster,   Single: RightReport   },
};

type Row = { shape: keyof typeof SHAPE_MAP; leftLabel: string; rightLabel: string };

// ── Label layout ───────────────────────────────────────────────────────────────
// Grid columns derived from SVG coordinates (VW=300):
//   Cluster centre ≈ x=66 → 22% of VW  →  left column centres at 0+22=22% ✓
//   Right-shape centre ≈ x=211 → 70% of VW  →  right column centres at 44+9+17=70% ✓
// alignItems:start keeps both labels top-aligned so two-line labels don't
// shift the row height.

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
          <Cluster pr={prefersReduced} />
        </g>
        <Arrow />
        <Single />
      </svg>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "44% 9% 34% 13%",
          marginTop: 10,
          alignItems: "start",
        }}
      >
        <span style={LABEL_STYLE}>{row.leftLabel}</span>
        <span />
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
  );
}
