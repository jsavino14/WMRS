import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { meta, whatWeFind, company, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "waste-cost-savings")!;

export const metadata: Metadata = {
  title: meta.wasteCostSavings.title,
  description: meta.wasteCostSavings.description,
  openGraph: {
    title: meta.wasteCostSavings.title,
    description: meta.wasteCostSavings.description,
  },
};

export default function WasteCostSavingsPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow={page.label}
        headline={whatWeFind.hero.h1}
        intro={whatWeFind.hero.sub}
        items={whatWeFind.items.map((item) => item.label)}
        image={{ src: "/what-we-find.png", alt: "Commercial dumpster against a concrete wall" }}
      />

      {/* ── Findings ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] py-16 lg:py-20">
        <Container>
          <div>
            {whatWeFind.items.map((item, i) => (
              <div
                key={item.number}
                className={`grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 ${i < whatWeFind.items.length - 1 ? "border-b border-charcoal/10" : ""}`}
              >
                <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
                  {item.number}
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-charcoal/50 mb-3">
                    {item.label}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-charcoal mb-6">
                    {item.title}
                  </h2>
                  <div className="space-y-4">
                    {item.detail.map((para, j) => (
                      <p key={j} className="text-base text-charcoal/65 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Contract context ─────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-8 max-w-xl">
            {whatWeFind.contractContext.heading}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 max-w-5xl">
            {whatWeFind.contractContext.body.map((para, i) => (
              <p key={i} className="text-base text-charcoal/65 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <h2 className="text-3xl font-black text-charcoal mb-4 max-w-md">
            Find out what's on your bill.
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            Send us one recent invoice. The audit is free and we'll tell you exactly what we find.
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
