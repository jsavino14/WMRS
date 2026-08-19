import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { meta, siteManagement, home, company } from "@/content/site";

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
        {/* Desktop: image takes right 60%, text left 40% */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[60%]">
          <Image
            src="/four-containers.jpg"
            alt="Four commercial waste containers in a row against a concrete wall"
            fill
            className="object-cover object-[left_35%]"
            sizes="60vw"
            priority
          />
        </div>
        <Container className="relative py-20 lg:py-28">
          <div className="lg:w-[40%] lg:pr-12">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {siteManagement.hero.h1}
            </h1>
            <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed">
              {siteManagement.hero.sub}
            </p>
          </div>
        </Container>
        {/* Mobile: full-width 16:9 below headline */}
        <div className="lg:hidden relative aspect-video">
          <Image
            src="/four-containers.jpg"
            alt="Four commercial waste containers in a row against a concrete wall"
            fill
            className="object-cover object-[left_35%]"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Supporting examples ───────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            {siteManagement.rateSection.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {siteManagement.rateSection.paragraphs.map((para, i) => (
              <p key={i} className="text-base text-charcoal/65 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What we take on ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            {siteManagement.whatWeDoSection.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
            {siteManagement.whatWeDoSection.items.map((item, i) => (
              <div
                key={i}
                className={`p-8 border-charcoal/8 ${
                  i < siteManagement.whatWeDoSection.items.length - 3 || i < 3
                    ? "border-b"
                    : ""
                } ${i % 3 !== 2 ? "lg:border-r" : ""} ${
                  i % 2 === 0 ? "sm:border-r lg:border-r-0" : ""
                } ${i % 2 === 0 && i % 3 === 2 ? "sm:border-r-0" : ""}`}
              >
                <div className="w-4 h-px bg-accent mb-4" />
                <p className="text-sm text-charcoal/70 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 max-w-xl leading-tight">
            {home.cost.h2}
          </h2>
          <p className="text-base text-white/55 leading-relaxed max-w-2xl">
            {home.cost.body}
          </p>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl font-black text-charcoal mb-4 max-w-md">
            Send us one invoice.
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            Send one recent bill. We&apos;ll tell you exactly what we find.
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
