import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ConsolidationDiagram } from "@/components/ConsolidationDiagram";
import { SiteManagementIconGrid } from "@/components/SiteManagementIcons";
import { InvoiceForm } from "@/components/InvoiceForm";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, siteManagement } from "@/content/site";

export const metadata: Metadata = {
  title: meta.siteManagement.title,
  description: meta.siteManagement.description,
  openGraph: {
    title: meta.siteManagement.title,
    description: meta.siteManagement.description,
      images: ["/og.png"],
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

        {/* Mobile: image above content, shallow band */}
        <div className="lg:hidden relative h-[210px]">
          <Image
            src="/site-management-hero.jpg"
            alt="Four commercial waste containers against a concrete wall"
            fill
            className="object-cover object-[center_38%]"
            sizes="100vw"
          />
        </div>

        <Container className="relative pt-10 pb-14 lg:py-16">
          <div className="lg:w-[50%] lg:pr-16">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08]">
              {siteManagement.hero.h1}
            </h1>

            <ul className="mt-10 space-y-2 list-none p-0">
              {siteManagement.hero.listItems.map((item, i) => (
                <li key={i} className="text-[15px] lg:text-base text-charcoal leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <div className="w-6 h-px bg-accent mb-4" />
              <p className="text-base font-semibold text-charcoal leading-relaxed">
                {siteManagement.hero.closing}
              </p>
            </div>
          </div>
        </Container>
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

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Send us one invoice.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                The audit is free. A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><FormSidebar /></div>
              <div className="mt-6 lg:mt-8">
                <InvoiceForm page="/site-management" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
