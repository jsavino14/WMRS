import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { ContactTabs } from "@/components/ContactTabs";
import { FormSidebar } from "@/components/FormSidebar";
import { meta, home, faq, company } from "@/content/site";
import { TrustBar } from "@/components/TrustBar";
import { OverchargeCards } from "@/components/OverchargeCards";
import { HomeSteps } from "@/components/HomeSteps";

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

      {/* ── Nobody's job / What We Find (merged) ─────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 relative z-[1]">
        <Container>

          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-3">
            {home.problem.h2}
          </h2>
          <p className="text-base text-charcoal/65 leading-relaxed mb-12">
            Here&apos;s what was in them:
          </p>
          <OverchargeCards />
          <div className="mt-10">
            <Link
              href="/what-we-find"
              className="text-sm font-semibold text-charcoal/60 hover:text-charcoal transition-colors underline-offset-4 hover:underline"
            >
              Detail on each overcharge →
            </Link>
          </div>
        </Container>
      </section>

      {/* ── Site Management ───────────────────────────────────────────────── */}
      <section className="relative bg-offwhite overflow-hidden z-[1]">

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

      {/* ── Person Section ───────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-center gap-12 lg:gap-16">

            {/* Left: text */}
            <div className="lg:w-[44%] lg:flex-shrink-0">
    
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
                className="text-[48px] sm:text-[52px] lg:text-[60px] xl:text-[72px] font-thin text-charcoal/[0.40] leading-none tabular-nums tracking-[-0.07em] hover:text-charcoal/60 transition-colors"
              >
                {company.phone}
              </a>
              <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-charcoal/35 mt-3">
                <span className="inline-block">A REAL NUMBER.</span>{" "}
                <span className="inline-block">SOMEONE YOU&apos;LL GET TO KNOW BY NAME.</span>
              </p>
            </div>

          </div>
        </Container>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28">
        <Container>
          <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-14">
            Four steps. Zero upfront cost.
          </h2>
          <HomeSteps />
        </Container>
      </section>

      {/* ── Cost / 50-50 ─────────────────────────────────────────────────── */}
      <section className="bg-charcoal py-20 lg:py-28 relative z-[1]">
        <Container>
          <div className="lg:flex lg:items-center lg:gap-16">

            {/* Left: text */}
            <div className="lg:w-1/2">
    
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



      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-20 lg:py-28 relative z-[1]">
        <Container>

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

      {/* ── Closing form ─────────────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28 border-t border-charcoal/8">
        <Container>
          <div className="lg:grid lg:grid-cols-[2fr_1fr] lg:gap-12 lg:items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black text-charcoal mb-3 max-w-md">
                Tell us what you need.
              </h2>
              <p className="text-lg text-charcoal/60 mb-0 max-w-xl">
                A bill to audit, a container to drop, or a project to scope.
              </p>
              <div className="mt-6 lg:hidden">
                <FormSidebar />
              </div>
              <div className="mt-6 lg:mt-10">
                <ContactTabs page="/" />
              </div>
            </div>
            <div className="hidden lg:block mt-1">
              <FormSidebar />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
