"use client";

// ── Design tokens ─────────────────────────────────────────────────────────────
const CHARCOAL = "#1E2428";
const ACCENT   = "#2E7D4F";
const GREY     = "#C9CFCB";

// ── Panel geometry (SVG units; viewBox 0 0 66 100) ───────────────────────────
const PAD    = 5;
const IW     = 56;
const BAR_H  = 5;
const ACC_H  = 7;
const RULE_Y = 75;
const TOT_Y  = 82;
const TOT_H  = 10;

const TOT_FULL  = Math.round(IW * 0.70); // 39
const TOT_SHORT = Math.round(IW * 0.35); // 20

const Y7 = [10, 19, 28, 37, 46, 55, 64];
const Y5 = [10, 20, 30, 40, 50];
const W7 = [IW, 44, IW, 38, IW, 36, 48]; // widths of 7 bars
const W5 = [36, IW, 28, 46, 34];
const ACC_IDX = new Set([1, 3, 5]);

// Accent bar widths (indices 1, 3, 5 of W7)
const ACC_W = { 1: W7[1], 3: W7[3], 5: W7[5] } as Record<number, number>;

// ── Animation sequence ────────────────────────────────────────────────────────
//
//  500ms  bar 1 grows (200ms) → done 700ms
//  700ms  bar 2 grows (200ms) → done 900ms
//  900ms  bar 3 grows (200ms) → done 1100ms
//  1200ms panel 03 bar shrinks (975ms)
//
// stroke-dasharray animation avoids CSS transform / transform-box issues.
// animation-fill-mode:both → bars are invisible during their delay (from keyframe
// = "0 w") then grow in, then stay visible (forwards).

const ANIM_CSS = `
  @keyframes wmrs-grow-${ACC_W[1]} {
    from { stroke-dasharray: 0 ${ACC_W[1]}; }
    to   { stroke-dasharray: ${ACC_W[1]} 0; }
  }
  @keyframes wmrs-grow-${ACC_W[3]} {
    from { stroke-dasharray: 0 ${ACC_W[3]}; }
    to   { stroke-dasharray: ${ACC_W[3]} 0; }
  }
  @keyframes wmrs-grow-${ACC_W[5]} {
    from { stroke-dasharray: 0 ${ACC_W[5]}; }
    to   { stroke-dasharray: ${ACC_W[5]} 0; }
  }
  .wmrs-acc-1 { animation: wmrs-grow-${ACC_W[1]} 450ms ease-out  500ms both; }
  .wmrs-acc-3 { animation: wmrs-grow-${ACC_W[3]} 450ms ease-out 1100ms both; }
  .wmrs-acc-5 { animation: wmrs-grow-${ACC_W[5]} 450ms ease-out 1700ms both; }

  @keyframes wmrs-shrink {
    from { stroke-dasharray: ${TOT_FULL} 0; }
    to   { stroke-dasharray: ${TOT_SHORT} ${TOT_FULL}; }
  }
  .wmrs-anim-bar {
    animation: wmrs-shrink 1400ms ease-out 2400ms both;
  }
`;

