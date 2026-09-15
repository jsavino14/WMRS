import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
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
        eyebrow={page.label}
        headline="Nobody budgets for a compactor until it stops."
        intro="Balers, compactors, and autoclaves are capital purchases that tend to arrive as emergencies. We finance them directly, rent them when a site's volume isn't settled yet, and repair the ones you already have, whoever sold them to you."
        image={null}
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

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-charcoal/8">
        <Container className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/contact"
            className="inline-block bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors text-center"
          >
            Send us one invoice
          </Link>
          <a
            href={company.phoneHref}
            className="inline-block border border-charcoal/30 text-charcoal text-sm font-semibold px-8 py-4 hover:border-charcoal transition-colors text-center"
          >
            Call {company.phone}
          </a>
        </Container>
      </section>
    </div>
  );
}
