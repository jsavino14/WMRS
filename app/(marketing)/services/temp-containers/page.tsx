import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { DeliveryForm } from "@/components/DeliveryForm";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, servicePages } from "@/content/site";

const page = servicePages.find((p) => p.slug === "temp-containers")!;

export const metadata: Metadata = {
  title: meta.tempContainers.title,
  description: meta.tempContainers.description,
  openGraph: {
    title: meta.tempContainers.title,
    description: meta.tempContainers.description,
      images: ["/og.png"],
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
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
                Request a container.
              </h2>
              <p className="text-base text-charcoal/65 leading-relaxed">
                A person reads every one of these, not a queue.
              </p>
              <div className="mt-6 lg:hidden"><FormSidebar /></div>
              <div className="mt-6 lg:mt-8">
                <DeliveryForm defaultSelection="Temporary container" page="/services/temp-containers" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </div>
  );
}
