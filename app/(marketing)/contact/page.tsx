import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { meta, contact } from "@/content/site";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  openGraph: {
    title: meta.contact.title,
    description: meta.contact.description,
  },
};

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-16 lg:pt-28 lg:pb-20">
        <Container>
          <div className="w-8 h-px bg-accent mb-8" />
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-6 max-w-xl">
            {contact.hero.h1}
          </h1>
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl">
            {contact.hero.sub}
          </p>
        </Container>
      </section>

      {/* ── Form + sidebar ────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-12 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-16">
            {/* Form */}
            <div>
              <ContactForm />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div>
                <p className="label mb-4">{contact.directContact.heading}</p>
                <div className="space-y-3">
                  <a
                    href={contact.directContact.phoneHref}
                    className="flex items-center gap-3 text-base font-semibold text-charcoal hover:text-accent transition-colors group"
                  >
                    <span className="text-accent">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .82h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {contact.directContact.phone}
                  </a>
                  <a
                    href={`mailto:${contact.directContact.email}`}
                    className="flex items-center gap-3 text-base font-semibold text-charcoal hover:text-accent transition-colors"
                  >
                    <span className="text-accent">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="22,6 12,13 2,6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                    {contact.directContact.email}
                  </a>
                </div>
              </div>

              <div className="border-t border-charcoal/10 pt-8 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/40">
                  What happens next
                </p>
                <p className="text-sm text-charcoal/60 leading-relaxed">
                  We review your invoice and follow up within one business day. No commitment, no contract. We'll tell you what we find.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
