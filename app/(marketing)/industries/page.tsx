import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { industries, servicePages, meta, company } from "@/content/site";

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
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl font-black text-charcoal leading-tight mb-6">
            Every industry generates waste differently. Every industry gets billed the same way.
          </h1>
          <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed max-w-2xl">
            The container sizes change, the streams change, the volume changes. What doesn&rsquo;t change is a contract with an escalator in it and a surcharge structure nobody reads. Here&rsquo;s where the money usually is, by sector.
          </p>
        </Container>
      </section>

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

              // Border-bottom: all on mobile except last; on desktop only through second-to-last row
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
                  {/* Icon */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`/icons/industries/${industry.icon}.svg`}
                    alt=""
                    aria-hidden="true"
                    className="h-11 w-auto mb-5"
                  />

                  {/* Name */}
                  <h2 className="text-xl sm:text-2xl font-black text-charcoal mb-3">
                    {industry.name}
                  </h2>

                  {/* Paragraph */}
                  <p className="text-sm text-charcoal/65 leading-relaxed mb-5">
                    {industry.paragraph}
                  </p>

                  {/* Includes */}
                  <p className="label mb-1.5">Includes</p>
                  <p className="text-sm text-charcoal/65 mb-5">{industry.includes}</p>

                  {/* Related services */}
                  {relServices.length > 0 && (
                    <>
                      <p className="label mb-1.5">Related Services</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-1">
                        {relServices.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            className="text-sm text-charcoal/65 hover:text-charcoal underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal transition-colors"
                          >
                            {s.label}
                          </Link>
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