// ── Invoice panel ─────────────────────────────────────────────────────────────
function Panel({ variant }: { variant: 0 | 1 | 2 | 3 }) {
  const isWide  = variant <= 1;
  const isStack = variant === 3;
  const yBars   = isWide ? Y7 : Y5;
  const wBars   = isWide ? W7 : W5;
  const offset  = isStack ? 10 : 0;
  const totalBarW = variant === 3 ? TOT_SHORT : TOT_FULL;
  const lineY     = TOT_Y + TOT_H / 2;

  return (
    <svg
      viewBox={`${-offset} ${-offset} ${66 + offset} ${100 + offset}`}
      fill="none"
      aria-hidden="true"
      style={{ display: "block", width: "100%", height: "auto" }}
    >
      {isStack && (
        <>
          <rect x={-8} y={-8} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2} />
          <rect x={-4} y={-4} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2} />
        </>
      )}

      <rect x={0.5} y={0.5} width={65} height={99} fill="#fff" stroke={CHARCOAL} strokeWidth={2.5} />

      {yBars.map((y, i) => {
        const isAcc = variant === 1 && ACC_IDX.has(i);

        if (isAcc) {
          // Animated highlight: thick line grows left→right via stroke-dasharray
          return (
            <line
              key={i}
              x1={PAD}
              y1={y + ACC_H / 2}
              x2={PAD + wBars[i]}
              y2={y + ACC_H / 2}
              stroke={ACCENT}
              strokeWidth={ACC_H}
              strokeLinecap="butt"
              className={`wmrs-acc-${i}`}
            />
          );
        }

        return (
          <rect
            key={i}
            x={PAD} y={y}
            width={wBars[i]}
            height={BAR_H}
            fill={GREY}
          />
        );
      })}

      <line
        x1={PAD} y1={RULE_Y} x2={PAD + IW} y2={RULE_Y}
        stroke={CHARCOAL} strokeWidth={0.75} opacity={0.3}
      />

      {variant === 2 ? (
        <line
          x1={PAD}
          y1={lineY}
          x2={PAD + TOT_FULL}
          y2={lineY}
          stroke={CHARCOAL}
          strokeWidth={TOT_H}
          strokeLinecap="butt"
          className="wmrs-anim-bar"
        />
      ) : (
        <rect
          x={PAD} y={TOT_Y}
          width={totalBarW}
          height={TOT_H}
          fill={CHARCOAL}
        />
      )}
    </svg>
  );
}

// ── Arrows ────────────────────────────────────────────────────────────────────
function HorizArrow() {
  return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none" aria-hidden="true">
      <line x1={0} y1={6} x2={18} y2={6} stroke={CHARCOAL} strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="13,1.5 22,6 13,10.5" stroke={CHARCOAL} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function DownArrow() {
  return (
    <svg width="12" height="24" viewBox="0 0 12 24" fill="none" aria-hidden="true">
      <line x1={6} y1={0} x2={6} y2={18} stroke={CHARCOAL} strokeWidth={1.5} strokeLinecap="round" />
      <polyline points="1.5,13 6,22 10.5,13" stroke={CHARCOAL} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
type Step = { number: string; diagramLabel: string };

export function ProcessDiagram({ steps }: { steps: Step[] }) {
  return (
    <div>
      {/* eslint-disable-next-line react/no-danger */}
      <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />

      {/* ── Mobile: vertical stack (< 640px) ─────────────────────────────── */}
      <div className="flex flex-col sm:hidden">
        {steps.map((step, i) => (
          <div key={step.number}>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-24">
                <Panel variant={i as 0 | 1 | 2 | 3} />
              </div>
              <div className="flex flex-col gap-1 pt-2">
                <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT }}>
                  {step.number}
                </span>
                <span className="text-sm font-semibold text-charcoal">
                  {step.diagramLabel}
                </span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="pl-11 py-3"><DownArrow /></div>
            )}
          </div>
        ))}
      </div>

      {/* ── Desktop: horizontal CSS grid (≥ 640px) ───────────────────────── */}
      <div className="hidden sm:grid" style={{ gridTemplateColumns: "1fr 24px 1fr 24px 1fr 24px 1fr", columnGap: "6px" }}>
        {steps.map((step, i) => (
          <div key={`n-${i}`} style={{ gridColumn: `${i * 2 + 1}`, gridRow: "1" }} className="pb-2">
            <span style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT }}>
              {step.number}
            </span>
          </div>
        ))}

        {steps.map((_step, i) => [
          <div key={`p-${i}`} style={{ gridColumn: `${i * 2 + 1}`, gridRow: "2" }}>
            <Panel variant={i as 0 | 1 | 2 | 3} />
          </div>,
          i < 3 && (
            <div key={`a-${i}`} style={{ gridColumn: `${i * 2 + 2}`, gridRow: "2" }} className="flex items-center justify-center">
              <HorizArrow />
            </div>
          ),
        ])}

        {steps.map((step, i) => (
          <div key={`l-${i}`} style={{ gridColumn: `${i * 2 + 1}`, gridRow: "3" }} className="pt-3">
            <span className="text-xs font-semibold text-charcoal">{step.diagramLabel}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
