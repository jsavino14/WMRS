import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactTabs } from "@/components/ContactTabs";
import { meta, contact } from "@/content/site";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  openGraph: {
    title: meta.contact.title,
    description: meta.contact.description,
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { form?: string };
}) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-10 lg:pt-28 lg:pb-14">
        <Container>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-4 max-w-xl">
            Tell us what you need.
          </h1>
          <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl">
            Three ways in. Pick whichever fits.
          </p>
        </Container>
      </section>

      {/* ── Tabs + form ───────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-12 lg:py-20">
        <Container>
          <div className="max-w-2xl">
            <ContactTabs
              initialTab={searchParams.form}
              page="/contact"
              updateUrl
            />
          </div>
        </Container>
      </section>

      {/* ── Direct contact ────────────────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-16 border-t border-charcoal/8">
        <Container>
          <p className="label mb-4">{contact.directContact.heading}</p>
          <div className="flex flex-col sm:flex-row gap-6">
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
          <div className="mt-6 border-t border-charcoal/10 pt-6">
            <p className="text-sm text-charcoal/60 leading-relaxed max-w-lg">
              A person reads every one of these, not a queue. No commitment, no contract. We&apos;ll tell you what we find.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
