import type { Metadata } from "next";
import Link from "next/link";
import { meta, whoWeWorkWith, industries, caseStudies, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.whoWeWorkWith.title,
  description: meta.whoWeWorkWith.description,
  openGraph: {
    title: meta.whoWeWorkWith.title,
    description: meta.whoWeWorkWith.description,
  },
};

export default function WhoWeWorkWith() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-6">
                {whoWeWorkWith.hero.h1}
              </h1>
              <p className="text-lg text-charcoal/60 leading-relaxed">
                {whoWeWorkWith.hero.sub}
              </p>
            </div>
            {/* Image slot - replace with <Image> */}
            <div className="aspect-[4/3] bg-charcoal/6 border border-charcoal/10" />
          </div>
        </div>
      </section>

      {/* ── Industries grid ───────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-10">Industries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-charcoal/8">
            {industries.map((industry, i) => (
              <div
                key={i}
                className={`py-7 ${i % 2 === 0 ? "sm:border-r sm:border-charcoal/8 sm:pr-10" : "sm:pl-10"}`}
              >
                <h3 className="text-base font-bold text-charcoal mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-charcoal/55 leading-relaxed">
                  {industry.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case studies ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">Case Studies</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            What clients have found.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="border border-charcoal/10 p-6 space-y-5">
                <div>
                  <p className="label text-accent/80 mb-1">{cs.industry}</p>
                  <p className="text-xs text-charcoal/40">
                    {cs.state} · {cs.locationCount} location{cs.locationCount === "1" ? "" : "s"}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    The situation
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.situation}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    What we found
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.found}</p>
                </div>
                <div className="border-t border-charcoal/8 pt-4">
                  <p className="text-2xl font-black text-charcoal">{cs.result.saved}</p>
                  <p className="text-sm text-charcoal/50">{cs.result.reduction} reduction · {cs.result.annualSavings}</p>
                </div>
                <blockquote className="border-l-2 border-accent pl-4">
                  <p className="text-sm text-charcoal/65 italic leading-relaxed">{cs.quote}</p>
                  <footer className="mt-2 text-xs text-charcoal/40 font-medium">
                    - {cs.quoteName}
                  </footer>
                </blockquote>
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
