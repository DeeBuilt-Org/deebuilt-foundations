/**
 * Solutions page copy. Hers, from "DeeBuilt Capability Cards" (2026-10-16),
 * copied in verbatim. Do not tighten or rephrase: every line follows the
 * writing pattern below, and earlier agent passes on this site drifted her
 * copy away from her by "improving" it.
 *
 * Writing pattern (from the same doc), for any card added later:
 * - Problem: full sentences, present tense, the business today. Two to
 *   three short sentences. Vary the first word across cards.
 * - Scope: noun phrases, comma-separated. One line.
 * - Systems: kinds of systems, no brand names. One line.
 * - Solution: full sentences, present tense, the business after. Two to three
 *   short sentences.
 *
 * Labels renamed 2026-10-23, hers: Starting point / Results became
 * Problem / Solution, a pair that matches the page name.
 * - No pronouns. One idea per sentence. Lists of two or four. No contrast
 *   pairs, no questions, no scenario setups, no em dashes.
 */

export type Solution = {
  /** Anchor on the Solutions page; the hero index links to it. */
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
  /**
   * Closing band under the eight entries, hers 2026-10-16. Speaks to a visitor
   * who recognized their business in a problem. Button labels on this
   * page are deliberately NOT the ones used on other pages.
   */
  closing: "Show me what you're working with.",
} as const;

export const solutions: Solution[] = [
  {
    id: "platform-migration",
    title: "Platform Migration",
    problem:
      "The business relies on spreadsheets and docs, or on a tool it has outgrown. Records are slow to load and hard to search. There has never been an established way to store records (names, formats, categories, folder grouping), so moving them feels risky.",
    scope: "System selection, data cleanup, data transfer, testing, team training",
    systems: "Databases, spreadsheets, project management tools, client records",
    solution:
      "Existing records move over intact, with a clear structure in place. The team knows where to save things and where to find them. Training happens before the old system is turned off.",
  },
  {
    id: "client-communication",
    title: "Client Communication",
    problem:
      "Clients send requests by email, text, phone call, or social DM. Changes get missed when nobody is notified. Clients reach out to ask where things stand.",
    scope: "Portal design, request notifications and status tracking, client onboarding",
    systems: "CRM, forms, invoicing",
    solution:
      "Clients place requests and check status in one place. Each change sends a notification to the team. Order history and invoices are visible to both the business and its clients.",
  },
  {
    id: "work-assignment-and-pay",
    title: "Work Assignment and Pay",
    problem:
      "Work gets handed out through texts and group chats. Nobody has one view of who is doing what, or who has room for more. Hours and pay get pieced together at the end of each pay period.",
    scope: "Workload mapping, assignment process, pay rules setup, team rollout",
    systems: "Staff and contractor records, scheduling, time tracking, payroll",
    solution:
      "Each person can see what is assigned and when it is due. Managers can see who has capacity before handing out more. Pay adds up from the work logged.",
  },
  {
    id: "automation",
    title: "Automation",
    problem:
      "Staff frequently repeat the same steps by hand. Reminders and follow-ups depend on someone remembering. Tasks that could happen on their own wait on a person.",
    scope: "Workflow review, automation setup, testing, documentation",
    systems: "Forms, email, calendars, CRM",
    solution:
      "Reminders and follow-ups go out on schedule. Each automation is written down, so the team knows what runs and when. Staff time goes toward work that needs a person, and repeated tasks are handled by the system.",
  },
  {
    id: "system-integration",
    title: "System Integration",
    problem:
      "The same information gets typed into more than one system. Copies drift apart over time, and nobody is sure which one is right. Passing work from one person to the next means copying details over by hand.",
    scope: "Data flow mapping, system connections, field matching, testing",
    systems: "CRM, scheduling, invoicing, email",
    solution:
      "Information entered once shows up where it is needed. Records match across systems. A handoff takes one click.",
  },
  {
    id: "report-building",
    title: "Report Building",
    problem:
      "There is no regular reporting. Decisions come from gut feel and the bank balance. Nobody can say which parts of the business perform best.",
    scope: "Metrics review, data normalization, data source connections, dashboard setup",
    systems: "Analytics dashboards, sales and booking records",
    solution:
      "Reports are generated on a predefined schedule. Numbers break down by service and by time period. Leadership can see where things stand at any time.",
  },
  {
    id: "time-off-and-reviews",
    title: "Time Off and Reviews",
    problem:
      "Time off management is unstructured. Requests come in by text or email, and some never get written down. Nobody can check a PTO balance without asking. Performance reviews happen when someone remembers, or not at all.",
    scope: "Time off policy setup, accrual rules, review process design, staff training",
    systems: "Staff records, time off tracking, review forms, payroll",
    solution:
      "Staff request time off and check balances in one place. A written policy lays out what to expect, so fewer questions come up. Reviews follow a consistent process built around each role.",
  },
  {
    id: "process-documentation",
    title: "Process Documentation",
    problem:
      "Answers live in a few people's heads. New hires learn by asking around. Reference material sits across old docs and email threads.",
    scope: "Process interviews, written procedures, content organization, team training",
    systems: "Shared docs, wikis, training materials, onboarding checklists",
    solution:
      "Procedures are written down and easy to search. New hires find answers without waiting on someone. Updates happen in one place, so the team works from the same version.",
  },
];
