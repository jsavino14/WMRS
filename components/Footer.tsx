import Link from "next/link";
import { Logo } from "./Logo";
import { company, navLinks } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-charcoal text-white/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="text-white">
              <Logo withDescriptor align="start" />
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              {company.legalName}
            </p>
            <p className="text-sm text-white/40">
              Independent waste cost consultancy.
              <br />
              Not affiliated with any hauler.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="label text-white/40 mb-4">Pages</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
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

          {/* Contact */}
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
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block border border-white/20 text-white text-sm font-semibold px-4 py-2 hover:border-white/50 transition-colors"
              >
                Send us one invoice
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
      </div>
    </footer>
  );
}
