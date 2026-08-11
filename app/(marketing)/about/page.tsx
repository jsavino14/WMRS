import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-6">
                {about.hero.h1}
              </h1>
              <p className="text-lg text-charcoal/60 leading-relaxed">
                {about.hero.sub}
              </p>
            </div>
            <div className="relative aspect-[4/3]">
              <Image
                src="/about.png"
                alt="Waste invoices spread on a surface"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-charcoal/8">
            {about.sections.map((section, i) => (
              <div
                key={i}
                className="py-12 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-16"
              >
                <h2 className="text-xl font-black text-charcoal leading-snug">
                  {section.heading}
                </h2>
                <div className="space-y-4">
                  {section.body.map((para, j) => (
                    <p key={j} className="text-base text-charcoal/70 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Independence callout */}
          <div className="mt-12 border-t border-charcoal/10 pt-10">
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
