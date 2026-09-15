import Image from "next/image";
import { Container } from "@/components/Container";

interface ServiceHeroImage {
  src: string;
  alt: string;
}

interface ServiceHeroProps {
  eyebrow: string;
  headline: string;
  intro: string;
  /** Small-caps dot-separated list below the intro. Omit entirely when not ready — leaves no gap. */
  items?: string[];
  /** Pass null until the real photo is supplied. Renders a clearly-marked placeholder. */
  image: ServiceHeroImage | null;
}

export function ServiceHero({ eyebrow, headline, intro, items, image }: ServiceHeroProps) {
  const hasItems = Array.isArray(items) && items.length > 0;

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Desktop: image fills right half absolutely */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-1/2">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            sizes="50vw"
            priority
          />
        ) : (
          <div className="w-full h-full bg-[#d4d4d4] flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#999] select-none">
              Photo · To be supplied
            </span>
          </div>
        )}
      </div>

      {/* Mobile: image stacked above content */}
      <div className="lg:hidden relative h-[250px]">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="w-full h-full bg-[#d4d4d4] flex items-center justify-center">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#999] select-none">
              Photo · To be supplied
            </span>
          </div>
        )}
      </div>

      <Container className="relative pt-10 pb-16 lg:py-28">
        <div className="lg:w-1/2 lg:max-w-[calc(50%-2rem)] lg:pr-16">
          <p className="label mb-4">{eyebrow}</p>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black text-charcoal leading-[1.08] mb-6">
            {headline}
          </h1>
          <p className={`text-base lg:text-lg text-charcoal/65 leading-relaxed${hasItems ? " mb-6" : ""}`}>
            {intro}
          </p>
          {hasItems && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {items!.map((item, i) => (
                <span key={item} className="flex items-center gap-x-2">
                  <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-charcoal/70">
                    {item}
                  </span>
                  {i < items!.length - 1 && (
                    <span className="text-charcoal/40 select-none leading-none">·</span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
