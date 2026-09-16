// ─────────────────────────────────────────────────────────────────────────────
// content/site.ts - single source of truth for every word, number, and datum
// on the site. Changing the savings percentage is a one-line edit here.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Company ─────────────────────────────────────────────────────────────────

export const company = {
  name: "WMRS",
  legalName: "Waste Management Reduction Services, LLC",
  phone: "914-485-1500",
  phoneHref: "tel:9144851500",
  email: "Info@WMRService.com",
  /** Where invoice form submissions are forwarded via Resend */
  notificationEmail: "[alerts@wmrservice.com]",
  /** Where temp container requests are forwarded via Resend */
  containerNotificationEmail: process.env.CONTAINER_NOTIFICATION_EMAIL ?? "[containers@wmrservice.com]",
  geography: "WMRS serves the United States and parts of Canada. [PLACEHOLDER - exact wording to be confirmed]",
};

// ─── Section page arrays ──────────────────────────────────────────────────────
// Single source of truth for slugs and labels. Nav dropdowns, tab strips,
// generateStaticParams, and footer all read from these — they cannot desync.

export type Industry = {
  readonly slug: string;
  readonly name: string;
  readonly icon: string; // SVG filename without extension, in /public/icons/industries/
  readonly paragraph: string;
  readonly includes: string;
  readonly relatedServices: readonly ServiceSlug[];
};

