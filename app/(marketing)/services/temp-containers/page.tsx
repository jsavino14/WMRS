import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContainerForm } from "@/components/ContainerForm";
import { meta, tempContainerForm } from "@/content/site";

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
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
            {tempContainerForm.hero.h1}
          </h1>
          <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed max-w-2xl">
            {tempContainerForm.hero.sub}
          </p>
        </Container>
      </section>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <ContainerForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
