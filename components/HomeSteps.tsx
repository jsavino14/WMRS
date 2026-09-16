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
  const [startedPanels, setStartedPanels] = useState<boolean[]>([false, false, false, false]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    if (isDesktop) {
      // Desktop: all panels are in one row — fire them all once the section is 75% visible
      const el = sectionRef.current;
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            obs.disconnect();
            panelRefs.current.forEach((_, i) => {
              setTimeout(() => {
                setStartedPanels(prev => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 150);
            });
          }
        },
        { threshold: 0.75 },
      );
      obs.observe(el);
      return () => obs.disconnect();
    } else {
      // Mobile: panels are stacked — trigger each one individually as it scrolls into view
      const observers: IntersectionObserver[] = [];
      panelRefs.current.forEach((el, i) => {
        if (!el) return;
        const obs = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              obs.disconnect();
              setStartedPanels(prev => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }
          },
          { threshold: 0.75 },
        );
        obs.observe(el);
        observers.push(obs);
      });
      return () => observers.forEach(o => o.disconnect());
    }
  }, []);

  return (
    <div ref={sectionRef}>
      {/* eslint-disable-next-line react/no-danger */}
      {startedPanels.some(Boolean) && <style dangerouslySetInnerHTML={{ __html: ANIM_CSS }} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {STEPS.map(({ variant, number, title, body }, i) => (
          <div key={number} className="flex flex-col gap-5">
            <div
              ref={el => { panelRefs.current[i] = el; }}
              style={{ maxWidth: 150, height: 227, overflow: "hidden" }}
            >
              <Panel variant={variant} started={startedPanels[i]} />
            </div>
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
