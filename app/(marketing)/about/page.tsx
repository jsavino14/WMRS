import type { Metadata } from "next";
import Link from "next/link";
import { meta, about, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.about.title,
  description: meta.about.description,
  openGraph: {
    title: meta.about.title,
    description: meta.about.description,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-20 lg:pt-28 lg:pb-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">{about.hero.label}</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-6 max-w-2xl">
            {about.hero.h1}
          </h1>
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl">
            {about.hero.sub}
          </p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16">
            {/* Story */}
            <div className="space-y-6">
              {about.body.map((para, i) => (
                <p key={i} className="text-base text-charcoal/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Photo slot + Independence callout */}
            <div className="space-y-8">
              {/* Photo placeholder — replace with <Image> when photo is available */}
              <div className="aspect-[3/4] bg-charcoal/8 border border-charcoal/10 flex items-center justify-center">
                <p className="text-sm text-charcoal/30 text-center px-6">
                  Photo
                  <br />
                  [Replace with founder photo]
                </p>
              </div>
            </div>
          </div>

          {/* Independence statement */}
          <div className="mt-16 border-t border-charcoal/10 pt-10">
            <div className="flex gap-6">
              <div className="flex-shrink-0 w-px bg-accent self-stretch" />
              <p className="text-lg font-semibold text-charcoal leading-relaxed">
                {about.independence}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-charcoal/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl font-black text-charcoal mb-4 max-w-md">
            Ready to find out what you're paying?
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            Send us one invoice. The audit is free.
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
        </div>
      </section>
    </>
  );
}
