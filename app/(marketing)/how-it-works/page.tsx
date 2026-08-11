import type { Metadata } from "next";
import Link from "next/link";
import { meta, howItWorksPage, home, faq, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.howItWorks.title,
  description: meta.howItWorks.description,
  openGraph: {
    title: meta.howItWorks.title,
    description: meta.howItWorks.description,
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-20 lg:pt-28 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">{howItWorksPage.hero.label}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-6 max-w-2xl">
            {howItWorksPage.hero.h1}
          </h1>
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl">
            {howItWorksPage.hero.sub}
          </p>
        </div>
      </section>

      {/* ── Steps (expanded) ─────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          {howItWorksPage.steps.map((step, i) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 py-14 border-b border-charcoal/8 ${i === 0 ? "border-t" : ""}`}
            >
              <div className="text-6xl font-black text-charcoal/8 leading-none">
                {step.number}
              </div>
              <div>
                <h2 className="text-2xl font-black text-charcoal mb-6">
                  {step.title}
                </h2>
                <div className="space-y-4">
                  {step.body.map((para, j) => (
                    <p key={j} className="text-base text-charcoal/65 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── What It Costs ────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label text-accent mb-6">{home.cost.label}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 max-w-xl leading-tight">
            {home.cost.h2}
          </h2>
          <div className="w-12 h-px bg-accent mb-8" />
          <p className="text-lg text-white/65 leading-relaxed max-w-2xl">
            {home.cost.body}
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">FAQ</p>
          <h2 className="text-3xl font-black text-charcoal mb-12 max-w-xl">
            Common questions.
          </h2>
          <div className="divide-y divide-charcoal/8">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-7 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12"
              >
                <p className="text-base font-semibold text-charcoal">{item.q}</p>
                <p className="text-base text-charcoal/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 border-t border-charcoal/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row gap-4">
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
      </section>
    </>
  );
}
