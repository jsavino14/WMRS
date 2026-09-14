import { IndustryTabStrip } from "@/components/IndustryTabStrip";

export default function IndustrySlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IndustryTabStrip />
      {children}
    </>
  );
}
