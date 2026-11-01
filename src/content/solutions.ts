/**
 * Problem and solution entries on the Services page, each opened in a pop-up
 * from its stage (ProblemLinks). Problem, scope, and systems are hers, from
 * "DeeBuilt Capability Cards" (2026-10-16), copied in verbatim. She rewrote each
 * solution line by line on 2026-11-01. Do not tighten or rephrase any of it:
 * earlier agent passes on this site drifted her copy away from her by
 * "improving" it.
 *
 * Writing pattern (from the same doc), for any card added later:
 * - Problem: full sentences, present tense, the business today. Two to
 *   three short sentences. Vary the first word across cards.
 * - Scope: noun phrases, comma-separated. One line.
 * - Systems: kinds of systems, no brand names. One line.
 * - Solution: what she will do, in full sentences. "I" is her own work, and "we"
 *   is her and the client together. Vary the sentence shapes within an entry and
 *   across entries.
 *
 * Labels renamed 2026-10-23, hers: Starting point / Results became
 * Problem / Solution, a pair that matches the page name.
 * - Problem, scope, and systems: no pronouns. One idea per sentence. Lists of
 *   two or four. No contrast pairs, no questions, no scenario setups, no em
 *   dashes.
 */

export type Solution = {
  /** How a stage or service points to this entry (src/content/services.ts). */
  id: string;
  title: string;
  problem: string;
  scope: string;
  systems: string;
  solution: string;
};

export const solutionsPage = {
  header: "Better is buildable.",
  subtitle: "Solutions tailored to your business.",
} as const;

export const solutions: Solution[] = [
  // The two Launch entries, added 2026-11-01. The other eight describe a
  // business already running.
  {
    id: "system-selection",
    title: "System Selection",
    problem:
      "A new business needs several systems at once. The options are difficult to compare. It is hard to determine which systems to set up first or how to connect them.",
    scope: "Needs review, system selection, account setup, system connections",
    systems: "Email, file storage, forms, invoicing",
    solution:
      "Based on business needs, we'll choose the systems that fit, considering price, scalability, and the features you need to keep growing. We'll then set up your email, file storage, forms, and invoicing, and connect them so they work together.",
  },
  {
    id: "business-basics",
    title: "Business Basics",
    problem:
      "Email comes from a free personal account. The intake form collects too little, so details get gathered later and written down wherever is handy. There is no set way to take a payment.",
    scope: "Domain setup, business email, intake form, payment setup",
    systems: "Email, domain, forms, payments",
    solution:
      "We'll improve your professional presence by setting up your business email on your own domain. The intake form we design collects the right details up front and sends the results exactly where you need them, whether that's email or a CRM. We'll also give clients a clear way to pay.",
  },
  {
    id: "platform-migration",
    title: "Platform Migration",
    problem:
      "The business relies on spreadsheets and docs, or on a tool it has outgrown. Records are slow to load and hard to search. There has never been an established way to store records (names, formats, categories, folder grouping), so moving them feels risky.",
    scope: "System selection, data cleanup, data transfer, testing, team training",
    systems: "Databases, spreadsheets, project management tools, client records",
    solution:
      "A new platform should support your business data for years to come, so you aren't moving into a system you'll quickly outgrow. I'll run the migration as a project, reviewing your data, then cleaning and organizing it where needed so it fits the new platform. Once the data is moved and tested, I'll train your team before you turn off the old system.",
  },
  {
    id: "client-communication",
    title: "Client Communication",
    problem:
      "Clients send requests by email, text, phone call, or social DM. Changes get missed when nobody is notified. Clients reach out to ask where things stand.",
    scope: "Portal design, request notifications and status tracking, client onboarding",
    systems: "CRM, forms, invoicing",
    solution:
      "Ideally, you would see all client communication in one place, even if it originates across multiple channels. We would assess the need to design a client portal where clients can place requests and check status without having to contact you. Request notifications will keep you and your team on top of follow-ups.",
  },
  {
    id: "work-assignment-and-pay",
    title: "Work Assignment and Pay",
    problem:
      "Work gets handed out through texts and group chats. Nobody has one view of who is doing what, or who has room for more. Hours and pay get pieced together at the end of each pay period.",
    scope: "Workload mapping, assignment process, pay rules setup, team rollout",
    systems: "Staff and contractor records, scheduling, time tracking, payroll",
    solution:
      "Assigning work in a centralized system allows everyone to see what's going on and when. I'll map your team's workload and connect your pay rules to time tracking, so resource and pay management become easier to reconcile.",
  },
  {
    id: "automation",
    title: "Automation",
    problem:
      "The same steps get repeated by hand. Reminders and follow-ups depend on someone remembering. Tasks that could happen on their own wait on a person.",
    scope: "Workflow review, automation setup, testing, documentation",
    systems: "Forms, email, calendars, CRM",
    solution:
      "I'll automate repeated steps wherever it makes sense, either through native system settings or with tools like Zapier or Make.",
  },
  {
    id: "system-integration",
    title: "System Integration",
    problem:
      "The same information gets typed into more than one system. Copies drift apart over time, and nobody is sure which one is right. Passing work from one person to the next means copying details over by hand.",
    scope: "Data flow mapping, system connections, field matching, testing",
    systems: "CRM, scheduling, invoicing, email",
    solution:
      "Your business data should have a single source of truth. I'll map how data flows (or doesn't flow) between your systems, then connect them so information entered once appears everywhere it's needed.",
  },
  {
    id: "report-building",
    title: "Report Building",
    problem:
      "There is no regular reporting. Decisions come from gut feel and the bank balance. Nobody can say which parts of the business perform best.",
    scope: "Metrics review, data normalization, data source connections, dashboard setup",
    systems: "Analytics dashboards, sales and booking records",
    solution:
      "We'll identify the metrics that matter most to your business. I'll normalize your data and connect it to a dashboard that shows which parts of the business perform best.",
  },
  {
    id: "time-off-and-reviews",
    title: "Time Off and Reviews",
    problem:
      "Time off management is unstructured. Requests come in by text or email, and some never get written down. Nobody can check a PTO balance without asking. Performance reviews happen when someone remembers, or not at all.",
    scope: "Time off policy setup, accrual rules, review process design, staff training",
    systems: "Staff records, time off tracking, review forms, payroll",
    solution:
      "Time off requests and PTO balances belong in one system your team can check without having to ask. I'll configure your policy and accrual rules and design a consistent review process.",
  },
  {
    id: "process-documentation",
    title: "Process Documentation",
    problem:
      "Answers live in a few people's heads. New hires learn by asking around. Reference material sits across old docs and email threads.",
    scope: "Process interviews, written procedures, content organization, team training",
    systems: "Shared docs, wikis, training materials, onboarding checklists",
    solution:
      "I'll build a knowledge base, organizing the processes you already have documented and creating documentation where none exists. Written procedures and onboarding checklists are searchable in one place, so new hires can find answers on their own.",
  },
];
