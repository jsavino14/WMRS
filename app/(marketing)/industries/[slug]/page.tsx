import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/Container";
import { industryPages, meta, company } from "@/content/site";
import type { IndustrySlug } from "@/content/site";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return industryPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === slug);
  if (!page) return {};
  const m = meta.industryPage(page.label);
  return {
    title: m.title,
    description: m.description,
    openGraph: { title: m.title, description: m.description },
  };
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const page = industryPages.find((p) => p.slug === (slug as IndustrySlug));
  if (!page) notFound();

  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <p className="label mb-4">{page.label}</p>
          <h1 className="text-4xl sm:text-5xl font-black text-charcoal leading-tight mb-6">
            [HEADLINE]
          </h1>
          <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed max-w-2xl">
            [INTRO PARAGRAPH - describe how WMRS reduces waste costs for {page.label} businesses]
          </p>
        </Container>
      </section>

      {/* ── What we find ─────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-8 max-w-xl">
            [SECTION HEADING - e.g. "What we typically find on {page.label} accounts."]
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
