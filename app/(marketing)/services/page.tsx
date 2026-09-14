import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { meta, servicesOverview, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.services.title,
  description: meta.services.description,
  openGraph: {
    title: meta.services.title,
    description: meta.services.description,
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
            {servicesOverview.hero.h1}
          </h1>
          <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed max-w-2xl">
            {servicesOverview.hero.sub}
          </p>
        </Container>
      </section>

      {/* ── Services list ─────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <Container>
          <div className="divide-y divide-charcoal/10">
            {servicesOverview.services.map((service) => (
              <div
                key={service.id}
                id={service.hasPage ? undefined : service.anchor}
                className="py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 lg:gap-16"
              >
                <div>
                  <h2 className="text-xl font-black text-charcoal mb-3">
                    {service.label}
                  </h2>
                  {service.hasPage && (
                    <Link
                      href={service.href}
                      className="text-sm font-semibold text-accent hover:underline underline-offset-4"
                    >
                      Learn more
                    </Link>
                  )}
                </div>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  {service.body}
                </p>
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
