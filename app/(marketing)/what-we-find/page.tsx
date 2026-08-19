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
        <Container className="relative py-20 lg:py-28">
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
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/what-we-find.png"
            alt="Commercial dumpster against a concrete wall"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Contract context ─────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
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

      {/* ── Findings ─────────────────────────────────────────────────────── */}
      <section className="bg-white py-4">
        <Container>
          <p className="label mb-10 pt-14">The six findings</p>
          <div className="max-w-3xl">
            {whatWeFind.items.map((item, i) => (
              <div
                key={item.number}
                className={`grid grid-cols-[48px_1fr] gap-8 py-14 border-b border-charcoal/8 ${i === 0 ? "border-t" : ""}`}
              >
                <div className="text-4xl font-black text-charcoal/10 leading-none pt-1">
                  {item.number}
                </div>
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-charcoal/50 mb-3">
                    {item.label}
                  </p>
                  <h2 className="text-xl sm:text-2xl font-black text-charcoal mb-6 max-w-xl">
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
          <div className="pb-14" />
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
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
