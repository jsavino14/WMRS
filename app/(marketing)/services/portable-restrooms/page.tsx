import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { meta, company, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "portable-restrooms")!;

export const metadata: Metadata = {
  title: meta.portableRestrooms.title,
  description: meta.portableRestrooms.description,
  openGraph: { title: meta.portableRestrooms.title, description: meta.portableRestrooms.description },
};

export default function PortableRestroomsPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow={page.label}
        headline="Ordered last minute, priced accordingly."
        intro="Restrooms get arranged the week before, from whichever vendor answers first, on a separate account from everything else on the site. It is the same pattern as the containers, and it produces the same result."
        items={["Standard Units", "ADA Accessible", "Hand Wash Stations", "Holding Tanks", "Scheduled Servicing"]}
        image={{ src: "/portable-restrooms.jpg", alt: "Five portable restrooms lined up against a concrete wall" }}
      />

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] py-16 lg:py-20">
        <Container>
          {/* 01 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              01
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                One account, one number, one invoice.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Restrooms usually sit outside the waste program entirely, arranged by whoever is running the site, on terms nobody has compared against anything. That is how a company ends up paying three different rates for the same unit across three projects in the same county.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Bringing them onto the account means they are priced against your other sites rather than against whatever the vendor quotes that week, and they arrive on the invoice you already receive.
                </p>
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              02
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                A unit that isn&apos;t serviced is worse than no unit.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The rate matters less than whether the pump out actually happens on schedule. When it does not, it becomes a site problem immediately and a phone call shortly after, and the person making that call is the site manager, not procurement.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  We schedule servicing against how the site is actually being used and chase the vendor when it slips. You report it once.
                </p>
              </div>
            </div>
          </div>

          {/* 03 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              03
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Units, placement, and frequency that match the crew.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The right number of units depends on crew size, shift pattern, and how long the site runs, and the right servicing frequency follows from that. Under-ordering creates a problem within a week. Over-ordering is a cost nobody revisits for the life of the project.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Accessible units and hand wash stations are frequently a requirement rather than an upgrade, depending on the site and the jurisdiction. Worth settling at the order rather than after an inspection.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  <Link
                    href="/services/temp-containers"
                    className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
                  >
                    Job sites usually need containers on the same schedule.
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <h2 className="text-3xl font-black text-charcoal mb-4 max-w-md">
            Find out what&apos;s on your bill.
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            Send us one recent invoice. The audit is free and we&apos;ll tell you exactly what we find.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
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
          </div>
        </Container>
      </section>
    </div>
  );
}
