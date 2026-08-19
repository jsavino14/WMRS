import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { meta, home, faq, caseStudies, company } from "@/content/site";
import { TrustBar } from "@/components/TrustBar";

export const metadata: Metadata = {
  title: meta.home.title,
  description: meta.home.description,
  openGraph: {
    title: meta.home.title,
    description: meta.home.description,
  },
};

// Opacity token — adjust here to test: 0.03 | 0.035 | 0.04 | 0.05
const MARK_OPACITY = 0.035;

const OVERCHARGE_CARDS = [
  { icon: "/icons/wrong-container-size.svg",   iconH: 56, title: "Wrong container size",    body: "Containers sized for a business you no longer are." },
  { icon: "/icons/too-many-pickups.svg",        iconH: 52, title: "Too many pickups",         body: "Pickups scheduled more often than you generate waste." },
  { icon: "/icons/hidden-surcharges.svg",       iconH: 72, title: "Hidden surcharges",        body: "Fuel and environmental surcharges billed as a percentage of the total." },
  { icon: "/icons/closed-location.svg",         iconH: 56, title: "Closed locations billed",  body: "Billing for closed locations and containers already hauled away." },
  { icon: "/icons/auto-renewing-contracts.svg", iconH: 52, title: "Auto-renewing contracts",  body: "Auto-renewing contracts with annual escalators nobody agreed to." },
  { icon: "/icons/recyclables-as-trash.svg",    iconH: 44, title: "Recyclables as trash",     body: "Recyclables going out as trash, at trash prices." },
];

// Interior grid borders per item (3-col desktop / 2-col tablet / 1-col mobile)
const ITEM_BORDERS = [
  "border-b border-charcoal/8 sm:border-r",
  "border-b border-charcoal/8 lg:border-r",
  "border-b border-charcoal/8 sm:border-r lg:border-r-0",
  "border-b border-charcoal/8 lg:border-r lg:border-b-0",
  "border-b border-charcoal/8 sm:border-b-0 sm:border-r",
  "",
];

