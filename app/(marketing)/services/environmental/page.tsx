import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { ProjectForm } from "@/components/ProjectForm";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "environmental")!;

export const metadata: Metadata = {
  title: meta.environmental.title,
  description: meta.environmental.description,
  openGraph: { title: meta.environmental.title, description: meta.environmental.description , images: ["/og.png"]},
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
        image={{ src: "/environmental.jpg", alt: "An underground storage tank lifted from an excavation pit" }}
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

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Start with WMRS.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><FormSidebar /></div>
              <div className="mt-6 lg:mt-8">
                <ProjectForm defaultSelection="Tank removal, Phase II, or cleanup" page="/services/environmental" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
