import { company } from "@/content/site";

export function DirectContact() {
  return (
    <div>
      <p className="label mb-3">Prefer to call or email directly</p>
      <div className="space-y-1.5">
        <a
          href={company.phoneHref}
          className="block text-sm font-semibold text-charcoal hover:text-accent transition-colors"
        >
          {company.phone}
        </a>
        <a
          href={`mailto:${company.email}`}
          className="block text-sm font-semibold text-charcoal hover:text-accent transition-colors"
        >
          {company.email}
        </a>
      </div>
    </div>
  );
}
