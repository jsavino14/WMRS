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
      {/* ── Main section: copy left / image right ────────────────────────── */}
      <section className="relative bg-white overflow-hidden">

        {/* Desktop image: absolute, full-height, flush to right viewport edge */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
          <Image
            src="/about.png"
            alt="Waste invoices spread on a surface"
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
          />
        </div>

        {/* Left column — matches homepage container/left-offset */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="lg:w-1/2 lg:pr-16">

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {about.hero.h1}
            </h1>
            <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed mb-10">
              {about.hero.sub}
            </p>

            {/* Founding story + track record (no heading — h1 covers it) */}
            <div className="space-y-4 mb-10">
              {about.sections[0].body.map((para, i) => (
                <p key={i} className="text-base text-charcoal/70 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Remaining sections with headings */}
            <div className="space-y-8 divide-y divide-charcoal/8">
              {about.sections.slice(1).map((section, i) => (
                <div key={i} className={i > 0 ? "pt-8" : ""}>
                  <h2 className="text-base font-black text-charcoal mb-3">
                    {section.heading}
                  </h2>
                  <div className="space-y-3">
                    {section.body.map((para, j) => (
                      <p key={j} className="text-base text-charcoal/70 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Mobile image: below copy, 4:3 */}
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/about.png"
            alt="Waste invoices spread on a surface"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 border-t border-charcoal/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
