"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { InvoiceForm } from "./InvoiceForm";
import { DeliveryForm } from "./DeliveryForm";
import { ProjectForm } from "./ProjectForm";

type TabId = "invoice" | "delivery" | "project";

const TABS: { id: TabId; label: string }[] = [
  { id: "invoice",  label: "Send us one invoice" },
  { id: "delivery", label: "Request a delivery" },
  { id: "project",  label: "Start with WMRS" },
];

function resolveTab(value: string | undefined): TabId {
  if (value === "delivery" || value === "project") return value;
  return "invoice";
}

interface ContactTabsProps {
  /** Initial tab, derived from ?form= searchParam on /contact */
  initialTab?: string;
  /** Page path passed through to form submissions */
  page: string;
  /** When true, tab switches update the URL (?form=…). Use on /contact only. */
  updateUrl?: boolean;
}

export function ContactTabs({ initialTab, page, updateUrl = false }: ContactTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>(() => resolveTab(initialTab));
  const router = useRouter();
  const pathname = usePathname();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const switchTab = useCallback(
    (id: TabId) => {
      setActiveTab(id);
      if (updateUrl) {
        router.replace(`${pathname}?form=${id}`, { scroll: false });
      }
    },
    [router, pathname, updateUrl]
  );

  function handleKeyDown(e: React.KeyboardEvent, currentIdx: number) {
    let nextIdx = currentIdx;
    if (e.key === "ArrowRight") nextIdx = (currentIdx + 1) % TABS.length;
    else if (e.key === "ArrowLeft") nextIdx = (currentIdx - 1 + TABS.length) % TABS.length;
    else return;
    e.preventDefault();
    tabRefs.current[nextIdx]?.focus();
    switchTab(TABS[nextIdx].id);
  }

  return (
    <div>
      {/* Tab list */}
      <div
        role="tablist"
        aria-label="Contact options"
        className="flex flex-wrap md:flex-nowrap md:border-b border-charcoal/10 mb-10 gap-1"
      >
        {TABS.map((tab, idx) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              ref={(el) => { tabRefs.current[idx] = el; }}
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => switchTab(tab.id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className={`px-3 md:px-4 py-3 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap ${
                isActive
                  ? "border-charcoal text-charcoal"
                  : "border-transparent text-charcoal/45 hover:text-charcoal"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Panels */}
      {TABS.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== tab.id}
        >
          {tab.id === "invoice" && (
            <InvoiceForm page={page} />
          )}
          {tab.id === "delivery" && (
            <DeliveryForm defaultSelection="Temporary container" page={page} />
          )}
          {tab.id === "project" && (
            <ProjectForm defaultSelection="Equipment financing, rental, or repair" page={page} />
          )}
        </div>
      ))}
    </div>
  );
}
