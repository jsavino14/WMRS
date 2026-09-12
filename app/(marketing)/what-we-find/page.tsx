import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { meta, whatWeFind, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.whatWeFind.title,
  description: meta.whatWeFind.description,
  openGraph: {
    title: meta.whatWeFind.title,
    description: meta.whatWeFind.description,
  },
};

export default function WhatWeFind() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
          <Image
            src="/what-we-find.png"
            alt="Commercial dumpster against a concrete wall"
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
          />
        </div>
        {/* Mobile: image above content, shallow band */}
        <div className="lg:hidden relative h-[250px]">
          <Image
            src="/what-we-find.png"
            alt="Commercial dumpster against a concrete wall"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        <Container className="relative pt-10 pb-16 lg:py-28">
          <div className="lg:w-1/2 lg:max-w-[calc(50%-2rem)] lg:pr-16">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {whatWeFind.hero.h1}
            </h1>
            <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed mb-6">
              {whatWeFind.hero.sub}
            </p>
            {/* Condensed findings list */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {whatWeFind.items.map((item, i) => (
                <span key={item.number} className="flex items-center gap-x-2">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-charcoal/70">
                    {item.label}
                  </span>
                  {i < whatWeFind.items.length - 1 && (
                    <span className="text-charcoal/40 select-none leading-none">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ── Findings ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] py-16 lg:py-20">
        <Container>
          <div>
            {whatWeFind.items.map((item, i) => (
              <div
                key={item.number}
                className={`grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 ${i < whatWeFind.items.length - 1 ? "border-b border-charcoal/10" : ""}`}
              >
                {/* Numeral — stacked above content on mobile, own column on md+ */}
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
    </>
  );
}
