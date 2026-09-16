import Link from "next/link";
import { servicesGrid } from "@/content/site";

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
      {servicesGrid.map((item) => (
        <Link key={item.slug} href={item.href} className="group block">
          {/* Icon + name row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="shrink-0 origin-left transition-transform duration-[140ms] ease-out group-hover:scale-110 group-hover:duration-[180ms] motion-reduce:transition-none motion-reduce:!scale-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/icons/services/${item.icon}.svg`}
                alt=""
                aria-hidden="true"
                style={{ height: 36, width: "auto", display: "block" }}
              />
            </div>
            <div className="min-w-0 origin-left transition-transform duration-[140ms] ease-out group-hover:scale-[1.02] group-hover:duration-[180ms] motion-reduce:transition-none motion-reduce:!scale-100">
              <h3 className="text-base font-black text-charcoal leading-snug group-hover:text-accent transition-colors">
                <span className="block">{item.gridLines[0]}</span>
                <span className="block">{item.gridLines[1]}</span>
              </h3>
            </div>
          </div>
          {/* Description — full cell width, back at left edge */}
          <p className="origin-left transition-transform duration-[140ms] ease-out group-hover:scale-[1.02] group-hover:duration-[180ms] motion-reduce:transition-none motion-reduce:!scale-100 text-sm text-charcoal/55 leading-relaxed">
            {item.gridDescription}
          </p>
        </Link>
      ))}
    </div>
  );
}
