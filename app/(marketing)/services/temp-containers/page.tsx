import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ServiceHero } from "@/components/ServiceHero";
import { DeliveryForm } from "@/components/DeliveryForm";
import { meta, company, servicePages } from "@/content/site";

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
        eyebrow={page.label}
        headline="Tell us where it's going and when."
        intro="Roll-offs and temporary containers for cleanouts, renovations, and job sites. Send us the address and the date and we will come back within one business day with a price. If you run more than one site, that price gets set against all of them rather than against whatever the local vendor quotes that week."
        items={["Roll-Off Containers", "Cleanouts", "Renovations", "Job Sites", "Events", "Scheduled Swap Outs"]}
        image={{ src: "/temp-containers.jpg", alt: "A roll-off container on a gravel construction site" }}
      />

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F7F8F7] pt-10 pb-16 lg:pt-14 lg:pb-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-black text-charcoal mb-2">
              Request a container.
            </h2>
            <p className="text-base text-charcoal/65 leading-relaxed mb-8">
              We will follow up within one business day.
            </p>
            <DeliveryForm defaultSelection="Temporary container" page="/services/temp-containers" />
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