export const industries: readonly Industry[] = [
  {
    slug: "food-service",
    name: "Food Service & Distribution",
    icon: "food-service",
    paragraph: "Distribution operations run high cardboard volume alongside organics and cold chain waste, and compactor hauls are often billed at a flat rate no matter what the load actually weighs. Cardboard at that volume is a commodity with real value, and it frequently leaves the building priced as trash.",
    includes: "Foodservice distributors, produce and protein distribution, cold storage, commissaries, catering operations",
    relatedServices: ["equipment", "esg-reporting", "waste-cost-savings"],
  },
  {
    slug: "restaurant-groups",
    name: "Restaurant Groups",
    icon: "restaurant-groups",
    paragraph: "Rates get negotiated one store at a time as locations open, so a forty unit group can end up with forty different agreements and no one holding the portfolio view. Waste volume is high relative to footprint, which makes every pricing error larger than it looks on a single bill.",
    includes: "Quick service, fast casual, full service groups, franchisees, multi brand operators",
    relatedServices: ["equipment", "temp-containers", "waste-cost-savings"],
  },
  {
    slug: "grocery",
    name: "Grocery & Supermarkets",
    icon: "grocery-food",
    paragraph: "Few businesses generate more waste per square foot, across more separate streams: organics, cardboard at scale, mixed recycling, and general waste. More streams means more places for pricing to drift, and compactor haul billing is where it drifts furthest.",
    includes: "Supermarket chains, independent grocers, specialty food retail, convenience and forecourt",
    relatedServices: ["equipment", "esg-reporting", "waste-cost-savings"],
  },
  {
    slug: "hotel-hospitality",
    name: "Hotel & Hospitality",
    icon: "hotel-hospitality",
    paragraph: "Occupancy swings hard by season while the pickup schedule stays fixed, so half the year is spent paying for capacity that goes out empty. Rates are usually set property by property rather than across the portfolio, which is where the spread between comparable sites opens up.",
    includes: "Hotel groups, resorts, conference properties, management companies, extended stay",
    relatedServices: ["esg-reporting", "temp-containers", "equipment", "waste-cost-savings"],
  },
  {
    slug: "retail-chains",
    name: "Retail Chains",
    icon: "retail-chains",
    paragraph: "Cardboard and packaging arrive in volume and leave misclassified as general waste, at general waste prices. Locations open and close regularly, and closed stores have a way of staying on the bill long after the container is gone.",
    includes: "Specialty retail, big box, mall and strip center tenants, franchise networks",
    relatedServices: ["equipment", "temp-containers", "esg-reporting", "waste-cost-savings"],
  },
  {
    slug: "commercial-property",
    name: "Commercial Property Management",
    icon: "commercial-property",
    paragraph: "Waste costs are passed through to tenants and rarely audited by anyone, which means billing errors flow straight to the people paying them without ever being questioned. Equipment charges for compactors removed years earlier are common on these accounts.",
    includes: "Office portfolios, mixed use, industrial parks, REITs, third party managers",
    relatedServices: ["environmental", "temp-containers", "equipment", "waste-cost-savings"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "healthcare",
    paragraph: "Regulated and general waste run side by side, and vendors price on that complexity rather than in spite of it. Regulated waste is often billed per container regardless of how full it is, so separating the streams properly is usually worth more than negotiating the rate.",
    includes: "Hospital systems, surgical centers, physician networks, dental and veterinary groups, long term care",
    relatedServices: ["equipment", "esg-reporting", "waste-cost-savings"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing & Warehousing",
    icon: "manufacturing",
    paragraph: "Scrap metal, plastics, and clean cardboard have commodity value and routinely go out classified as general waste. Production volume moves year to year while container sizing and pickup frequency stay wherever they were set at contract inception.",
    includes: "Light and heavy manufacturing, 3PL and fulfillment, distribution centers, cold and dry storage",
    relatedServices: ["equipment", "environmental", "esg-reporting", "waste-cost-savings"],
  },
  {
    slug: "aviation",
    name: "Aviation & Transit",
    icon: "aviation",
    paragraph: "Passenger volume generates waste continuously, and multiple operators share one site with no one entirely clear on who is paying for which container. International catering waste carries separate regulated handling requirements and separate pricing to go with it.",
    includes: "Airports, ground handlers, in flight catering, rail and bus terminals, transit authorities",
    relatedServices: ["international-waste", "environmental", "equipment", "waste-cost-savings"],
  },
  {
    slug: "construction",
    name: "Construction",
    icon: "construction",
    paragraph: "Temporary containers get ordered site by site at whatever rate is quoted that day, with no reference to what the same container costs across the rest of your projects. Mixed debris is billed as general waste when a large share of it is divertible at a lower rate.",
    includes: "General contractors, demolition, restoration, roofing, civil and infrastructure",
    relatedServices: ["temp-containers", "portable-restrooms", "environmental", "waste-cost-savings"],
  },
  {
    slug: "entertainment",
    name: "Entertainment & Venues",
    icon: "entertainment",
    paragraph: "Volume arrives in spikes that a fixed schedule contract was never built to absorb, so event days generate overage fees and quiet weeks generate pickups of empty containers. Both are paid for in full.",
    includes: "Arenas and stadiums, theaters, casinos, amusement and water parks, festivals",
    relatedServices: ["temp-containers", "portable-restrooms", "equipment", "waste-cost-savings"],
  },
  {
    slug: "education",
    name: "Educational Facilities",
    icon: "education",
    paragraph: "Contracts run long with little competitive pressure applied at renewal, and recycling programs are set up once and rarely revisited. Volume falls to almost nothing over the summer while the billing continues at full schedule.",
    includes: "K-12 districts, private schools, colleges and universities, student housing",
    relatedServices: ["temp-containers", "environmental", "esg-reporting", "equipment", "waste-cost-savings"],
  },
] as const;

export const servicePages = [
  { slug: "waste-cost-savings",  navLabel: "Waste Cost Savings",   fullName: "Waste Cost Savings" },
  { slug: "temp-containers",     navLabel: "Temporary Containers", fullName: "Temporary Containers" },
  { slug: "international-waste", navLabel: "International Waste",  fullName: "International Catering Waste" },
  { slug: "equipment",           navLabel: "Equipment Financing",  fullName: "Equipment Financing, Rentals & Repairs" },
  { slug: "esg-reporting",       navLabel: "ESG Reporting",        fullName: "ESG & Diversion Reporting" },
  { slug: "environmental",       navLabel: "Environmental",        fullName: "Tank Removal & Site Remediation" },
  { slug: "portable-restrooms",  navLabel: "Portable Restrooms",   fullName: "Portable Restrooms" },
] as const;
export type ServiceSlug = typeof servicePages[number]["slug"];

// ─── Homepage services grid ───────────────────────────────────────────────────
// Eight items in display order. Site Management is included here but lives
// outside servicePages so it stays out of the nav dropdown and footer column.

export const servicesGrid = [
  {
    slug: "waste-cost-savings",
    navLabel: "Waste Cost Savings",
    gridLines: ["Waste Cost", "Savings"],
    fullName: "Waste Cost Savings",
    href: "/services/waste-cost-savings",
    icon: "waste-cost-savings",
    gridDescription: "A line by line audit of what your haulers are actually charging you.",
  },
  {
    slug: "site-management",
    navLabel: "Site Management",
    gridLines: ["Site", "Management"],
    fullName: "Site Management",
    href: "/site-management",
    icon: "site-management",
    gridDescription: "Missed pickups, service issues, and billing across every site, handled once.",
  },
  {
    slug: "temp-containers",
    navLabel: "Temporary Containers",
    gridLines: ["Temporary", "Containers"],
    fullName: "Temporary Containers",
    href: "/services/temp-containers",
    icon: "temp-containers",
    gridDescription: "Roll-offs for cleanouts, renovations, and job sites.",
  },
  {
    slug: "equipment",
    navLabel: "Equipment Financing",
    gridLines: ["Equipment", "Financing"],
    fullName: "Equipment Financing, Rentals & Repairs",
    href: "/services/equipment",
    icon: "equipment",
    gridDescription: "Balers, compactors, and autoclaves. Financed directly, rented, or repaired.",
  },
  {
    slug: "environmental",
    navLabel: "Environmental",
    gridLines: ["Environmental &", "Remediation"],
    fullName: "Tank Removal & Site Remediation",
    href: "/services/environmental",
    icon: "environmental",
    gridDescription: "Phase II assessments, underground tank removal, and cleanups.",
  },
  {
    slug: "esg-reporting",
    navLabel: "ESG Reporting",
    gridLines: ["ESG", "Reporting"],
    fullName: "ESG & Diversion Reporting",
    href: "/services/esg-reporting",
    icon: "esg-reporting",
    gridDescription: "Tonnage and diversion data, standardized across every site.",
  },
  {
    slug: "international-waste",
    navLabel: "International Waste",
    gridLines: ["International", "Waste"],
    fullName: "International Catering Waste",
    href: "/services/international-waste",
    icon: "international-waste",
    gridDescription: "Regulated waste off aircraft and vessels, handled to an approved facility.",
  },
  {
    slug: "portable-restrooms",
    navLabel: "Portable Restrooms",
    gridLines: ["Portable", "Restrooms"],
    fullName: "Portable Restrooms",
    href: "/services/portable-restrooms",
    icon: "portable-restrooms",
    gridDescription: "Units and servicing for job sites and events.",
  },
] as const;

// ─── Navigation ───────────────────────────────────────────────────────────────

export type NavDropdownItem = { label: string; href: string };
export type NavTopItem = {
  label: string;
  href: string | null;
  /** Pathname prefix used to determine the active top-nav item */
  activePrefix?: string;
  dropdown?: NavDropdownItem[];
};

export const nav: NavTopItem[] = [
  {
    label: "Services",
    href: null,
    activePrefix: "/services",
    dropdown: servicePages.map((p) => ({ label: p.navLabel, href: `/services/${p.slug}` })),
  },
  { label: "Industries", href: "/industries", activePrefix: "/industries" },
  { label: "Site Management", href: "/site-management" },
  { label: "Who We Are",      href: "/who-we-are" },
];

// Footer company links column
export const companyPages = [
  { label: "Site Management", href: "/site-management" },
  { label: "Who We Are",      href: "/who-we-are" },
  { label: "FAQ",             href: "/faq" },
  { label: "Contact",         href: "/contact" },
];

// ─── Per-page SEO metadata ────────────────────────────────────────────────────

export const meta = {
  home: {
    title: "Waste Cost Reduction for Multi-Location Businesses",
    description:
      "WMRS audits your waste and recycling invoices, renegotiates your rates, and takes over the billing. Free audit, no upfront cost - you keep 50% of what we save.",
  },
  servicePage: (label: string) => ({
    title: label,
    description: `[META DESCRIPTION FOR ${label.toUpperCase()} - to be supplied]`,
  }),
  wasteCostSavings: {
    title: "Waste Cost Savings",
    description:
      "Six billing patterns WMRS finds on nearly every multi-location account. Free audit, no upfront cost.",
  },
  tempContainers: {
    title: "Temporary Containers",
    description:
      "Roll-off containers for cleanouts, renovations, and job sites, delivered on your schedule and priced across all your sites rather than one at a time.",
  },
  internationalWaste: {
    title: "International Catering Waste",
    description:
      "Regulated waste from aircraft and vessels arriving from outside the country requires sealed handling and disposal at an approved facility. WMRS manages the segregation, the transfer, and the records.",
  },
  esgReporting: {
    title: "ESG & Waste Diversion Reporting",
    description:
      "Tonnage and diversion data standardized across every site and every hauler, auditable back to the invoice, and ready for corporate sustainability reporting.",
  },
  portableRestrooms: {
    title: "Portable Restrooms",
    description:
      "Portable restrooms for job sites, events, and temporary operations, delivered and serviced on the same account as the rest of your waste program.",
  },
  environmental: {
    title: "Tank Removal & Site Remediation",
    description:
      "Phase II assessments, underground tank removal, and soil and groundwater cleanup, managed to a written closure determination.",
  },
  equipment: {
    title: "Equipment Financing & Servicing",
    description:
      "WMRS finances, rents, and services cardboard balers, self-contained compactors, and autoclaves, and repairs and welds equipment you already own.",
  },
  industries: {
    title: "Industries We Serve",
    description:
      "WMRS reduces waste and recycling costs for multi-location businesses across food service, healthcare, manufacturing, retail, construction, and more.",
    // introP (removed from page, kept here): "The container sizes change, the streams change,
    // the volume changes. What doesn't change is a contract with an escalator in it and a surcharge
    // structure nobody reads. Here's where the money usually is, by sector."
  },
  siteManagement: {
    title: "Site Management",
    description:
      "WMRS manages your waste accounts end-to-end: every invoice reviewed, every service issue handled, every renewal tracked. Free audit, 50/50 shared savings, no upfront cost.",
  },
  whoWeWorkWith: {
    title: "Industries",
    description:
      "WMRS works with multi-location businesses - restaurants, retail chains, property managers, hotels, and more. If you pay multiple waste bills, we can help.",
  },
  about: {
    title: "Who We Are",
    description:
      "WMRS is an independent waste cost consultancy founded in 2008. Not owned by, affiliated with, or paid by any hauler. Revenue comes entirely from savings delivered to clients.",
  },
  contact: {
    title: "Send Us One Invoice",
    description:
      "Start with one invoice. No commitment, no contract, no meeting. WMRS will audit it and tell you what we find.",
  },
  faq: {
    title: "FAQ",
    description:
      "Common questions about how WMRS works, what the audit covers, cost, contracts, and what happens after we renegotiate.",
  },
};

// ─── Customer counter ─────────────────────────────────────────────────────────
// TrustBar computes: floor(baseline × 1.005^n / 100) × 100, n = whole months since asOf

export const customerBaseline       = 8700;
export const customerAsOf           = "2026-09-01";
export const customerGrowthPerMonth = 0.005;

// ─── Client logos ─────────────────────────────────────────────────────────────
// SVGs live in /public/logos/. TrustBar embeds them inline for CSS color control.

export const clientLogos = [
  { name: "The Chefs' Warehouse", file: "/logos/chefs-warehouse.svg" },
  { name: "Baldor Specialty Foods", file: "/logos/baldor.svg" },
  { name: "Imperial Brady",         file: "/logos/imperial.svg" },
];

// ─── Home page ────────────────────────────────────────────────────────────────

export const home = {
  hero: {
    h1: ["You're probably overpaying for trash.", "We'll prove it for free."],
    sub: "WMRS reads the bill line by line, renegotiates the rate, and takes the billing and the service calls off your desk. Temporary containers, international waste, equipment financing, tank removals and reporting come with it. We split what we save you, 50/50. Find nothing and you owe nothing.",
    ctaPrimary: "Send us one invoice",
    ctaPrimaryHref: "/contact",
    ctaSecondary: "Call 914-485-1500",
    ctaSecondaryHref: "tel:9144851500",
  },

  problem: {
    h2: "We've seen bills like yours before.",
    paragraphs: [
      "Waste invoices are designed to be processed, not read. The line items are vague, the fees have official-sounding names, and the total is close enough to last month's that no one flags it. That's the point.",
      "The fees that look standard - fuel surcharges, environmental fees, administrative charges - are negotiable. They are added by haulers precisely because most customers treat them as fixed. They are not.",
      "Costs drift 20-40% above market over years of auto-renewing contracts that nobody has reread. By the time a business notices, the rate is locked in for another term.",
    ],
  },

  steps: [
    {
      number: "01",
      title: "Send us one invoice.",
      body: "One recent bill. No meeting, no contract, no commitment. We'll take it from here.",
    },
    {
      number: "02",
      title: "We audit it.",
      body: "Line by line: your rates against what haulers in your zip code actually accept, your fees, contract terms, pickup frequency, container sizing, overage history.",
    },
    {
      number: "03",
      title: "We renegotiate.",
      body: "With your existing hauler in almost every case. Same truck, same driver, same schedule - lower number at the bottom of the bill.",
    },
    {
      number: "04",
      title: "We take over the billing.",
      body: "Every invoice comes to us. We check every line every month and catch increases before you pay them.",
    },
  ],

  cost: {
    h2: "You pay us out of your savings. Never out of your budget.",
    body: "The audit is free. When we lower your bill, we keep 50% of the savings and you keep 50%. No setup fee, no monthly fee, no retainer. If we can't find savings, we don't send you a bill.",
  },

  siteManagementSection: {
    h2: "Every missed pickup is somebody's afternoon.",
    paragraphs: [
      "Containers that never arrive. Service changes nobody asked for. Pickups that just don't happen. Each one is a phone call, a hold, an explanation, and another call when it happens again the following week.",
      "We take it on. Every site, every hauler, every month. You report it once and it's ours.",
    ],
    link: "Learn more about our site management services",
    linkHref: "/site-management",
  },

  whatWeFind: {
    label: "What we find",
    h2: "Six overcharges we find on nearly every account.",
    items: [
      "Containers sized for a business you no longer are",
      "Pickups scheduled more often than you generate waste",
      "Fuel and environmental surcharges billed as a percentage of the total",
      "Auto-renewing contracts with annual escalators nobody agreed to",
      "Billing for closed locations and containers already hauled away",
      "Recyclables going out as trash, at trash prices",
    ],
  },

  proof: {
    label: "Proof",
    h2: "What clients have found.",
  },

  personSection: {
    h2: "You get a person, not a queue.",
    body: "Every account has a dedicated manager who knows your sites, your haulers, and your contracts. When a pickup is missed or a charge shows up that you don't recognize, you're talking to someone who already knows the account.",
  },

  closingCta: {
    h2: "Start with one bill.",
    body: "Start with one recent bill. We'll audit it and tell you exactly what we find.",
    cta: "Send us one invoice",
    ctaHref: "/contact",
  },
};

// ─── FAQ (used on multiple pages) ────────────────────────────────────────────

export const faq = [
  {
    q: "Do I have to switch haulers?",
    a: "Almost never. We renegotiate with your existing hauler in the vast majority of cases. Same truck, same driver, same schedule.",
  },
  {
    q: "We're locked into a contract.",
    a: "Usually fine - sometimes the best time to call. Contract terms often include provisions we can work with, and your next renewal becomes an opportunity.",
  },
  {
    q: "We already negotiated our rate.",
    a: "Then the audit costs nothing and confirms it. If you negotiated well, we'll tell you that and walk away.",
  },
  {
    q: "We handle our own vendor negotiations.",
    a: "Plenty of our clients did, and did it well. The rate is the easy part. It's the twelve months afterward that erode it. Fuel surcharges creep, escalators trigger, a location closes and stays on the bill. We watch that so nobody on your team has to.",
  },
  {
    q: "What do you need from us?",
    a: "One invoice to start. If we find savings worth pursuing, we'll ask for a letter of authorization so we can negotiate on your behalf.",
  },
  {
    q: "What if you find nothing?",
    a: "You owe us nothing and you keep the audit. We'll document what we checked and why your rates look fair.",
  },
];

// ─── Case studies (placeholder - replace with real data) ─────────────────────

export const caseStudies = [
  {
    industry: "[INDUSTRY - e.g. Quick-Service Restaurant Group]",
    state: "[STATE]",
    locationCount: "[X]",
    situation:
      "[Describe the situation - e.g. A regional chain on a contract auto-renewed without review for six years. No one at the company had compared rates since the original agreement.]",
    found:
      "[What WMRS found - e.g. Fuel surcharges billed as 18% of the total, two closed locations still on the account, and a pickup frequency set for pre-COVID volume.]",
    result: {
      saved: "$[XX,XXX]",
      reduction: "[XX]%",
      annualSavings: "$[XX,XXX] per year",
    },
    quote:
      "[Quote from the client - e.g. 'We had no idea the contract had renewed at that rate. WMRS found it in the first audit and had it corrected within the month.']",
    quoteName: "[First Name, Title]",
  },
  {
    industry: "[INDUSTRY - e.g. Regional Hotel Group]",
    state: "[STATE]",
    locationCount: "[X]",
    situation:
      "[Describe the situation - e.g. An ownership group managing properties across three states, each with separate hauler agreements negotiated locally with no central oversight.]",
    found:
      "[What WMRS found - e.g. Rate inconsistencies of up to 40% between comparable properties, environmental surcharges structured as percentages, and outdated container sizing at the highest-volume locations.]",
    result: {
      saved: "$[XX,XXX]",
      reduction: "[XX]%",
      annualSavings: "$[XX,XXX] per year",
    },
    quote:
      "[Quote - e.g. 'The decentralized contracts made this impossible to manage. WMRS brought it under one audit and found savings we couldn't have seen from the inside.']",
    quoteName: "[First Name, Title]",
  },
  {
    industry: "[INDUSTRY - e.g. Commercial Property Management]",
    state: "[STATE]",
    locationCount: "[X]",
    situation:
      "[Describe the situation - e.g. A property manager overseeing retail and mixed-use buildings, responsible for waste costs passed through to tenants but rarely reviewed.]",
    found:
      "[What WMRS found - e.g. Pass-through billing errors, recyclable streams misclassified as trash, and one property still paying for a compactor removed two years prior.]",
    result: {
      saved: "$[XX,XXX]",
      reduction: "[XX]%",
      annualSavings: "$[XX,XXX] per year",
    },
    quote:
      "[Quote - e.g. 'We were billing tenants for costs we hadn't verified ourselves. Finding the compactor charge alone justified the whole audit.']",
    quoteName: "[First Name, Title]",
  },
];

// ─── Industries grid (homepage/overcharge card component — simple name+note shape) ────

export const industriesGrid = [
  {
    name: "Restaurant Groups",
    note: "High waste volume, frequent pickups, and rates often set location by location rather than across the portfolio.",
  },
  {
    name: "Hotel & Hospitality",
    note: "Multi-property operations with decentralized purchasing and seasonal volume patterns that often don't match fixed pickup schedules.",
  },
  {
    name: "Retail Chains",
    note: "Cardboard and packaging recycling streams frequently misclassified, plus regular location turnover that leaves ghost accounts.",
  },
  {
    name: "Commercial Property Management",
    note: "Pass-through waste costs rarely audited, with billing errors that flow directly to tenants.",
  },
  {
    name: "Healthcare Facilities",
    note: "Complex waste streams with regulated and general waste often mixed, and vendors who rely on that complexity to obscure pricing.",
  },
  {
    name: "Grocery & Food Service",
    note: "Organic waste streams, compactor billing, and multi-stream recycling with significant savings potential on each.",
  },
  {
    name: "Office Buildings",
    note: "Waste costs buried in operating expenses and rarely broken out for review.",
  },
  {
    name: "Manufacturing",
    note: "Scrap and recyclable material streams frequently undervalued or misclassified as general waste.",
  },
  {
    name: "Entertainment Venues",
    note: "Spike-and-trough volume patterns that rarely match fixed-schedule contracts, and high overage fees during peak periods.",
  },
  {
    name: "Educational Institutions",
    note: "Long-term contracts with limited competitive pressure, and recycling programs that underperform their potential.",
  },
];

// ─── Services overview page ───────────────────────────────────────────────────

// ─── Temporary container request form ─────────────────────────────────────────

export const tempContainerForm = {
  hero: {
    h1: "Request a Temporary Container.",
    sub: "Fill out the form below.",
  },
  form: {
    fields: {
      name:            { label: "Name",                 placeholder: "Your name" },
      company:         { label: "Company",              placeholder: "Company name" },
      email:           { label: "Email",                placeholder: "you@company.com" },
      phone:           { label: "Phone",                placeholder: "Optional" },
      deliveryAddress: { label: "Delivery Address",     placeholder: "Street address, city, state, zip" },
      containerSize:   { label: "Container Size",       placeholder: "e.g. 10 yard, 20 yard, 30 yard" },
      materialType:    { label: "Material Type",        placeholder: "e.g. Construction debris, mixed waste" },
      deliveryDate:    { label: "Delivery Date Needed", placeholder: "MM/DD/YYYY" },
    },
    submit: "Submit request",
    success: "Request received. Someone will be in touch.",
    errorRequired: "Name, company, email, and delivery address are required.",
    errorGeneric: "Something went wrong. Please try again or call us directly.",
  },
};

// ─── Waste Cost Savings page (moved from /what-we-find) ───────────────────────

export const whatWeFind = {
  hero: {
    label: "What You're Overpaying",
    h1: "Haulers bank on you not noticing. Noticing is our whole job.",
    sub: "Most accounts have some of these. Plenty have all six.",
  },
  contractContext: {
    heading: "How hauler contracts are built.",
    body: [
      "Most waste service agreements share the same structure: a base rate for service - covering container size, pickup frequency, and location - plus a stack of line-item surcharges. Fuel, environmental, administrative, and other charges are layered on top, typically as percentages of the base rate or flat fees added per pickup.",
      "Almost every contract includes an automatic renewal clause. Service continues - and rates hold - unless you cancel within a specific window, often 60 to 90 days before the anniversary date. Haulers rely on that window closing without action. Most clients don't track it.",
      "Contracts also typically include an annual escalator: a clause allowing rate increases of 3-5% or the CPI rate, whichever is greater. Agreed to once at signing, rarely revisited. Combined with percentage-based surcharges that grow with the base rate and automatic renewal that locks in each year's increase, a rate that was reasonable at signing can be 20-40% above market within a few contract cycles.",
      "An audit reviews the base rate against what haulers in your market are actually accepting for equivalent service. It checks every surcharge for legitimacy and structure, identifies the renewal window, and looks for service configurations that no longer reflect how you operate.",
    ],
  },
  items: [
    {
      number: "01",
      label: "Oversized containers",
      title: "Containers sized for a business you no longer are.",
      detail: [
        "Container sizing is set at contract inception. If your business has contracted - fewer locations, lower volume, different operations - the container didn't change. You're paying for cubic yards of capacity that goes out half-full.",
        "Rightsizing a container is one of the cleanest reductions we make. It requires no rate negotiation, just an amendment to the service terms. The savings are immediate and permanent.",
      ],
    },
    {
      number: "02",
      label: "Unneeded pickups",
      title: "Pickups scheduled more often than you generate waste.",
      detail: [
        "Weekly pickup on a container that fills every two weeks is a recurring double-charge. It accumulates quietly. A business with ten locations paying for unnecessary pickups at each one will often find this is their single largest line-item adjustment.",
        "We verify pickup frequency against container capacity and typical generation for your business type. If the math doesn't work, we amend it.",
      ],
    },
    {
      number: "03",
      label: "Compounding surcharges",
      title: "Fuel and environmental surcharges billed as a percentage of the total.",
      detail: [
        "Fuel surcharges should reflect actual fuel costs - ideally as a flat fee or tied to a published index. When structured as a percentage of the base rate, they compound every time the base rate increases.",
        "Over a multi-year contract with annual escalators, a percentage-based surcharge grows faster than the base rate. We negotiate these to flat amounts, which produces meaningful savings over the life of the contract.",
      ],
    },
    {
      number: "04",
      label: "Buried escalators",
      title: "Auto-renewing contracts with annual escalators nobody agreed to.",
      detail: [
        "The escalator language is usually in the original agreement - often a clause allowing annual increases of 3-5% or the CPI, whichever is greater. Clients agree to it once and then forget it exists.",
        "Auto-renewal is the mechanism. The combination of auto-renewal and an escalator means a rate that was competitive in year one can be 20-40% above market by year five. We see this constantly.",
        "The best time to address it is before the next renewal window closes. The second best time is now.",
      ],
    },
    {
      number: "05",
      label: "Ghost locations",
      title: "Billing for closed locations and containers already hauled away.",
      detail: [
        "Haulers don't always close accounts cleanly when a location closes. The service stops, but the billing line can remain. For multi-location businesses with regular openings and closings, this accumulates.",
        "We've found clients being billed for locations that closed two or three years prior. The hauler isn't always acting in bad faith - sometimes it's an administrative gap on both sides. We find it and recover it.",
      ],
    },
    {
      number: "06",
      label: "Mispriced recyclables",
      title: "Recyclables going out as trash, at trash prices.",
      detail: [
        "Cardboard, clean plastic, aluminum, and certain metals have commodity value. When they go out in the general waste stream - because nobody set up separate collection, or because the recycling program was quietly discontinued - you're paying the higher trash rate for material that could generate a credit.",
        "Establishing a separate recycling stream isn't always straightforward, but for high-volume locations it often produces savings that exceed anything we find in rate negotiation.",
      ],
    },
  ],
};

// ─── Who We Work With page ────────────────────────────────────────────────────

export const whoWeWorkWith = {
  hero: {
    label: "Our Clients",
    h1: "Businesses with waste costs worth looking at.",
    sub: "We work primarily with multi-location businesses and organizations with significant waste spend. The more locations, vendors, and service complexity involved, the more opportunities we typically find.",
  },
};

// ─── About page ───────────────────────────────────────────────────────────────

export const about = {
  hero: {
    label: "About WMRS",
    h1: "Independent waste cost consultants, in business since 2008.",
    sub: "We audit waste invoices, renegotiate rates, and stay on accounts to keep costs from drifting back.",
  },
  sections: [
    {
      heading: "Independent since 2008.",
      body: [
        "WMRS was founded by operators who came out of the waste industry and saw the same thing at company after company: businesses paying well above market, not through carelessness, but because waste invoices are genuinely hard to read and nobody's job is to read them.",
        "Since then we've managed waste programs for [X] businesses across [X] locations. Most of them came from someone who'd worked with us before.",
      ],
    },
    {
      heading: "We don't work for haulers.",
      body: [
        "We're not owned by a hauler, funded by a hauler, or paid by a hauler. Our revenue comes entirely from the savings we deliver to you, which means our incentives point in exactly one direction.",
      ],
    },
    {
      heading: "You get a person, not a queue.",
      body: [
        "One manager owns your account. They know your sites, your haulers, your contract terms, and the history of every issue you've raised. That's not a service level we advertise - it's just how a company this size works, and it's the part clients tell us they'd miss most.",
      ],
    },
  ],
  independence:
    "We're not owned by a hauler, funded by a hauler, or paid by a hauler. Our revenue comes entirely from the savings we deliver to you.",
};

// ─── Site Management page ─────────────────────────────────────────────────────

export const siteManagement = {
  hero: {
    h1: "It's never just one phone call.",
    listItems: [
      "A pickup gets missed.",
      "A container doesn't arrive, or shows up the wrong size.",
      "An invoice doesn't match the contract.",
      "A renewal window closes while nobody's watching.",
      "A location opens or closes and nobody tells the hauler.",
    ],
    closing: "Ditch the multiple calls, hold queues, and numerous follow ups.",
  },
  rateSection: {
    h2: "It's never one phone call.",
    paragraphs: [
      "A pickup gets missed. Someone has to notice, call the hauler, sit on hold, explain the account, and follow up when it happens again the next week.",
      "A container doesn't arrive, or arrives in the wrong size. That's a chain of calls and a service ticket nobody has time to chase.",
      "An invoice doesn't match the contract. Catching it means having the contract open, knowing what the rate should be, and having time to compare. Nobody does.",
    ],
  },
  whatWeDoSection: {
    h2: "You report it once. We handle the rest.",
    items: [
      { icon: "invoice-review",   text: "Every invoice reviewed against your contracted terms, every month" },
      { icon: "service-chase",    text: "Service issues taken directly to the hauler. You report it once, we chase it." },
      { icon: "container-sizing", text: "Container sizing and pickup frequency adjusted as your volume changes" },
      { icon: "renewal-tracking", text: "Contract renewal windows tracked so none close without a decision" },
      { icon: "multi-location",   text: "Consolidated billing across every location" },
      { icon: "direct-contact",   text: "One dedicated contact with a direct line" },
    ],
  },
  consolidationSection: {
    h2: "Now it can be.",
    sub: "However many sites you have, everything comes through one place.",
  },
  consolidationRows: [
    {
      shape: "invoice"  as const,
      leftLabel: "Invoices from every hauler",
      rightLabel: "One consolidated bill",
    },
    {
      shape: "calendar" as const,
      leftLabel: "Contracts and renewal dates across every site",
      rightLabel: "One tracked calendar",
    },
    {
      shape: "phone"    as const,
      leftLabel: "A different number for every vendor",
      rightLabel: "One direct line",
    },
    {
      shape: "report"   as const,
      leftLabel: "Tonnage and diversion data from every hauler",
      rightLabel: "One set of numbers",
    },
  ],
  howWeGetPaid: {
    h2: "How we get paid is negotiable. The work isn't.",
    body: [
      "The audit is free. When we lower your bill, we keep 50% of the savings and you keep 50%. No setup fee, no monthly fee, no retainer. If we can't find savings, we don't send you a bill.",
    ],
    placeholder: "[PLACEHOLDER: fee range and whether it's per site or per account - to be added once decided.]",
  },
  whereToStart: {
    h2: "Where to start.",
    auditIf: {
      label: "Start with the audit if:",
      body: "You've never had your invoices reviewed, you suspect your rates are high, or you want to know what's on the table before committing to anything. It's free and it costs you one email.",
    },
    hereIf: {
      label: "Start with management if:",
      body: "You already know your rates are fair, or you've done the negotiating yourself and the problem is the workload.",
    },
    closing: "Plenty of clients do both.",
  },
};

// ─── Contact page ─────────────────────────────────────────────────────────────

export const contact = {
  hero: {
    h1: "Send us one invoice.",
    sub: "Attach one recent waste or recycling bill. We'll review it and tell you what we find.",
  },
  form: {
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      company: { label: "Company", placeholder: "Company name" },
      email: { label: "Email", placeholder: "you@company.com" },
      phone: { label: "Phone", placeholder: "Optional" },
      locations: {
        label: "Number of locations",
        options: ["1", "2-10", "11-50", "50+"],
      },
      lookingFor: {
        label: "What are you looking for?",
        options: [
          "Reducing our waste costs",
          "Ongoing site management",
          "Not sure yet",
        ],
      },
      file: {
        label: "Invoice",
        hint: "PDF, PNG, JPG, or HEIC — max 8 MB",
      },
    },
    submit: "Send invoice",
    success:
      "Got it. We'll review your invoice and tell you what we find.",
    errorGeneric:
      "Something went wrong. Please try again or call us directly.",
    errorFileType: "Please attach a PDF, PNG, JPG, or HEIC file.",
    errorFileSize: "File must be under 8 MB.",
    errorRequired: "Name, company, and email are required.",
  },
  directContact: {
    heading: "Prefer to call or email directly?",
    phone: "914-485-1500",
    phoneHref: "tel:9144851500",
    email: "Info@WMRService.com",
  },
};

// ─── How It Works page (kept for backward compat - page now redirects to /services) ─

export const howItWorksPage = {
  hero: {
    label: "The Process",
    h1: ["One invoice.", "A free audit.", "A negotiation.", "A fixed bill."],
    sub: "No meetings up front, no contracts, no fees until we've saved you money. Here's exactly what happens.",
  },
  steps: [
    {
      number: "01",
      title: "Send us one invoice.",
      diagramLabel: "Send it",
      body: [
        "One recent waste or recycling bill. That's all we need to start. You don't have to gather your full account history, pull contracts, or set up a call.",
        "We review hundreds of invoices. We know what to look for and where haulers hide margin. Give us the bill and we'll take it from there.",
      ],
    },
    {
      number: "02",
      title: "We audit it.",
      diagramLabel: "We audit",
      body: [
        "We compare against the rates haulers are actually accepting for equivalent service - container size, pickup frequency, location type, not their published list rates.",
        "We review every fee on the bill: fuel surcharges, environmental fees, administrative charges, late fees, overage fees. We check whether the contract has an automatic renewal clause, what the escalator language says, and when the next renewal window opens.",
        "We look at your pickup frequency against typical generation patterns for businesses like yours. We check whether all locations and containers on the bill are active. We check how your recyclables are classified.",
      ],
    },
    {
      number: "03",
      title: "We renegotiate.",
      diagramLabel: "We renegotiate",
      body: [
        "In almost every case, we work with your existing hauler. Changing haulers is disruptive and rarely necessary. Haulers are motivated to retain accounts - they'll often adjust rates rather than lose the business.",
        "We handle all communication with the hauler. You don't have to be on calls or write letters. We present the audit findings and negotiate from there.",
        "In cases where the existing hauler won't move, we'll tell you what competing haulers would offer. The decision on whether to switch is always yours.",
      ],
    },
    {
      number: "04",
      title: "We take over the billing.",
      diagramLabel: "We manage it",
      body: [
        "Once the rate is set, every invoice from your hauler comes to us. We review every line every month against the negotiated terms.",
        "Rate increases, new fees, billing for service changes you didn't request - we catch them before you pay them. If there's a legitimate change, we'll flag it. If there isn't, we handle the correction.",
        "Your operations team doesn't have to manage waste billing anymore. We do it.",
      ],
    },
  ],
};
