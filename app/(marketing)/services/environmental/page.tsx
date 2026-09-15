import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { meta, company, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "environmental")!;

export const metadata: Metadata = {
  title: meta.environmental.title,
  description: meta.environmental.description,
  openGraph: { title: meta.environmental.title, description: meta.environmental.description },
};

export default function EnvironmentalPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow="Tank Removal & Site Remediation"
        headline="The soil has a say in the closing date."
        intro="Phase II assessments, tank removals, and cleanups are almost always on somebody else's timeline: a buyer, a lender, a regulator, or a deadline you did not set. The work is technical. The pressure is scheduling."
        items={["Phase II Assessments", "Soil and Groundwater Sampling", "Tank Removal", "Soil Remediation", "Closure Documentation"]}
        image={null}
      />

      {/* ── Sections ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] py-16 lg:py-20">
        <Container>
          {/* 01 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              01
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Phase I tells you where to look. Phase II tells you what is there.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  A Phase I is records and observation. No sampling, no answers, just a list of conditions worth investigating. Phase II is where the drilling starts: soil borings, groundwater monitoring wells, samples run against the state&apos;s cleanup standards. The result either clears the property or defines the problem well enough to price it.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Scope is where Phase II work goes wrong in both directions. Too few borings and you have a result nobody on the other side of the transaction will accept. Too many and you have spent real money confirming something the first three already told you.
                </p>
              </div>
            </div>
          </div>

          {/* 02 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              02
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Pulling the tank is the easy part.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The excavation is routine work. What takes the time is everything around it: the notifications, the permits, the closure sampling once the tank is out of the ground, and the report that has to satisfy the state afterward. A tank that comes out clean still needs documentation proving it came out clean, and without that document the tank might as well still be there.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Tanks that do not come out clean become a remediation project the same afternoon. That is why what happens in the first hour after a tank is lifted matters more than anything that happened before it.
                </p>
              </div>
            </div>
          </div>

          {/* 03 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14 border-b border-charcoal/10">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              03
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                The finish line is a piece of paper.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Remediation is either excavation and disposal of impacted soil or treatment in place, depending on what is present, how deep it runs, and what is sitting on top of it. Either way the objective is not an abstractly clean site. It is a written determination from the state that no further action is required.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  That document is what the lender, the buyer, and the next owner actually want. Everything before it is a project in progress, and a project in progress is not something a transaction can close around.
                </p>
              </div>
            </div>
          </div>

          {/* 04 */}
          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] lg:grid-cols-[260px_1fr] gap-x-10 lg:gap-x-16 py-10 md:py-12 lg:py-14">
            <div className="text-[64px] md:text-[120px] lg:text-[220px] font-black text-charcoal/[0.14] leading-none mb-3 md:mb-0 md:pt-7 lg:pt-8 tabular-nums select-none">
              04
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-6 max-w-xl">
                Most of a cleanup, by weight and by cost, is disposal.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Impacted soil is waste. It comes out by the ton, it gets profiled, it gets trucked, and it gets priced per ton at a facility permitted to take it. On most cleanup projects, disposal is the single largest line on the job.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Pricing tonnage, comparing facilities, and holding vendors to a schedule is the same work the rest of this company does every day, applied to a different material. The environmental engineering determines what has to come out. The cost of getting it out is a waste problem.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Closing ───────────────────────────────────────────────────────── */}
      <section className="bg-white py-16 lg:py-20">
        <Container>
          <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-8 max-w-xl">
            What usually triggers it.
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-base text-charcoal/65 leading-relaxed">
              Four things start most of this work. A property is changing hands and the buyer&apos;s or lender&apos;s due diligence turns up a recognized environmental condition. A refinancing requires an assessment the original purchase never did. A tank reaches the age where the state requires action. Or a site is being redeveloped and whatever is underneath it has to be dealt with before anything gets built on top.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              The common factor is that none of them are discretionary and none of them are on your schedule. If one of these has landed, the useful first conversation is about sequence and timing, not price.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              <Link
                href="/industries#commercial-property"
                className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
              >
                Property transactions are where most of this starts.
              </Link>
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              <Link
                href="/services/temp-containers"
                className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
              >
                Redevelopment sites usually need containers on the same schedule.
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <h2 className="text-3xl font-black text-charcoal mb-4 max-w-md">
            Find out what&apos;s on your bill.
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            Send us one recent invoice. The audit is free and we&apos;ll tell you exactly what we find.
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
    </div>
  );
}
