/**
 * Services page offers (src/routes/services.tsx). Added 2026-11-01.
 *
 * Prices and what each one includes come from her DeeBuilt products in
 * Opsette. Opsette is the source of truth: a price changed there has to change
 * here too. The page deliberately leaves out limits like "up to 8 process
 * maps", so "Starting at" leaves room to quote bigger jobs higher.
 *
 * Which products are listed is her decision, 2026-11-01. Everything else in
 * the catalog (retainers, All-In, add-ons, Vibe Code) stays off this page.
 *
 * The Guided Tech Session is the one service bought without talking first, so
 * `buyUrl` goes to its Opsette order page. A visitor who buys at midnight must
 * get a confirmation right away.
 *
 * Button labels are hers, 2026-11-01, picked from workshopped options.
 */

export type StageId = "launch" | "scale" | "reorganize";

export type StageOffer = {
  id: StageId;
  /** Short word on the selector, the same one the Resources page uses. */
  label: string;
  name: string;
  price: string;
  forWho: string;
  includes: string[];
  notIncluded: string[];
  /** What the discovery call settles, shown under the exclusions. */
  notIncludedNote?: string;
  /** Solution ids (src/content/solutions.ts) common at this stage. */
  problems: string[];
  cta: string;
};

/** Scale and Reorganize can include both, sized per client. Hers, 2026-11-01. */
const SIZED_ON_CALL =
  "The discovery call will determine how much custom development and data migration your quote includes.";

export const stageOffers: StageOffer[] = [
  {
    id: "launch",
    label: "Launch",
    name: "Launch Infrastructure",
    price: "$3,500",
    forWho:
      "For a business, new or already serving clients, that needs one system to keep track of everything.",
    includes: [
      "Domain purchase and DNS setup",
      "Google Workspace with business email and shared Drive folders",
      "A base for your business information",
      "User-friendly interfaces for your daily work",
      "Starter automations for follow-up reminders",
      "Forms that add new records to your base in minutes",
      "Written instructions for using your system",
      "Training on your new system",
    ],
    notIncluded: ["Website design", "Software subscription fees", "Ongoing support"],
    problems: ["system-selection", "business-basics"],
    cta: "Talk through my launch",
  },
  {
    id: "scale",
    label: "Scale",
    name: "Scale Infrastructure",
    price: "$5,000",
    forWho: "For a business with steady clients and no written system.",
    includes: [
      "A workflow discovery session, including a walkthrough of a recent client",
      "An audit of your current tools",
      "A build-out of your current platform, or setup of a new one",
      "Documented processes with checklists",
      "A vendor or partner database",
      "Client email templates",
      "Tool integrations",
      "Training, plus 30 days of support",
    ],
    notIncluded: ["Website design", "Software subscription fees", "Support after 30 days"],
    notIncludedNote: SIZED_ON_CALL,
    problems: [
      "client-communication",
      "work-assignment-and-pay",
      "automation",
      "process-documentation",
    ],
    cta: "Talk through my growth",
  },
  {
    id: "reorganize",
    label: "Reorganize",
    name: "Reorganize Infrastructure",
    price: "$7,500",
    forWho: "For an established business running on tools and habits that grew over time.",
    includes: [
      "An operations audit across tools, people, and data",
      "Process maps for core workflows",
      "A platform recommendation and setup, or consolidation of current tools",
      "Data migration",
      "User roles and permissions",
      "Integrations and automations",
      "A reporting dashboard",
      "An SOP library and team training",
      "60 days of support",
    ],
    notIncluded: ["Website design", "Software subscription fees", "Support after 60 days"],
    notIncludedNote: SIZED_ON_CALL,
    problems: [
      "platform-migration",
      "system-integration",
      "report-building",
      "time-off-and-reviews",
    ],
    cta: "Talk through my reorganization",
  },
];

export type SmallerOffer = {
  id: string;
  name: string;
  /** A short label shown above the name, such as "Popular". */
  badge?: string;
  /** Set for a fixed price. Everything else reads "Starting at". */
  startingAt: boolean;
  price: string;
  /** What else the price requires, shown beside it. */
  priceNote?: string;
  description: string;
  includes: string[];
  notIncluded: string[];
  /** What the service is for, shown above the exclusions. */
  scope?: string;
  /** A condition the visitor has to know before buying. */
  terms?: string;
  cta: string;
  /** The session's checkout link. Empty until Opsette can take the payment. */
  buyUrl?: string;
  /** True when the button pays. False when it opens the discovery call. */
  buyNow: boolean;
};

export const smallerOffers: SmallerOffer[] = [
  {
    id: "guided-tech-session",
    name: "Guided Tech Session",
    startingAt: false,
    price: "$300",
    description:
      "A 90-minute screen share to get one piece of your business tech working. You log in to your own accounts, and I guide the setup live.",
    includes: [
      "One system or connection, agreed on before the session",
      "A written recap within one business day",
    ],
    scope: "For no-code business tools, basic integrations, and a first look at APIs.",
    notIncluded: [
      "Bugs or glitches in a custom-coded system",
      "Coding or custom development",
      "Data migration or multi-system builds",
      "Work outside the agreed topic",
      "Support after the session",
    ],
    cta: "Get my session",
    buyUrl: "https://opsette.io/order/deebuilt/product/c1434aa5-736a-4dac-abd8-ff8e595bde14",
    buyNow: true,
  },
  {
    id: "debut-site-build",
    name: "Debut Site Build",
    startingAt: true,
    price: "$1,500",
    priceNote: "plus website care from $75/month",
    description: "A custom-designed, fast-loading website built around your brand.",
    includes: [
      "Up to 4 pages",
      "Mobile-friendly design",
      "A contact form that sends inquiries to your email",
      "Your domain connected, with SSL security",
      "Two rounds of revisions",
      "A launch and handoff walkthrough",
    ],
    notIncluded: [
      "More than 4 pages",
      "Booking, a blog, or custom features",
      "An online store",
      "New pages after launch, which are quoted separately",
    ],
    terms: "A website care plan is required, with a 12-month minimum.",
    cta: "Start my website",
    buyNow: false,
  },
  {
    id: "system-setup-sprint",
    name: "System Setup Sprint",
    badge: "Popular",
    startingAt: true,
    price: "$2,250",
    description:
      "A short project to set up or clean up one core system in your business. This package is ideal if you know what you want to fix or build, but need help actually getting it done, cleanly and intentionally.",
    includes: [
      "Setup or restructuring of one primary system, such as new client requests or service follow-ups",
      "Migration of your existing information into the new system",
      "Integration with one supporting tool, plus available native integrations",
      "A live walkthrough and written documentation for using and maintaining the system",
    ],
    notIncluded: [
      "More than one primary system",
      "Custom-coded systems or development",
      "Automations beyond native integrations",
      "Ongoing support",
    ],
    terms: "The timeline depends on how much data cleanup is needed.",
    cta: "Plan my sprint",
    buyNow: false,
  },
];

export const servicesPage = {
  stagesHeading: "Services for every stage",
  stagesNote: "You will get a final quote after a free discovery call.",
  problemsHeading: "Common problems at this stage",
  smallerHeading: "Need something smaller?",
  closing: "Want to talk before you decide what you need?",
  closingCta: "Get in touch",
} as const;
