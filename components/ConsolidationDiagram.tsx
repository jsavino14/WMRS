"use client";

import { useEffect, useRef, useState } from "react";
import { siteManagement } from "@/content/site";

// ── Design tokens ─────────────────────────────────────────────────────────────
const W   = "white";
const G   = "#2E7D4F";
const BG  = "#1E2428";
const SL  = 1.2;       // stroke-width for mini shapes
const SB  = 1.5;       // stroke-width for consolidated shapes
const BA  = 0.40;      // bar opacity
const TA  = 0.85;      // total-bar / highlight opacity

// Each cell: 300 × 120
const VW = 300;
const VH = 120;

// Arrow — horizontal, pointing right
const AX1 = 118;
const AX2 = 162;
const AY  = 60;

// ── Float animation CSS ────────────────────────────────────────────────────────
// transform-box:fill-box + transform-origin:center anchor rotation to each
// shape's own bounding box, not the SVG viewport origin.
// All animation is pure CSS — zero JS per-frame work.

const FLOAT_CSS = `
@keyframes wmrs-float-1{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3px) rotate(.15deg)}}
@keyframes wmrs-float-2{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2px) rotate(-.2deg)}}
@keyframes wmrs-float-3{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-4px) rotate(.25deg)}}
@keyframes wmrs-float-4{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-2.5px) rotate(-.15deg)}}
@keyframes wmrs-float-5{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-3.5px) rotate(.2deg)}}
.wmrs-f1{animation:wmrs-float-1 7s   ease-in-out        infinite;transform-box:fill-box;transform-origin:center}
.wmrs-f2{animation:wmrs-float-2 9s   ease-in-out  -3s   infinite;transform-box:fill-box;transform-origin:center}
.wmrs-f3{animation:wmrs-float-3 8s   ease-in-out  -5s   infinite;transform-box:fill-box;transform-origin:center}
.wmrs-f4{animation:wmrs-float-4 10s  ease-in-out  -2s   infinite;transform-box:fill-box;transform-origin:center}
.wmrs-f5{animation:wmrs-float-5 7.5s ease-in-out  -7s   infinite;transform-box:fill-box;transform-origin:center}
@media(prefers-reduced-motion:reduce){
  .wmrs-f1,.wmrs-f2,.wmrs-f3,.wmrs-f4,.wmrs-f5{animation:none!important}
}
`;

// ── Mini shapes — drawn at local origin (0,0), positioned via SVG transform ──
// fill=BG on the outer rect so stacked shapes properly occlude each other.

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
      {/* bar chart — consistent baseline at y=41 */}
      <rect x={4}  y={28} width={5} height={13} fill={W} opacity={BA} />
      <rect x={11} y={24} width={5} height={17} fill={W} opacity={TA} />
      <rect x={18} y={26} width={5} height={15} fill={W} opacity={BA} />
      <rect x={25} y={30} width={5} height={11} fill={W} opacity={BA} />
    </>
  );
}

// ── Clusters — overlapping mini shapes, back-to-front ─────────────────────────
// Two-level <g>: outer carries the float CSS class, inner carries the SVG
// attribute transform for position + tilt. They compose without conflict.

function InvoiceCluster() {
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

function ReportCluster() {
  return (
    <>
      <g className="wmrs-f3"><g transform="translate(72,8) rotate(-8,18,25)"><MR /></g></g>
      <g className="wmrs-f1"><g transform="translate(48,4) rotate(6,18,25)"><MR /></g></g>
      <g className="wmrs-f4"><g transform="translate(20,12) rotate(-4,18,25)"><MR /></g></g>
      <g className="wmrs-f2"><g transform="translate(38,20) rotate(0,18,25)"><MR /></g></g>
    </>
  );
}

// ── Consolidated shapes — right of arrow, static (no float) ───────────────────
// Sized to be modestly larger than the scattered group, not disproportionate.
// Invoice/Report: portrait (80×100). Calendar: square (96×96). Card: wide (96×66).

// Portrait invoice: 80×100 centered in VH=120
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
      <rect x={X + 6}  y={Y + 65} width={60} height={9} fill={W} opacity={TA} />
    </>
  );
}

