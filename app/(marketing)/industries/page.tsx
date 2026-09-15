import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { industries, servicePages, meta, company } from "@/content/site";

const LABEL_WE_WORK_WITH = "We Work With";
const LABEL_WHAT_WE_DO_HERE = "What We Do Here";

export const metadata: Metadata = {
  title: meta.industries.title,
  description: meta.industries.description,
  openGraph: {
    title: meta.industries.title,
    description: meta.industries.description,
  },
};

export default function IndustriesPage() {
  return (
    <>
      {/* ── Photo band — full bleed, no container ─────────────────────────────── */}
      <div className="relative h-[180px] md:h-[240px] min-[1440px]:h-[300px] overflow-hidden">
        <Image
          src="/industries-hero.png"
          alt="Loading dock, black and white"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
      </div>

      {/* ── Heading ───────────────────────────────────────────────────────────── */}
      <div className="bg-white pt-8 pb-6 lg:pt-10 lg:pb-6">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-black text-charcoal leading-tight">
            Restaurants, hospitals, airports, job sites.
            <br />
            We work in all of them.
          </h1>
        </Container>
      </div>

      {/* ── Industry grid ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-t border-charcoal/10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {industries.map((industry, i) => {
              const relServices = (industry.relatedServices as readonly string[])
                .map((slug) => servicePages.find((p) => p.slug === slug))
                .filter((p): p is (typeof servicePages)[number] => p !== undefined);

              const isLastItem = i === industries.length - 1;
              const isSecondToLast = i === industries.length - 2;
              const isLeftCol = i % 2 === 0;

              const borderBottomClass = isLastItem
                ? ""
                : isSecondToLast
                  ? "border-b border-charcoal/10 lg:border-b-0"
                  : "border-b border-charcoal/10";

              return (
                <div
                  key={industry.slug}
                  id={industry.slug}
                  style={{ scrollMarginTop: "4rem" }}
                  className={[
                    "py-10 lg:py-12",
                    borderBottomClass,
                    isLeftCol
                      ? "lg:pr-12 lg:border-r border-charcoal/10"
                      : "lg:pl-12",
                  ].join(" ")}
                >
                  {/* Icon + Name inline */}
                  <div className="flex items-center gap-3 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/icons/industries/${industry.icon}.svg`}
                      alt=""
                      aria-hidden="true"
                      className="h-8 w-auto flex-shrink-0"
                    />
                    <h2 className="text-xl sm:text-2xl font-black text-charcoal leading-tight">
                      {industry.name}
                    </h2>
                  </div>

                  {/* Paragraph */}
                  <p className="text-sm text-charcoal/65 leading-relaxed mb-5">
                    {industry.paragraph}
                  </p>

                  {/* We Work With */}
                  <p className="label mb-1.5">{LABEL_WE_WORK_WITH}</p>
                  <p className="text-sm text-charcoal/65 mb-5">{industry.includes}</p>

                  {/* What We Do Here */}
                  {relServices.length > 0 && (
                    <>
                      <p className="label mb-1.5">{LABEL_WHAT_WE_DO_HERE}</p>
                      <div className="flex flex-wrap gap-y-1 items-center">
                        {relServices.map((s, idx) => (
                          <span key={s.slug} className="flex items-center">
                            {idx > 0 && (
                              <span className="mx-2 text-charcoal/25 select-none">|</span>
                            )}
                            <Link
                              href={`/services/${s.slug}`}
                              className="text-sm text-charcoal/65 hover:text-charcoal underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal transition-colors"
                            >
                              {s.fullName}
                            </Link>
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
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
