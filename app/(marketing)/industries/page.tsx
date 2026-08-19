import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { meta, whoWeWorkWith, industries, caseStudies, company } from "@/content/site";

const INDUSTRY_ICONS: Record<string, string> = {
  "Restaurant Groups":              "/icons/industries/restaurant-groups.svg",
  "Hotel & Hospitality":            "/icons/industries/hotel-hospitality.svg",
  "Retail Chains":                  "/icons/industries/retail-chains.svg",
  "Commercial Property Management": "/icons/industries/commercial-property.svg",
  "Healthcare Facilities":          "/icons/industries/healthcare.svg",
  "Grocery & Food Service":         "/icons/industries/grocery-food.svg",
  "Office Buildings":               "/icons/industries/office-buildings.svg",
  "Manufacturing":                  "/icons/industries/manufacturing.svg",
  "Entertainment Venues":           "/icons/industries/entertainment.svg",
  "Educational Institutions":       "/icons/industries/education.svg",
};

export const metadata: Metadata = {
  title: meta.whoWeWorkWith.title,
  description: meta.whoWeWorkWith.description,
  openGraph: {
    title: meta.whoWeWorkWith.title,
    description: meta.whoWeWorkWith.description,
  },
};

export default function WhoWeWorkWith() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
          <Image
            src="/who-we-do-it-for.jpg"
            alt="Aerial view of a logistics facility with loading docks"
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
          />
        </div>
        <Container className="relative py-20 lg:py-28">
          <div className="lg:w-1/2 lg:max-w-[calc(50%-2rem)] lg:pr-16">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {whoWeWorkWith.hero.h1}
            </h1>
            <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed">
              {whoWeWorkWith.hero.sub}
            </p>
          </div>
        </Container>
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/who-we-do-it-for.jpg"
            alt="Aerial view of a logistics facility with loading docks"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Industries grid ───────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <p className="label mb-10">Industries</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-charcoal/8 max-w-4xl">
            {industries.map((industry, i) => (
              <div
                key={i}
                className={`py-7 ${i % 2 === 0 ? "sm:border-r sm:border-charcoal/8 sm:pr-10" : "sm:pl-10"}`}
              >
                {INDUSTRY_ICONS[industry.name] && (
                  <div className="h-12 flex items-end mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={INDUSTRY_ICONS[industry.name]}
                      alt=""
                      aria-hidden="true"
                      style={{ height: 40, width: "auto", display: "block" }}
                    />
                  </div>
                )}
                <h3 className="text-base font-bold text-charcoal mb-2">
                  {industry.name}
                </h3>
                <p className="text-sm text-charcoal/55 leading-relaxed">
                  {industry.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Case studies ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <p className="label mb-6">Case Studies</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            What clients have found.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="border border-charcoal/10 p-6 space-y-5">
                <div>
                  <p className="label text-accent/80 mb-1">{cs.industry}</p>
                  <p className="text-xs text-charcoal/40">
                    {cs.state} · {cs.locationCount} location{cs.locationCount === "1" ? "" : "s"}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    The situation
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.situation}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    What we found
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.found}</p>
                </div>
                <div className="border-t border-charcoal/8 pt-4">
                  <p className="text-2xl font-black text-charcoal">{cs.result.saved}</p>
                  <p className="text-sm text-charcoal/50">{cs.result.reduction} reduction · {cs.result.annualSavings}</p>
                </div>
                <blockquote className="border-l-2 border-accent pl-4">
                  <p className="text-sm text-charcoal/65 italic leading-relaxed">{cs.quote}</p>
                  <footer className="mt-2 text-xs text-charcoal/40 font-medium">
                    - {cs.quoteName}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 border-t border-charcoal/8">
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
