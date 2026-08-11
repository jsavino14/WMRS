import { type ReactNode } from "react";

/** Single source of truth for the site's content container.
 *  Left gutter matches the hero — logo, hero copy, and all section content
 *  share one alignment edge. Pass className for per-section padding/colour. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}
