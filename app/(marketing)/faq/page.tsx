import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { meta, faq } from "@/content/site";
import { ProjectForm } from "@/components/ProjectForm";
import { FormSidebar } from "@/components/FormSidebar";

export const metadata: Metadata = {
  title: meta.faq.title,
  description: meta.faq.description,
  openGraph: {
    title: meta.faq.title,
    description: meta.faq.description,
      images: ["/og.png"],
  },
};

export default function FaqPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>

          <h1 className="text-4xl sm:text-5xl font-black text-charcoal mb-4 max-w-xl leading-tight">
            Common questions.
          </h1>
          <p className="text-base lg:text-lg text-charcoal/55 leading-relaxed max-w-xl">
            How the audit works, what it costs, what happens after, and what we
            need from you.
          </p>
        </Container>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <div className="divide-y divide-charcoal/8 max-w-4xl">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-8 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12"
              >
                <p className="text-base font-semibold text-charcoal">{item.q}</p>
                <p className="text-base text-charcoal/60 leading-relaxed">{item.a}</p>
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
                <ProjectForm defaultSelection="" page="/faq" subjectPrefix="Start with WMRS" />
              </div>
            </div>
            <div className="hidden lg:block"><FormSidebar /></div>
          </div>
        </Container>
      </section>
    </>
  );
}