export default function HomePage() {
  return (
    <>
      {/* ── Fixed background watermark (desktop ≥768px only) ──────────────── */}
      <div
        aria-hidden="true"
        className="hidden md:block fixed top-1/2 -translate-y-1/2 pointer-events-none select-none"
        style={{
          right: "-120px",
          width: "clamp(416px, 34vw, 560px)",
          opacity: MARK_OPACITY,
          zIndex: 0,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/wmrs-mark.svg" alt="" style={{ width: "100%", height: "auto", display: "block" }} />
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative z-[1] bg-white overflow-hidden min-h-[560px] lg:min-h-[580px] flex items-center">

        {/* Photo - full bleed behind everything, anchored right */}
        <div className="absolute top-0 bottom-0 w-[95%] sm:w-[85%] lg:w-[65%] right-[-6%] sm:right-0 lg:right-[-5%]">
          <Image
            src="/hero.png"
            alt="Industrial roll-off container"
            fill
            className="object-cover object-left-top"
            priority
            sizes="65vw"
          />
        </div>

        {/* Legibility gradient - mobile/tablet only */}
        <div
          className="lg:hidden absolute inset-0 z-[5] pointer-events-none"
          style={{ background: "linear-gradient(to right, white 48%, rgba(255,255,255,0) 80%)" }}
        />

        {/* Text */}
        <div className="relative z-10 w-full pt-10 pb-14 lg:py-20">
          <Container>
            <div className="max-w-[360px] lg:max-w-[680px]">
              <h1 className="text-[2rem] sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
                {home.hero.h1[0]}
                <br />
                {home.hero.h1[1]}
              </h1>
              <p className="text-base lg:text-lg text-charcoal/65 leading-relaxed mb-8 max-w-[245px] sm:max-w-none">
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
          </Container>
        </div>

      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <TrustBar />

      {/* ── The Problem ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-10 max-w-xl">
            {home.problem.h2}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {home.problem.paragraphs.map((para, i) => (
              <p key={i} className="text-base text-charcoal/65 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Person Section ───────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left: text */}
            <div className="lg:w-[44%] lg:flex-shrink-0">
              <div className="w-8 h-px bg-accent mb-8" />
              <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-6">
                {home.personSection.h2}
              </h2>
              <p className="text-lg text-charcoal/60 leading-relaxed">
                {home.personSection.body}
              </p>
            </div>

            {/* Right: oversized phone number */}
            <div className="flex-1 flex flex-col items-start lg:items-center">
              <a
                href={company.phoneHref}
                className="text-[48px] sm:text-[52px] lg:text-[60px] xl:text-[72px] font-thin text-charcoal/[0.40] leading-none tabular-nums hover:text-charcoal/60 transition-colors"
              >
                {company.phone}
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-charcoal/35 mt-3">
                They&apos;ll already know your account.
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-14 max-w-xl">
            Four steps. Zero upfront cost.
          </h2>
          <div className="divide-y divide-charcoal/8 max-w-3xl">
            {home.steps.map((step) => (
              <div key={step.number} className="grid grid-cols-[48px_1fr] gap-8 py-8">
                <div className="text-3xl font-black text-charcoal/10 leading-none pt-1">
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
          <div className="mt-10 max-w-3xl">
            <Link
              href="/how-we-work"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Full process detail →
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Cost / 50-50 ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="lg:flex lg:items-center lg:gap-16">

            {/* Left: text */}
            <div className="lg:w-1/2">
              <div className="w-8 h-px bg-accent mb-8" />
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-8 leading-tight max-w-xl">
                {home.cost.h2}
              </h2>
              <p className="text-base text-white/55 leading-relaxed">
                {home.cost.body}
              </p>
            </div>

            {/* Right: 50/50 numerals */}
            <div className="mt-14 lg:mt-0 lg:w-1/2 flex justify-center lg:justify-end items-start">
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <span className="text-[100px] lg:text-[120px] font-thin text-white/[0.18] leading-none tabular-nums select-none">50</span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 mt-2 text-center">You keep 50%</p>
                </div>
                <span className="text-[70px] lg:text-[85px] font-thin text-white/[0.18] leading-none px-3 select-none flex-shrink-0">/</span>
                <div className="flex flex-col items-center">
                  <span className="text-[100px] lg:text-[120px] font-thin text-white/[0.18] leading-none tabular-nums select-none">50</span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35 mt-2 text-center">WMRS keeps 50%</p>
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>

      {/* ── Site Management ───────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden z-[1]">

        {/* Desktop: image bleeds to viewport right edge, fills full height */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
          <Image
            src="/dumpsters-alt.jpg"
            alt="Four commercial dumpsters against a concrete wall"
            fill
            className="object-cover object-center"
            sizes="50vw"
          />
        </div>

        {/* Copy: left half on desktop, full width on mobile */}
        <Container className="relative">
          <div className="lg:w-1/2 lg:pr-16 py-20 lg:py-28">
            <div className="w-8 h-px bg-accent mb-8" />
            <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-8 max-w-xl">
              {home.siteManagementSection.h2}
            </h2>
            <div className="space-y-5 mb-10">
              {home.siteManagementSection.paragraphs.map((para, i) => (
                <p key={i} className="text-base text-charcoal/65 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
            <Link
              href={home.siteManagementSection.linkHref}
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              {home.siteManagementSection.link}
            </Link>
          </div>
        </Container>

        {/* Mobile: image below copy at 4:3 */}
        <div className="lg:hidden relative aspect-[4/3]">
          <Image
            src="/dumpsters-alt.jpg"
            alt="Four commercial dumpsters against a concrete wall"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

      </section>

      {/* ── What We Find ─────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            {home.whatWeFind.h2}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {OVERCHARGE_CARDS.map((card, i) => (
              <div key={i} className={`p-8 ${ITEM_BORDERS[i]}`}>
                <div className="h-20 flex items-start mb-6">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.icon}
                    alt=""
                    aria-hidden="true"
                    style={{ height: card.iconH, width: "auto", display: "block" }}
                  />
                </div>
                <h3 className="text-base font-bold text-charcoal mb-2">{card.title}</h3>
                <p className="text-sm text-charcoal/60 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/audit"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Detail on each overcharge →
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Proof / Case Studies ─────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
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
                    - {cs.quoteName}
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-12 max-w-xl">
            Common questions.
          </h2>
          <div className="divide-y divide-charcoal/8 max-w-4xl">
            {faq.map((item, i) => (
              <div key={i} className="py-7 grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 md:gap-12">
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

      {/* ── Closing CTA ──────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
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
        </Container>
      </section>
    </>
  );
}
