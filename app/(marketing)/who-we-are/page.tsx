import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/Container";
import { meta, about, computeSiteCount } from "@/content/site";
import { ProjectForm } from "@/components/ProjectForm";
import { FormSidebar } from "@/components/FormSidebar";

export const metadata: Metadata = {
  title: meta.about.title,
  description: meta.about.description,
  openGraph: {
    title: meta.about.title,
    description: meta.about.description,
      images: ["/og.png"],
  },
};

export default function AboutPage() {
  return (
    <>
      {/* ── Intro: copy left / image right (full height) ─────────────────── */}
      <section className="relative bg-white overflow-hidden">

        {/* Desktop image: absolute, full-height, flush to right viewport edge */}
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-[40%]">
          <Image
            src="/about.png"
            alt="Waste invoices spread on a surface"
            fill
            className="object-cover object-center"
            sizes="40vw"
            priority
          />
        </div>

        {/* Mobile: image above content, shallow band */}
        <div className="lg:hidden relative h-[250px]">
          <Image
            src="/about.png"
            alt="Waste invoices spread on a surface"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Left column */}
        <Container className="relative pt-10 pb-16 lg:py-28">
          <div className="lg:w-[60%] lg:pr-16">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {about.hero.h1}
            </h1>
            <p className="text-base text-charcoal/70 leading-relaxed mb-8">
              {about.hero.sub}
            </p>
            <div className="space-y-4">
              {about.sections[0].body.map((para, i) => (
                <p key={i} className="text-base text-charcoal/70 leading-relaxed">
                  {para}
                </p>
              ))}
              <p className="text-base text-charcoal/70 leading-relaxed">
                Since then we&apos;ve managed waste programs across {computeSiteCount().toLocaleString()}+ sites. Most of that work came from someone who&apos;d worked with us before.
              </p>
            </div>
          </div>
        </Container>

      </section>

      {/* ── Two-column band ───────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
            {about.sections.slice(1).map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-black text-charcoal mb-4">
                  {section.heading}
                </h2>
                {section.body.map((para, j) => (
                  <p key={j} className="text-base text-charcoal/70 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Start with WMRS ──────────────────────────────────────────────── */}
      <section className="bg-white pt-10 pb-16 lg:pt-14 lg:pb-24">
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
                <ProjectForm defaultSelection="" page="/who-we-are" subjectPrefix="Start with WMRS" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
