"use client";

import { useEffect, useRef } from "react";

// ── Design tokens ─────────────────────────────────────────────────────────────
const CHARCOAL = "#1E2428";
const ACCENT   = "#2E7D4F";
const GREY     = "#C9CFCB";

// ── Panel geometry (SVG units; viewBox 0 0 66 100) ───────────────────────────
const PAD    = 5;    // horizontal inset
const IW     = 56;   // inner bar width (66 - 2×PAD)
const BAR_H  = 5;
const ACC_H  = 7;    // accent bar height (slightly thicker)
const RULE_Y = 75;
const TOT_Y  = 82;
const TOT_H  = 10;

const TOT_FULL   = Math.round(IW * 0.70); // 39 — panels 01, 02
const TOT_SHORT  = Math.round(IW * 0.35); // 20 — panels 03 (final), 04
const ANIM_SCALE = TOT_SHORT / TOT_FULL;  // ≈ 0.513

// Bar y-positions
const Y7 = [10, 19, 28, 37, 46, 55, 64]; // 7 bars (panels 01, 02)
const Y5 = [10, 20, 30, 40, 50];          // 5 bars (panels 03, 04)

// Varying bar widths for visual realism
const W7 = [IW, 44, IW, 38, IW, 36, 48];
const W5 = [36, IW, 28, 46, 34];

// Accent bar indices in panel 02 (0-based; bars 1, 3, 5 are green)
const ACC_IDX = new Set([1, 3, 5]);

// ── Invoice panel ─────────────────────────────────────────────────────────────
function Panel({ variant }: { variant: 0 | 1 | 2 | 3 }) {
  const isWide  = variant <= 1;
  const isStack = variant === 3;
  const yBars   = isWide ? Y7 : Y5;
  const wBars   = isWide ? W7 : W5;

  // Panel 03 total bar starts wide so the CSS animation has room to shrink.
  // Panel 04 is statically short (no animation).
  const totalBarW = variant === 3 ? TOT_SHORT : TOT_FULL;

  // Stack variant needs extra viewBox space for offset layers
  const offset = isStack ? 10 : 0;

  return (
    <svg
      viewBox={`${-offset} ${-offset} ${66 + offset} ${100 + offset}`}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      {/* Offset layers behind panel 04 (stack = ongoing, not finished) */}
      {isStack && (
        <>
          <rect x={-8} y={-8} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2} />
          <rect x={-4} y={-4} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2} />
        </>
      )}

      {/* Panel outline */}
      <rect x={0.5} y={0.5} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2.5} />

      {/* Line-item bars */}
      {yBars.map((y, i) => {
        const isAcc = variant === 1 && ACC_IDX.has(i);
        return (
          <rect
            key={i}
            x={PAD}
            y={y}
            width={wBars[i]}
            height={isAcc ? ACC_H : BAR_H}
            fill={isAcc ? ACCENT : GREY}
          />
        );
      })}

      {/* Rule above total */}
      <line
        x1={PAD} y1={RULE_Y}
        x2={PAD + IW} y2={RULE_Y}
        stroke={CHARCOAL} strokeWidth={0.75} opacity={0.3}
      />

      {/* Total bar — panel 03 carries data-anim and is animated via JS */}
      <rect
        x={PAD}
        y={TOT_Y}
        width={totalBarW}
        height={TOT_H}
        fill={CHARCOAL}
        {...(variant === 2 ? { "data-anim": "total-bar" } : {})}
        style={
          variant === 2
            ? { transformBox: "fill-box", transformOrigin: "left center" }
            : undefined
        }
      />
    </svg>
  );
}

// ── Arrows ────────────────────────────────────────────────────────────────────
function HorizArrow() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <line x1={0} y1={6} x2={18} y2={6} stroke={CHARCOAL} strokeWidth={1.5} strokeLinecap="round" />
      <polyline
        points="13,1.5 22,6 13,10.5"
        stroke={CHARCOAL} strokeWidth={1.5}
        strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" aria-hidden="true">
      <line x1={6} y1={0} x2={6} y2={18} stroke={CHARCOAL} strokeWidth={1.5} strokeLinecap="round" />
      <polyline
        points="1.5,13 6,22 10.5,13"
        stroke={CHARCOAL} strokeWidth={1.5}
        strokeLinejoin="round" strokeLinecap="round"
      />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
type Step = { number: string; diagramLabel: string };

export function ProcessDiagram({ steps }: { steps: Step[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bars = wrapperRef.current?.querySelectorAll<SVGRectElement>('[data-anim="total-bar"]');
    if (!bars?.length) return;
    if (!bars.length) return;

    // Reduced-motion: render final state immediately, no transition
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      bars.forEach((bar) => {
        bar.style.transform = `scaleX(${ANIM_SCALE})`;
      });
      return;
    }

    // Bar renders at TOT_FULL width in the SVG (no CSS transform applied yet).
    // After 700ms the page has settled and the eye has landed on the diagram.
    const id = setTimeout(() => {
      bars.forEach((bar) => {
        bar.style.transition = "transform 650ms ease-out";
        bar.style.transform = `scaleX(${ANIM_SCALE})`;
      });
    }, 700);

    return () => clearTimeout(id);
  }, []);

  return (
    <div ref={wrapperRef}>
      {/* ── Mobile: vertical stack (< 640px) ─────────────────────────────── */}
      <div className="flex flex-col sm:hidden">
        {steps.map((step, i) => (
          <div key={step.number}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-24">
                <Panel variant={i as 0 | 1 | 2 | 3} />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: ACCENT,
                  }}
                >
                  {step.number}
                </span>
                <span className="text-sm font-semibold text-charcoal">
                  {step.diagramLabel}
                </span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="pl-11 py-3">
                <DownArrow />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop: horizontal CSS grid (≥ 640px) ───────────────────────── */}
      <div
        className="hidden sm:grid"
        style={{
          gridTemplateColumns: "1fr 24px 1fr 24px 1fr 24px 1fr",
          columnGap: "6px",
        }}
      >
        {/* Row 1: step numbers */}
        {steps.map((step, i) => (
          <div
            key={`n-${i}`}
            style={{ gridColumn: `${i * 2 + 1}`, gridRow: "1" }}
            className="pb-2"
          >
            <span
              style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: ACCENT,
              }}
            >
              {step.number}
            </span>
          </div>
        ))}

        {/* Row 2: panels + arrows */}
        {steps.map((_step, i) => [
          <div key={`p-${i}`} style={{ gridColumn: `${i * 2 + 1}`, gridRow: "2" }}>
            <Panel variant={i as 0 | 1 | 2 | 3} />
          </div>,
          i < 3 && (
            <div
              key={`a-${i}`}
              style={{ gridColumn: `${i * 2 + 2}`, gridRow: "2" }}
              className="flex items-center justify-center"
            >
              <HorizArrow />
            </div>
          ),
        ])}

        {/* Row 3: labels */}
        {steps.map((step, i) => (
          <div
            key={`l-${i}`}
            style={{ gridColumn: `${i * 2 + 1}`, gridRow: "3" }}
            className="pt-3"
          >
            <span className="text-xs font-semibold text-charcoal">
              {step.diagramLabel}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
