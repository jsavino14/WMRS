import Link from "next/link";
import { servicesGrid } from "@/content/site";

export function ServicesGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10">
      {servicesGrid.map((item) => (
        <Link key={item.slug} href={item.href} className="group block">
          <div className="sg-icon mb-4 h-8 flex items-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/icons/services/${item.icon}.svg`}
              alt=""
              aria-hidden="true"
              style={{ height: 32, width: "auto", display: "block" }}
            />
          </div>
          <div className="sg-text">
            <h3 className="text-base font-black text-charcoal mb-1.5 leading-snug group-hover:text-accent transition-colors">
              <span className="block">{item.gridLines[0]}</span>
              <span className="block">{item.gridLines[1]}</span>
            </h3>
            <p className="text-sm text-charcoal/55 leading-relaxed">
              {item.gridDescription}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
