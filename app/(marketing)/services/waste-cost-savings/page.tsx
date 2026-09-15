import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { InvoiceForm } from "@/components/InvoiceForm";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, whatWeFind, servicePages } from "@/content/site";

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
        eyebrow={page.fullName}
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

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Send us one invoice.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                The audit is free. A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><FormSidebar /></div>
              <div className="mt-6 lg:mt-8">
                <InvoiceForm page="/services/waste-cost-savings" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
