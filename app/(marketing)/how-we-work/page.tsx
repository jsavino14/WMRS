import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ProcessDiagram } from "@/components/ProcessDiagram";
import { meta, howItWorksPage, home, faq, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.howItWorks.title,
  description: meta.howItWorks.description,
  openGraph: {
    title: meta.howItWorks.title,
    description: meta.howItWorks.description,
  },
};

export default function HowItWorksPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <Container className="py-20 lg:py-28">
          <div className="lg:flex lg:items-center lg:gap-14">
            <div className="lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
                {howItWorksPage.hero.h1[0]}<br />
                {howItWorksPage.hero.h1[1]}<br />
                {howItWorksPage.hero.h1[2]}<br />
                {howItWorksPage.hero.h1[3]}
              </h1>
              <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed">
                {howItWorksPage.hero.sub}
              </p>
            </div>
            <div className="mt-14 lg:mt-0 lg:w-1/2">
              <ProcessDiagram steps={howItWorksPage.steps} />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Steps ────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 lg:py-24">
        <Container>
          <div className="max-w-3xl">
            {howItWorksPage.steps.map((step, i) => (
              <div
                key={step.number}
                className={`grid grid-cols-[48px_1fr] gap-8 py-14 border-b border-charcoal/8 ${i === 0 ? "border-t" : ""}`}
              >
                <div className="text-4xl font-black text-charcoal/10 leading-none pt-1">
                  {step.number}
                </div>
                <div>
                  <h2 className="text-2xl font-black text-charcoal mb-6">
                    {step.title}
                  </h2>
                  <div className="space-y-4">
                    {step.body.map((para, j) => (
                      <p key={j} className="text-base text-charcoal/65 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── What It Costs ────────────────────────────────────────────────── */}
      <section className="relative bg-charcoal overflow-hidden">
        <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
          <Image
            src="/compacter.png"
            alt="Commercial compactor unit"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>
        <Container className="relative py-20 lg:py-28">
          <div className="lg:w-1/2 lg:max-w-[calc(50%-2rem)] lg:pr-16">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 max-w-xl leading-tight">
              You pay us out of your savings. Never out of your budget.
            </h2>
            <div className="w-12 h-px bg-accent mb-8" />
            <p className="text-lg text-white/65 leading-relaxed">
              {home.cost.sharedSavings.body}
            </p>
          </div>
        </Container>
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/compacter.png"
            alt="Commercial compactor unit"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <p className="label mb-6">FAQ</p>
          <h2 className="text-3xl font-black text-charcoal mb-12 max-w-xl">
            Common questions.
          </h2>
          <div className="divide-y divide-charcoal/8 max-w-4xl">
            {faq.map((item, i) => (
              <div
                key={i}
                className="py-7 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12"
              >
                <p className="text-base font-semibold text-charcoal">{item.q}</p>
                <p className="text-base text-charcoal/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/faq"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              See all questions →
            </Link>
          </div>
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-16 border-t border-charcoal/8">
        <Container className="flex flex-col sm:flex-row gap-4">
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
        </Container>
      </section>
    </>
  );
}
