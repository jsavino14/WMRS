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
  /** Where form submissions are forwarded via Resend */
  notificationEmail: "[alerts@wmrservice.com]",
};

// ─── Navigation ───────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "What You're Overpaying", href: "/what-we-find" },
  { label: "How We Fix It", href: "/how-it-works" },
  { label: "Who We Do It For", href: "/who-we-work-with" },
  { label: "Who We Are", href: "/about" },
];

// ─── Per-page SEO metadata ────────────────────────────────────────────────────

export const meta = {
  home: {
    title: "WMRS - Waste Cost Reduction for Multi-Location Businesses",
    description:
      "WMRS audits your waste and recycling invoices, renegotiates your rates, and takes over the billing. Free audit, no upfront cost - you keep 50% of what we save.",
  },
  howItWorks: {
    title: "How It Works | WMRS",
    description:
      "A free invoice audit, a negotiation with your existing hauler, and ongoing billing oversight. Here's exactly what happens when you work with WMRS.",
  },
  whatWeFind: {
    title: "What You're Overpaying | WMRS",
    description:
      "How hauler contracts are structured, why each overcharge happens, and what an audit checks. Six billing patterns WMRS finds on nearly every multi-location account.",
  },
  whoWeWorkWith: {
    title: "Who We Work With | WMRS",
    description:
      "WMRS works with multi-location businesses - restaurants, retail chains, property managers, hotels, and more. If you pay multiple waste bills, we can help.",
  },
  about: {
    title: "About WMRS",
    description:
      "WMRS is an independent waste cost consultancy founded in 2008. Not owned by, affiliated with, or paid by any hauler. Revenue comes entirely from savings delivered to clients.",
  },
  contact: {
    title: "Send Us One Invoice | WMRS",
    description:
      "Start with one invoice. No commitment, no contract, no meeting. WMRS will audit it and tell you what we find.",
  },
};

// ─── Home page ────────────────────────────────────────────────────────────────

