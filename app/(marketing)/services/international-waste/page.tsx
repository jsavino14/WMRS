import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { ProjectForm } from "@/components/ProjectForm";
import { meta, company, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "international-waste")!;

export const metadata: Metadata = {
  title: meta.internationalWaste.title,
  description: meta.internationalWaste.description,
  openGraph: {
    title: meta.internationalWaste.title,
    description: meta.internationalWaste.description,
  },
};

export default function InternationalWastePage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow="International Catering Waste"
        headline="Some food waste is a quarantine problem."
        intro="Food waste from aircraft and vessels arriving from outside the country is regulated by the USDA, not treated as ordinary garbage. It has to be segregated, sealed, and destroyed at an approved facility, and when something goes wrong the liability lands on the operator rather than the hauler."
        items={["Segregation at Source", "Sealed Transfer", "Approved Facilities", "Chain of Custody", "Retained Records"]}
        image={{ src: "/international-waste.jpg", alt: "A row of aluminum airline catering trolleys on an airport apron" }}
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
                It isn&apos;t garbage. It&apos;s quarantine material.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Food scraps from a flight or vessel that originated outside the country can carry animal and plant pathogens that domestic agriculture has no exposure to. Foot and mouth disease and African swine fever are the ones that drive the rules. A single uncontrolled stream reaching open ground is the scenario the regulation exists to prevent.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  That is why the requirement attaches to origin rather than content. The same tray of food is ordinary waste on a domestic flight and regulated material on an arriving international one.
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
                Sealed from the aircraft to the furnace.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The material has to be separated at the point it comes off the aircraft or vessel, held in leak-proof sealed containers, transported without being combined into a general waste stream, and delivered to a facility approved to destroy it. Approved destruction means incineration or an equivalent sterilization method, not burial.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  Every step generates a record, and those records have to be retained and produceable. The paperwork is not an afterthought to the process. It is the only evidence the process happened.
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
                The failure is almost always a handoff.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  The common failures are mundane. A hauler picks up who is not approved to handle the material. A sealed container gets tipped into a general compactor by someone covering a shift. Manifests go missing between the ground handler, the transporter, and the facility, so there is no way to show what happened to a load.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  None of those are exotic, and all of them are the operator&apos;s problem. The regulation holds the generator responsible for where the material ends up, regardless of who was driving.
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
                We own the chain, not just the pickup.
              </h2>
              <div className="space-y-4">
                <p className="text-base text-charcoal/65 leading-relaxed">
                  We confirm the receiving facility&apos;s approval is current rather than assumed, set up segregation at the point of generation so it survives a shift change, and hold the records so they exist when somebody asks for them.
                </p>
                <p className="text-base text-charcoal/65 leading-relaxed">
                  This runs alongside the rest of the account. Aviation sites generate ordinary waste in volume too, and the audit and billing work applies there exactly as it does anywhere else.
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
            Who carries the risk.
          </h2>
          <div className="max-w-3xl space-y-4">
            <p className="text-base text-charcoal/65 leading-relaxed">
              Waste regulation generally puts responsibility on the generator, and international catering waste is a strict version of that principle. Contracting the work out moves the labor but not the liability. If a load cannot be traced to an approved facility, the question gets asked of the airline, the caterer, or the port operator, not of the truck.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              That is the practical reason to care how this is run rather than just what it costs. The cost of doing it properly is modest. The cost of not being able to show you did is not.
            </p>
            <p className="text-base text-charcoal/65 leading-relaxed">
              <Link
                href="/industries#aviation"
                className="underline underline-offset-2 decoration-charcoal/30 hover:decoration-charcoal hover:text-charcoal transition-colors"
              >
                Aviation and transit sites generate ordinary waste in volume too.
              </Link>
            </p>
          </div>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
              Tell us what you need.
            </h2>
            <p className="text-base text-charcoal/65 leading-relaxed mb-8">
              We will follow up within one business day.
            </p>
            <ProjectForm defaultSelection="International catering waste" page="/services/international-waste" />
            <p className="mt-6 text-sm text-charcoal/60">
              Or call us directly:{" "}
              <a
                href={company.phoneHref}
                className="underline underline-offset-2 hover:text-charcoal transition-colors"
              >
                {company.phone}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
