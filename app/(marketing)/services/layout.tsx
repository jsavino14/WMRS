import { SectionTabStrip } from "@/components/SectionTabStrip";
import { servicePages } from "@/content/site";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="hidden md:block">
        <SectionTabStrip pages={servicePages} basePath="/services" />
      </div>
      {children}
    </>
  );
}