// Square calendar: 96×96 (Y=12 to leave 12px margin top and bottom)
function RightCalendar() {
  const X = 168, Y = 12;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={95} height={95} stroke={W} strokeWidth={SB} fill="none" />
      <line x1={X + 0.5} y1={Y + 22} x2={X + 95.5} y2={Y + 22} stroke={W} strokeWidth={1} opacity={0.5} />
      <line x1={X + 24} y1={Y}       x2={X + 24}    y2={Y + 9}  stroke={W} strokeWidth={2} />
      <line x1={X + 71} y1={Y}       x2={X + 71}    y2={Y + 9}  stroke={W} strokeWidth={2} />
      {/* 3 column dividers */}
      <line x1={X + 24} y1={Y + 22} x2={X + 24} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 48} y1={Y + 22} x2={X + 48} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 71} y1={Y + 22} x2={X + 71} y2={Y + 95} stroke={W} strokeWidth={0.4} opacity={0.25} />
      {/* 2 row dividers */}
      <line x1={X + 0.5} y1={Y + 47} x2={X + 95.5} y2={Y + 47} stroke={W} strokeWidth={0.4} opacity={0.25} />
      <line x1={X + 0.5} y1={Y + 71} x2={X + 95.5} y2={Y + 71} stroke={W} strokeWidth={0.4} opacity={0.25} />
    </>
  );
}

// Wide contact card: 96×66 (vertically centered near AY=60)
function RightContactCard() {
  const X = 168, Y = 27;
  return (
    <>
      <rect x={X + 0.5} y={Y + 0.5} width={95} height={65} stroke={W} strokeWidth={SB} fill="none" />
      <rect x={X + 8}  y={Y + 13} width={68} height={6}  fill={W} opacity={TA} />
      <rect x={X + 8}  y={Y + 25} width={82} height={4}  fill={W} opacity={BA} />
      <rect x={X + 8}  y={Y + 34} width={68} height={4}  fill={W} opacity={BA} />
      <rect x={X + 8}  y={Y + 43} width={52} height={4}  fill={W} opacity={BA} />
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
      {/* 4 bars with consistent baseline at Y+90 */}
      <rect x={X + 6}  y={Y + 52} width={14} height={38} fill={W} opacity={BA} />
      <rect x={X + 24} y={Y + 42} width={14} height={48} fill={W} opacity={TA} />
      <rect x={X + 42} y={Y + 48} width={14} height={42} fill={W} opacity={BA} />
      <rect x={X + 60} y={Y + 58} width={12} height={32} fill={W} opacity={BA} />
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

// ── Shape map ──────────────────────────────────────────────────────────────────

const SHAPE_MAP = {
  invoice:  { Cluster: InvoiceCluster,  Single: RightInvoice      },
  calendar: { Cluster: CalendarCluster, Single: RightCalendar      },
  phone:    { Cluster: PhoneCluster,    Single: RightContactCard   },
  report:   { Cluster: ReportCluster,   Single: RightReport        },
};

// ── Diagram cell ───────────────────────────────────────────────────────────────

type Row = { shape: keyof typeof SHAPE_MAP; leftLabel: string; rightLabel: string };

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "10px",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.35)",
  lineHeight: 1.35,
};

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

  // On scroll: cluster drifts slightly toward the arrow then holds
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

      {/* Labels sit directly beneath their own shape group */}
      <div className="flex mt-3" style={{ alignItems: "flex-end", minHeight: "2.25rem" }}>
        <div style={{ width: "40%" }}>
          <span style={LABEL_STYLE}>{row.leftLabel}</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ width: "40%", textAlign: "right" }}>
          <span style={LABEL_STYLE}>{row.rightLabel}</span>
        </div>
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
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-14">
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: FLOAT_CSS }} />
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
