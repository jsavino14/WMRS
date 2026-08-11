import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { meta, home, faq, caseStudies, clientLogos, company } from "@/content/site";

export const metadata: Metadata = {
  title: meta.home.title,
  description: meta.home.description,
  openGraph: {
    title: meta.home.title,
    description: meta.home.description,
  },
};

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden min-h-[560px] lg:min-h-[580px] flex items-center">

        {/* Photo — full bleed behind everything, anchored right */}
        <div className="absolute top-0 bottom-0 w-[85%] lg:w-[65%]" style={{ right: "-5%" }}>
          <Image
            src="/hero.png"
            alt="Industrial roll-off container"
            fill
            className="object-cover object-left"
            priority
            sizes="65vw"
          />
        </div>

        {/*
          Legibility gradient — mobile/tablet only.
          The photo's own white fade handles desktop.
          This ensures the text zone is always on white regardless of photo position.
        */}
        <div
          className="lg:hidden absolute inset-0 z-[5] pointer-events-none"
          style={{ background: "linear-gradient(to right, white 48%, rgba(255,255,255,0) 80%)" }}
        />

        {/* Text */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-[320px] sm:max-w-[420px] lg:max-w-[680px]">
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
              {home.hero.h1[0]}
              <br />
              {home.hero.h1[1]}
            </h1>
            <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed mb-8">
              {home.hero.sub}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={home.hero.ctaPrimaryHref}
                className="inline-block bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors text-center"
              >
                {home.hero.ctaPrimary}
              </Link>
              <a
                href={home.hero.ctaSecondaryHref}
                className="inline-block border border-charcoal/30 text-charcoal text-sm font-semibold px-8 py-4 hover:border-charcoal transition-colors text-center"
              >
                {home.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </div>

      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: stacked, left-aligned */}
          <div className="flex flex-col sm:hidden gap-0 py-1">
            {home.trustBar.map((item, i) => (
              <span key={i} className="text-xs text-white/55 font-medium py-1.5">
                {item}
              </span>
            ))}
          </div>
          {/* sm+: single row with dividers */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-x-0 gap-y-0">
            {home.trustBar.map((item, i) => (
              <div key={i} className="flex items-center">
                <span className="text-xs text-white/55 font-medium py-1 px-4 whitespace-nowrap">
                  {item}
                </span>
                {i < home.trustBar.length - 1 && (
                  <span className="text-white/20 text-xs">·</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Problem ──────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">The Problem</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-10 max-w-xl">
            {home.problem.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {home.problem.paragraphs.map((para, i) => (
              <p key={i} className="text-base text-charcoal/65 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">How It Works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-14 max-w-xl">
            Four steps. Zero upfront cost.
          </h2>
          <div className="space-y-0 divide-y divide-charcoal/8">
            {home.steps.map((step) => (
              <div
                key={step.number}
                className="grid grid-cols-[64px_1fr] gap-6 py-8"
              >
                <div className="text-4xl font-black text-charcoal/10 leading-none pt-1">
                  {step.number}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {step.title}
                  </h3>
                  <p className="text-base text-charcoal/60 leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/how-it-works"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Full process detail →
            </Link>
          </div>
        </div>
      </section>

      {/* ── What It Costs ────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label text-accent mb-6">{home.cost.label}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-6 max-w-xl leading-tight">
            {home.cost.h2}
          </h2>
          <div className="w-12 h-px bg-accent mb-8" />
          <p className="text-lg text-white/65 leading-relaxed max-w-2xl">
            {home.cost.body}
          </p>
        </div>
      </section>

      {/* ── What We Find ─────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">{home.whatWeFind.label}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            {home.whatWeFind.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 divide-y divide-charcoal/8 sm:divide-y-0">
            {home.whatWeFind.items.map((item, i) => (
              <div
                key={i}
                className="flex gap-4 py-5 sm:py-0 sm:pb-8 sm:border-b sm:border-charcoal/8 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="flex-shrink-0 mt-1 w-1.5 h-1.5 rounded-full bg-accent" />
                <p className="text-base text-charcoal/75 leading-snug">{item}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/what-we-find"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Detail on each overcharge →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Proof / Case Studies ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">{home.proof.label}</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            {home.proof.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, i) => (
              <div key={i} className="border border-charcoal/10 p-6 space-y-5">
                <div>
                  <p className="label text-accent/80 mb-1">{cs.industry}</p>
                  <p className="text-xs text-charcoal/40">
                    {cs.state} · {cs.locationCount} location{cs.locationCount === "1" ? "" : "s"}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    The situation
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.situation}</p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                    What we found
                  </p>
                  <p className="text-sm text-charcoal/70 leading-relaxed">{cs.found}</p>
                </div>
                <div className="border-t border-charcoal/8 pt-4">
                  <p className="text-2xl font-black text-charcoal">{cs.result.saved}</p>
                  <p className="text-sm text-charcoal/50">{cs.result.reduction} reduction</p>
                </div>
                <blockquote className="border-l-2 border-accent pl-4">
                  <p className="text-sm text-charcoal/65 italic leading-relaxed">{cs.quote}</p>
                  <footer className="mt-2 text-xs text-charcoal/40 font-medium">
                    — {cs.quoteName}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Client logos (hidden when empty) ────────────────────────────── */}
      {clientLogos.length > 0 && (
        <section className="bg-offwhite py-14">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="label text-center mb-8">Clients</p>
            <div className="flex flex-wrap items-center justify-center gap-10">
              {clientLogos.map((logo) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={logo.name}
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto opacity-50 grayscale"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="label mb-6">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            Common questions.
          </h2>
          <div className="divide-y divide-charcoal/8">
            {faq.map((item, i) => (
              <div key={i} className="py-7 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12">
                <p className="text-base font-semibold text-charcoal">{item.q}</p>
                <p className="text-base text-charcoal/60 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-4 max-w-md">
            {home.closingCta.h2}
          </h2>
          <p className="text-lg text-charcoal/60 mb-10 max-w-xl">
            {home.closingCta.body}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={home.closingCta.ctaHref}
              className="inline-block bg-charcoal text-white text-sm font-semibold px-8 py-4 hover:bg-charcoal/85 transition-colors text-center"
            >
              {home.closingCta.cta}
            </Link>
            <a
              href={company.phoneHref}
              className="inline-block border border-charcoal/30 text-charcoal text-sm font-semibold px-8 py-4 hover:border-charcoal transition-colors text-center"
            >
              Call {company.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
