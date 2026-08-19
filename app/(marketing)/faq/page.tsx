import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { meta, faq, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.faq.title,
  description: meta.faq.description,
  openGraph: {
    title: meta.faq.title,
    description: meta.faq.description,
  },
};

export default function FaqPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h1 className="text-4xl sm:text-5xl font-black text-charcoal mb-4 max-w-xl leading-tight">
            Common questions.
          </h1>
          <p className="text-base lg:text-lg text-charcoal/55 leading-relaxed max-w-xl">
            How the audit works, what it costs, what happens after, and what we
            need from you.
          </p>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <div className="divide-y divide-charcoal/8 max-w-4xl">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-8 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12"
              >
                <p className="text-base font-semibold text-charcoal">{item.q}</p>
                <p className="text-base text-charcoal/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
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
    </>
  );
}
