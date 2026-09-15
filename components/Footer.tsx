import Link from "next/link";
import { Logo } from "./Logo";
import { Container } from "./Container";
import { company, companyPages, servicePages, industries } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  const industryFirst = industries.slice(0, 6);
  const industrySecond = industries.slice(6);

  return (
    <footer className="bg-charcoal text-white/70">
      <Container className="py-12 lg:py-16">
        {/* Main grid: brand + 4 link columns (Industries gets 2 sub-cols internally) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1.6fr_1fr_1fr] gap-10">

          {/* Brand — spans full width on md */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <div className="text-white">
              <Logo align="start" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {company.legalName}
            </p>
            <p className="text-sm text-white/40">
              Independent waste cost consultancy.
              <br />
              Not affiliated with any hauler.
            </p>
            <p className="text-sm text-white/35 leading-relaxed">
              {company.geography}
            </p>
          </div>

          {/* Services column */}
          <div>
            <p className="label text-white/40 mb-4">Services</p>
            <nav className="flex flex-col gap-2">
              {servicePages.map((p) => (
                <Link
                  key={p.slug}
                  href={`/services/${p.slug}`}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {p.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Industries column — two sub-columns to accommodate 12 entries */}
          <div>
            <p className="label text-white/40 mb-4">Industries</p>
            <div className="grid grid-cols-2 gap-x-4">
              <nav className="flex flex-col gap-2">
                {industryFirst.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/industries#${ind.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </nav>
              <nav className="flex flex-col gap-2">
                {industrySecond.map((ind) => (
                  <Link
                    key={ind.slug}
                    href={`/industries#${ind.slug}`}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {ind.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* Company column */}
          <div>
            <p className="label text-white/40 mb-4">Company</p>
            <nav className="flex flex-col gap-2">
              {companyPages.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact column */}
          <div>
            <p className="label text-white/40 mb-4">Contact</p>
            <div className="space-y-2">
              <a
                href={company.phoneHref}
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                {company.phone}
              </a>
              <a
                href={`mailto:${company.email}`}
                className="block text-sm text-white/60 hover:text-white transition-colors"
              >
                {company.email}
              </a>
            </div>
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/contact"
                className="inline-block bg-white text-charcoal text-sm font-semibold px-4 py-2.5 hover:bg-white/90 transition-colors text-center"
              >
                Send us one invoice
              </Link>
              <Link
                href="/services/temp-containers"
                className="inline-block border border-white/25 text-white text-sm font-semibold px-4 py-2.5 hover:border-white/50 transition-colors text-center"
              >
                Request a container
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-xs text-white/30">
            &copy; {year} {company.legalName}. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            Independent since 2008
          </p>
        </div>
      </Container>
    </footer>
  );
}
