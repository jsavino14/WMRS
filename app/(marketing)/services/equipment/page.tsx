import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { ProjectForm } from "@/components/ProjectForm";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "equipment")!;

export const metadata: Metadata = {
  title: meta.equipment.title,
  description: meta.equipment.description,
  openGraph: {
    title: meta.equipment.title,
    description: meta.equipment.description,
  },
};

export default function EquipmentPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow={page.fullName}
        headline="Nobody budgets for a compactor until it stops."
        intro="Balers, compactors, and autoclaves are capital purchases that tend to arrive as emergencies. We finance them directly, rent them when a site's volume isn't settled yet, and repair the ones you already have, whoever sold them to you."
        image={{ src: "/equipment.jpg", alt: "A vertical baler with a compressed bale of cardboard in an industrial warehouse" }}
      />

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <Container>
          {/* 01 — Finance */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              01
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Financed by us, not by a lender.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  We finance equipment directly. There is no broker in the middle, no separate
                  credit application with a bank that has never heard of your business, and no
                  third party to chase when something needs adjusting later. The company
                  financing the baler is the same one managing the waste program it feeds.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Equipment we finance: cardboard balers, self-contained compactors, autoclaves.
                </p>
              </div>
            </div>
          </div>

          {/* 02 — Rental */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              02
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Or rent, when the volume isn&apos;t settled.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  New sites, seasonal operations, and locations you are not yet sure will hold
                  their current volume do not always justify buying. Renting puts the right
                  equipment on site now and leaves the decision open until you have a year of
                  real numbers behind it.
                </p>
              </div>
            </div>
          </div>

          {/* 03 — Repair */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              03
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                We fix what you already own.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Repairs, scheduled maintenance, and welding, on balers, compactors, and
                  containers, regardless of who sold them to you.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  A baler down is a loading dock filling with cardboard. The usual answer is
                  calling the manufacturer, then finding a welder, then calling your hauler to
                  beg an extra pickup while you wait on both. We take all three.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Start with WMRS.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><FormSidebar /></div>
              <div className="mt-6 lg:mt-8">
                <ProjectForm defaultSelection="Equipment financing, rental, or repair" page="/services/equipment" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