export const home = {
  hero: {
    h1: ["You're probably overpaying for trash.", "We'll prove it for free."],
    sub: "WMRS audits your waste and recycling invoices, renegotiates your rates, and takes over the billing so it stays fixed. You keep your hauler. Your service doesn't change. We split what we save you, 50/50 - and if we find nothing, you owe us nothing.",
    ctaPrimary: "Send us one invoice",
    ctaPrimaryHref: "/contact",
    ctaSecondary: "Call 914-485-1500",
    ctaSecondaryHref: "tel:9144851500",
  },

  trustBar: [
    "50+ years of combined industry experience",
    "[X] clients",
    "[X] locations under management",
    "$[X]M in savings identified",
    "Not owned by, affiliated with, or paid by any hauler",
  ],

  problem: {
    h2: "Nobody's job is to read the trash bill.",
    paragraphs: [
      "Waste invoices are designed to be processed, not read. The line items are vague, the fees have official-sounding names, and the total is close enough to last month's that no one flags it. That's the point.",
      "The fees that look standard - fuel surcharges, environmental fees, administrative charges - are negotiable. They are added by haulers precisely because most customers treat them as fixed. They are not.",
      "Costs drift 20–40% above market over years of auto-renewing contracts that nobody has reread. By the time a business notices, the rate is locked in for another term.",
    ],
  },

  steps: [
    {
      number: "01",
      title: "Send us an invoice.",
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
    label: "What it costs",
    h2: "You pay us out of your savings. Never out of your budget.",
    body: "The audit is free. No setup fee, no monthly fee, no retainer. When we lower your bill we keep 50% of the savings and you keep 50%. If we can't find savings, we don't send you a bill.",
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

  closingCta: {
    h2: "Send us one invoice.",
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

// ─── Client logos - ship empty; section hides when empty ─────────────────────
// To add a logo: { name: "Acme Corp", src: "/logos/acme.svg" }

export const clientLogos: { name: string; src: string }[] = [];

// ─── Industries (used on Who We Work With) ───────────────────────────────────

export const industries = [
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

// ─── How It Works page (expanded steps) ──────────────────────────────────────

export const howItWorksPage = {
  hero: {
    label: "The Process",
    h1: "A free audit. A negotiation. A fixed bill.",
    sub: "No meetings up front, no contracts, no fees until we've saved you money. Here's exactly what happens.",
  },
  steps: [
    {
      number: "01",
      title: "Send us one invoice.",
      body: [
        "One recent waste or recycling bill. That's all we need to start. You don't have to gather your full account history, pull contracts, or set up a call.",
        "We review hundreds of invoices. We know what to look for and where haulers hide margin. Give us the bill and we'll take it from there.",
      ],
    },
    {
      number: "02",
      title: "We audit it.",
      body: [
        "We compare your rates to what haulers in your market are actually accepting for equivalent service - container size, pickup frequency, location type. Not list rates. Actual negotiated rates.",
        "We review every fee on the bill: fuel surcharges, environmental fees, administrative charges, late fees, overage fees. We check whether the contract has an automatic renewal clause, what the escalator language says, and when the next renewal window opens.",
        "We look at your pickup frequency against typical generation patterns for businesses like yours. We check whether all locations and containers on the bill are active. We check how your recyclables are classified.",
      ],
    },
    {
      number: "03",
      title: "We renegotiate.",
      body: [
        "In almost every case, we work with your existing hauler. Changing haulers is disruptive and rarely necessary. Haulers are motivated to retain accounts - they'll often adjust rates rather than lose the business.",
        "We handle all communication with the hauler. You don't have to be on calls or write letters. We present the audit findings and negotiate from there.",
        "In cases where the existing hauler won't move, we'll tell you what competing haulers would offer. The decision on whether to switch is always yours.",
      ],
    },
    {
      number: "04",
      title: "We take over the billing.",
      body: [
        "Once the rate is set, every invoice from your hauler comes to us. We review every line every month against the negotiated terms.",
        "Rate increases, new fees, billing for service changes you didn't request - we catch them before you pay them. If there's a legitimate change, we'll flag it. If there isn't, we handle the correction.",
        "Your operations team doesn't have to manage waste billing anymore. We do it.",
      ],
    },
  ],
};

// ─── What We Find page (expanded detail) ─────────────────────────────────────

export const whatWeFind = {
  hero: {
    label: "What You're Overpaying",
    h1: "Six things we find on nearly every account.",
    sub: "These aren't edge cases. They're standard hauler billing practices that go unnoticed because nobody's job is to catch them.",
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
        "The escalator language is usually in the original agreement - often a clause allowing annual increases of 3–5% or the CPI, whichever is greater. Clients agree to it once and then forget it exists.",
        "Auto-renewal is the mechanism. The combination of auto-renewal and an escalator means a rate that was competitive in year one can be 20–40% above market by year five. We see this constantly.",
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
    h1: "Multi-location businesses that pay multiple waste bills.",
    sub: "We work with any organization that has more than one location and hasn't had an independent audit of its waste costs. The more locations, the more we typically find.",
  },
};

// ─── About page ───────────────────────────────────────────────────────────────

export const about = {
  hero: {
    label: "About WMRS",
    h1: "Independent waste cost consultants, in business since 2008.",
    sub: "We audit waste invoices, renegotiate rates, and stay on accounts to keep costs from drifting back. Our revenue comes entirely from savings we deliver.",
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
        "Every account has a dedicated manager with a direct line. When a pickup is missed or a charge appears that you don't recognize, you call someone who knows your account - not an 800 number.",
      ],
    },
  ],
  independence:
    "We're not owned by a hauler, funded by a hauler, or paid by a hauler. Our revenue comes entirely from the savings we deliver to you.",
};

// ─── Contact page ─────────────────────────────────────────────────────────────

export const contact = {
  hero: {
    h1: "Send us one invoice.",
    sub: "Attach one recent waste or recycling bill. We'll review it and follow up within one business day.",
  },
  form: {
    fields: {
      name: { label: "Name", placeholder: "Your name" },
      company: { label: "Company", placeholder: "Company name" },
      email: { label: "Email", placeholder: "you@company.com" },
      phone: { label: "Phone", placeholder: "Optional" },
      locations: {
        label: "Number of locations",
        options: ["1", "2–10", "11–50", "50+"],
      },
      file: {
        label: "Invoice",
        hint: "PDF, PNG, or JPG - max 10 MB",
      },
    },
    submit: "Send invoice",
    success:
      "Got it. We'll review your invoice and follow up within one business day.",
    errorGeneric:
      "Something went wrong. Please try again or call us directly.",
    errorFileType: "Please attach a PDF, PNG, or JPG file.",
    errorFileSize: "File must be under 10 MB.",
    errorRequired: "Name, company, and email are required.",
  },
  directContact: {
    heading: "Prefer to call or email directly?",
    phone: "914-485-1500",
    phoneHref: "tel:9144851500",
    email: "Info@WMRService.com",
  },
};
