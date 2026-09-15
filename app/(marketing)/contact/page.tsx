import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { ContactTabs } from "@/components/ContactTabs";
import { DirectContact } from "@/components/DirectContact";
import { meta } from "@/content/site";

export const metadata: Metadata = {
  title: meta.contact.title,
  description: meta.contact.description,
  openGraph: {
    title: meta.contact.title,
    description: meta.contact.description,
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ form?: string }>;
}) {
  const { form } = await searchParams;

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white pt-20 pb-6 lg:pt-28 lg:pb-10">
        <Container>
          <div className="lg:flex lg:items-start lg:gap-16">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-charcoal leading-[1.08] mb-4 max-w-xl">
                Tell us what you need.
              </h1>
              <p className="text-lg text-charcoal/60 leading-relaxed max-w-xl">
                A bill to audit, a container to drop, or a project to scope.
              </p>
              <div className="mt-6 lg:hidden">
                <DirectContact />
              </div>
            </div>
            <div className="hidden lg:block flex-shrink-0 mt-1">
              <DirectContact />
            </div>
          </div>
        </Container>
      </section>

      {/* ── Tabs + form ───────────────────────────────────────────────────── */}
      <section className="bg-offwhite py-10 lg:py-14">
        <Container>
          <div className="max-w-2xl">
            <ContactTabs
              initialTab={form}
              page="/contact"
              updateUrl
            />
          </div>
        </Container>
      </section>
    </>
  );
}
