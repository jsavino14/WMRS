import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ConsolidationDiagram } from "@/components/ConsolidationDiagram";
import { SiteManagementIconGrid } from "@/components/SiteManagementIcons";
import { meta, siteManagement, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.siteManagement.title,
  description: meta.siteManagement.description,
  openGraph: {
    title: meta.siteManagement.title,
    description: meta.siteManagement.description,
  },
};


export default function SiteManagementPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        {/* Desktop: image fills right 50% absolutely */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[50%]">
          <Image
            src="/site-management-hero.jpg"
            alt="Four commercial waste containers against a concrete wall"
            fill
            className="object-cover object-[center_38%]"
            sizes="50vw"
            priority
          />
        </div>

        <Container className="relative py-14 lg:py-16">
          <div className="lg:w-[50%] lg:pr-16">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08]">
              {siteManagement.hero.h1}
            </h1>

            <ul className="mt-10 space-y-4 list-none p-0">
              {siteManagement.hero.listItems.map((item, i) => (
                <li key={i} className="text-[15px] lg:text-base text-charcoal leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-base text-charcoal/60 leading-relaxed">
              {siteManagement.hero.closing}
            </p>
          </div>
        </Container>

        {/* Mobile: image below content */}
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/site-management-hero.jpg"
            alt="Four commercial waste containers against a concrete wall"
            fill
            className="object-cover object-[center_38%]"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Consolidation ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal pt-20 pb-12 lg:pt-28 lg:pb-16">
        <Container>
          <h2 className="text-4xl sm:text-5xl xl:text-6xl font-black text-white mb-4 leading-tight">
            {siteManagement.consolidationSection.h2}
          </h2>
          <p className="text-base text-white/55 leading-relaxed mb-14">
            {siteManagement.consolidationSection.sub}
          </p>
          <ConsolidationDiagram />
        </Container>
      </section>

      {/* ── You report it once ─────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12">
            {siteManagement.whatWeDoSection.h2}
          </h2>
          <SiteManagementIconGrid />
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <h2 className="text-3xl font-black text-charcoal mb-4">
            Send us one invoice.
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-2xl">
            Send one recent bill. We&apos;ll tell you what we find and what we think fits,
            whether that&apos;s an audit, ongoing management, or both.
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
