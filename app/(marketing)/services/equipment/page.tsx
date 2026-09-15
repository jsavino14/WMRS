import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { ProjectForm } from "@/components/ProjectForm";
import { meta, company, servicePages } from "@/content/site";

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
          {/* 1 — Finance */}
          <div className="py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
              Financed by us, not by a lender.
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-base text-charcoal/65 leading-relaxed">
                We finance equipment directly. There is no broker in the middle, no separate
                credit application with a bank that has never heard of your business, and no
                third party to chase when something needs adjusting later. The company
                financing the baler is the same one managing the waste program it feeds.
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                [PLACEHOLDER - terms and structure. Typical term length, what the payment
                covers, and whether it is structured as a lease or an installment purchase.
                Joe to supply.]
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                Equipment we finance: cardboard balers, self-contained compactors, autoclaves.
              </p>
            </div>
          </div>

          {/* 2 — Rental */}
          <div className="py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
              Or rent, when the volume isn&apos;t settled.
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-base text-charcoal/65 leading-relaxed">
                New sites, seasonal operations, and locations you are not yet sure will hold
                their current volume do not always justify buying. Renting puts the right
                equipment on site now and leaves the decision open until you have a year of
                real numbers behind it.
              </p>
            </div>
          </div>

          {/* 3 — Repair */}
          <div className="py-10 md:py-12 lg:py-14">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
              We fix what you already own.
            </h2>
            <div className="max-w-3xl space-y-4">
              <p className="text-base text-charcoal/65 leading-relaxed">
                Repairs, scheduled maintenance, and welding, on balers, compactors, and
                containers, regardless of who sold them to you.
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A baler down is a loading dock filling with cardboard. The usual answer is
                calling the manufacturer, then finding a welder, then calling your hauler to
                beg an extra pickup while you wait on both. We take all three.
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                <Link
                  href="/site-management"
                  className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
                >
                  This is the same problem site management solves for pickups and billing.
                </Link>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
              Start with WMRS.
            </h2>
            <p className="text-base text-charcoal/65 leading-relaxed mb-8">
              A person reads every one of these, not a queue.
            </p>
            <ProjectForm defaultSelection="Equipment financing, rental, or repair" page="/services/equipment" />
            <p className="mt-6 text-sm text-charcoal/60">
              Or call us directly:{" "}
              <a
                href={company.phoneHref}
                className="underline underline-offset-2 hover:text-charcoal transition-colors"
              >
                {company.phone}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
