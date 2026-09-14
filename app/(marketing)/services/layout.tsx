import { SectionTabStrip } from "@/components/SectionTabStrip";
import { servicePages } from "@/content/site";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SectionTabStrip pages={servicePages} basePath="/services" />
      {children}
    </>
  );
}
