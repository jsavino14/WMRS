import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ConsolidationDiagram } from "@/components/ConsolidationDiagram";
import { SITE_MGMT_ICONS } from "@/components/SiteManagementIcons";
import { meta, siteManagement, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.siteManagement.title,
  description: meta.siteManagement.description,
  openGraph: {
    title: meta.siteManagement.title,
    description: meta.siteManagement.description,
  },
};

// Border classes for a 6-item 1/2/3-col grid (interior borders only)
const ITEM_BORDERS = [
  "border-b border-charcoal/8 sm:border-r",
  "border-b border-charcoal/8 lg:border-r",
  "border-b border-charcoal/8 sm:border-r lg:border-r-0",
  "border-b border-charcoal/8 lg:border-r lg:border-b-0",
  "border-b border-charcoal/8 sm:border-b-0 sm:border-r",
  "",
];

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

        <Container className="relative py-20 lg:py-28">
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

      {/* ── You report it once ─────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12">
            {siteManagement.whatWeDoSection.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {siteManagement.whatWeDoSection.items.map((item, i) => {
              const Icon = SITE_MGMT_ICONS[item.icon];
              return (
                <div key={i} className={`p-8 ${ITEM_BORDERS[i]}`}>
                  <div className="h-20 flex items-start mb-6">
                    {Icon && <Icon />}
                  </div>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── Consolidation ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 leading-tight">
            {siteManagement.consolidationSection.h2}
          </h2>
          <p className="text-base text-white/55 leading-relaxed mb-14">
            {siteManagement.consolidationSection.sub}
          </p>
          <ConsolidationDiagram />
        </Container>
      </section>

      {/* ── Where to start ────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12">
            {siteManagement.whereToStart.h2}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-4">
                {siteManagement.whereToStart.auditIf.label}
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                {siteManagement.whereToStart.auditIf.body}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent mb-4">
                {siteManagement.whereToStart.hereIf.label}
              </p>
              <p className="text-base text-charcoal/65 leading-relaxed">
                {siteManagement.whereToStart.hereIf.body}
              </p>
            </div>
          </div>
          <p className="mt-10 text-base text-charcoal/65 leading-relaxed">
            {siteManagement.whereToStart.closing}
          </p>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28 border-t border-charcoal/8">
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
