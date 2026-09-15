import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { ProjectForm } from "@/components/ProjectForm";
import { DirectContact } from "@/components/DirectContact";
import { meta, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "esg-reporting")!;

export const metadata: Metadata = {
  title: meta.esgReporting.title,
  description: meta.esgReporting.description,
  openGraph: { title: meta.esgReporting.title, description: meta.esgReporting.description },
};

export default function EsgReportingPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow={page.fullName}
        headline="Somebody will ask where that number came from."
        intro="A sustainability report needs tonnage by stream, by site, for the year. Haulers report in different formats on different cycles, some estimate rather than weigh, and some do not report at all unless you ask every month."
        items={["Tonnage by Stream", "Diversion Rates", "Site Level Detail", "Annual Rollups", "Auditable Back to Invoice"]}
        image={{ src: "/esg-reporting.jpg", alt: "Rows of compressed cardboard bales stacked at a recycling facility" }}
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
                Nobody is withholding it. Nobody is organizing it either.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Across a portfolio you are dealing with several haulers, each with their own reporting format, cycle, and definition of what counts. One reports actual scale weights, another applies a standard weight per haul and calls it tonnage. One sends a monthly file, another sends nothing until it is requested.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Assembling that into a single annual number is not analysis, it is reconciliation. It is also the reason the reported figure at a lot of companies is a best guess wearing a decimal point.
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
                One definition, applied everywhere.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  We normalize what each hauler reports into a consistent structure: same streams, same units, same periods, across every location. Where a hauler estimates rather than weighs, that is recorded as an estimate rather than quietly rolled in with measured tonnage.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The result is a number you can explain. When somebody asks how a site&apos;s diversion rate was calculated, there is an answer that does not begin with &ldquo;the hauler told us.&rdquo;
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
                Traceable back to the invoice.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Reported figures increasingly get looked at rather than filed. Whoever asks&mdash;an auditor, a customer&apos;s procurement team, an investor&mdash;the question is the same: where did this number come from.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Because we hold the billing, every tonnage figure traces back to the invoice it came from. That is a materially different position from assembling a report out of spreadsheets at year end and hoping the underlying files still exist.
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
                Reporting shows you where diversion is failing.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Site level data makes the outliers obvious. One location running half the diversion rate of a comparable one is not a reporting problem, it is an operational one: no separate stream set up, contamination sending recyclables to landfill, or a container configuration that makes separation impractical.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Those are fixable, and fixing them usually lowers the bill as well. Landfill costs more than recycling in most markets, so the diversion work and the cost work point in the same direction more often than not.
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
            What we do not do.
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-base text-charcoal/65 leading-relaxed">
              We report waste and recycling. We do not audit your energy, your water, or your supply chain, and we do not certify anything against a framework. What we provide is the waste data, structured and documented well enough to drop into whatever reporting you or your consultants are producing.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              If your framework requires something specific in a particular format, tell us what it is and we will produce it that way rather than handing you a general export to reshape yourself.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              <Link
                href="/services/waste-cost-savings"
                className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
              >
                Mispriced recyclables are usually both a cost problem and a diversion problem.
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Start with WMRS.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><DirectContact /></div>
              <div className="mt-6 lg:mt-8">
                <ProjectForm defaultSelection="ESG and diversion reporting" page="/services/esg-reporting" />
              </div>
            </div>
            <div className="hidden lg:block flex-shrink-0"><DirectContact /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
