import Link from "next/link";
import { servicesGrid } from "@/content/site";

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
      {servicesGrid.map((item) => (
        <Link key={item.slug} href={item.href} className="group block">
          {/* Icon + name row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="sg-icon shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/services/${item.icon}.svg`}
                alt=""
                aria-hidden="true"
                style={{ height: 36, width: "auto", display: "block" }}
              />
            </div>
            <div className="sg-text min-w-0">
              <h3 className="sg-name text-base font-black text-charcoal leading-snug group-hover:text-accent transition-colors">
                <span className="block">{item.gridLines[0]}</span>
                <span className="block">{item.gridLines[1]}</span>
              </h3>
            </div>
          </div>
          {/* Description — full cell width, back at left edge */}
          <p className="sg-text text-sm text-charcoal/55 leading-relaxed">
            {item.gridDescription}
          </p>
        </Link>
      ))}
    </div>
  );
}
