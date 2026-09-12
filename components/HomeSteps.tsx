"use client";

import { useEffect, useRef, useState } from "react";
import { Panel, ANIM_CSS } from "@/components/ProcessDiagram";

const ACCENT = "#2E7D4F";

const STEPS: { variant: 0 | 1 | 2 | 3; number: string; title: string; body: string }[] = [
  {
    variant: 0,
    number: "01",
    title: "Send us one invoice.",
    body: "One recent bill. No meeting, no contract, no commitment.",
  },
  {
    variant: 1,
    number: "02",
    title: "We audit it.",
    body: "Line by line, against what haulers in your zip code actually accept.",
  },
  {
    variant: 2,
    number: "03",
    title: "We renegotiate.",
    body: "Usually with your existing hauler. Same truck, same schedule, lower number.",
  },
  {
    variant: 3,
    number: "04",
    title: "We take over the billing.",
    body: "Every invoice comes to us. We catch increases before you pay them.",
  },
];

export function HomeSteps() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStarted(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {/* eslint-disable-next-line react/no-danger */}
      {started && <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {STEPS.map(({ variant, number, title, body }) => (
          <div key={number} className="flex flex-col gap-5">
            <Panel variant={variant} started={started} />
            <div className="space-y-1">
              <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: ACCENT }}>
                {number}
              </p>
              <h3 className="text-base font-bold text-charcoal">{title}</h3>
              <p className="text-sm text-charcoal/60 leading-relaxed">{body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
