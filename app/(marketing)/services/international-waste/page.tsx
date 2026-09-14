import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { meta, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.internationalWaste.title,
  description: meta.internationalWaste.description,
  openGraph: {
    title: meta.internationalWaste.title,
    description: meta.internationalWaste.description,
  },
};

export default function InternationalWastePage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
            [HEADLINE]
          </h1>
          <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed max-w-2xl">
            [INTRO PARAGRAPH]
          </p>
        </Container>
      </section>

      {/* ── Content ──────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-8 max-w-xl">
            [SECTION HEADING]
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-base text-charcoal/65 leading-relaxed">[SECTION CONTENT]</p>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 border-t border-charcoal/8">
        <Container className="flex flex-col sm:flex-row gap-4">
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
        </Container>
      </section>
    </div>
  );
}
