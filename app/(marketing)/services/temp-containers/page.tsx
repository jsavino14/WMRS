import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { DeliveryForm } from "@/components/DeliveryForm";
import { DirectContact } from "@/components/DirectContact";
import { meta, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "temp-containers")!;

export const metadata: Metadata = {
  title: meta.tempContainers.title,
  description: meta.tempContainers.description,
  openGraph: {
    title: meta.tempContainers.title,
    description: meta.tempContainers.description,
  },
};

export default function TempContainersPage() {
  return (
    <div className="vt-section-content">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <ServiceHero
        eyebrow={page.fullName}
        headline="Tell us where it's going and when."
        intro="Roll-offs and temporary containers for cleanouts, renovations, and job sites. Send us the address and the date and we'll come back with a price. If you run more than one site, that price gets set against all of them rather than against whatever the local vendor quotes that week."
        items={["Roll-Off Containers", "Cleanouts", "Renovations", "Job Sites", "Events", "Scheduled Swap Outs"]}
        image={{ src: "/temp-containers.jpg", alt: "A roll-off container on a gravel construction site" }}
      />

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16">
            <div className="max-w-2xl">
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Request a container.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><DirectContact /></div>
              <div className="mt-6 lg:mt-8">
                <DeliveryForm defaultSelection="Temporary container" page="/services/temp-containers" />
              </div>
            </div>
            <div className="hidden lg:block flex-shrink-0"><DirectContact /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
