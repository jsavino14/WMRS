import { NavHoverProvider } from "@/components/NavHoverContext";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavHoverProvider>
      <Nav />
      <main>{children}</main>
      <Footer />
    </NavHoverProvider>
  );
}
