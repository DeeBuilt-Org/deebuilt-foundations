/**
 * Live = clickable and working (sign-up included).
 * Demo = viewable front end, sign-up no longer active. No entry carries this
 * today — Ezii Quote Builder and Pet Karma were pulled 2026-08-19 (her call:
 * Ezii wasn't worth naming, and Pet Karma's front end shows early work). The
 * status stays defined because either could come back.
 * Personal project = learning/side work, honestly labeled.
 */
export type ProjectStatus = "Live" | "Live · redesign in progress" | "Personal project" | "Demo";

export type Project = {
  title: string;
  description: string;
  index: string;
  status: ProjectStatus;
  /** Tech/stack tags shown as mono chips */
  stack: string[];
  /** Only set when the link survives a click. Archived projects omit it. */
  href?: string;
  /** Surfaced in the home page "Selected work" strip. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Opsette",
    description:
      "A platform for consultants to run clients, projects, and operations in one place.",
    href: "https://opsette.io/",
    index: "01",
    status: "Live · redesign in progress",
    stack: ["Next.js", "Supabase"],
    featured: true,
  },
  {
    title: "Opsette Tools",
    description: "A suite of 20+ standalone tools that plug into the Opsette consulting platform.",
    href: "https://tools.opsette.io/",
    index: "02",
    status: "Live",
    stack: ["Vite", "Tools suite"],
    featured: true,
  },
  {
    title: "The Midterm Project",
    description:
      "A voter resource hub for finding elections, checking registration, and reading the ballot.",
    href: "https://themidtermproject.org/",
    index: "03",
    status: "Live",
    stack: ["Astro", "Civic Data"],
    featured: true,
  },
  {
    title: "G-Up",
    description:
      "A coding guide with a live SQL playground for working through queries against real data.",
    href: "https://g-up-coding.vercel.app/anatomy",
    index: "04",
    status: "Personal project",
    stack: ["Astro", "SQL"],
  },
  {
    title: "Read Amour",
    description:
      "A poster maker for readers — search a book, drop its cover in, and save the image to post.",
    href: "https://readamour.com/",
    index: "05",
    status: "Personal project",
    stack: ["Vite", "PWA"],
  },
];

export type Service = {
  index: string;
  /** Service name. The verdict on the back of the card. */
  title: string;
  /**
   * What Ruthnie does about it. Every one of these starts with "I" and names
   * an action — no end-state descriptions, and no naming specific tools a
   * visitor may not use.
   */
  description: string;
  /**
   * The symptom a visitor recognizes in their own business, in their words.
   * This is the FRONT of the card and the only thing visible until they flip.
   *
   * Phrase these as CONDITIONS, not confessions. "It's hard to keep track of
   * project status" describes a system someone can hand over; "We lose track
   * of project status" is an admission of failure, and a visitor who has to
   * blame themselves to qualify will just decide the card isn't them.
   */
  symptom: string;
};

/** What DeeBuilt is hired for, back-end first. Shown on the home page. */
export const services: Service[] = [
  {
    index: "01",
    symptom: "“It's hard to keep track of project status.”",
    title: "Operations discovery",
    description:
      "I follow each project end to end and map every place it stalls. You keep the map whether or not you hire me.",
  },
  {
    index: "02",
    symptom: "“We enter the same information in more than one place.”",
    title: "Integrations & APIs",
    description:
      "I connect your systems so information entered once shows up everywhere it belongs.",
  },
  {
    index: "03",
    symptom: "“The repeated manual steps are driving us crazy.”",
    title: "Automation",
    description: "I take the repeat steps off your team's plate and hand them to software.",
  },
  {
    index: "04",
    symptom: "“We pay for software that isn't worth what it costs.”",
    title: "Internal tools & web",
    description: "I find software that fits, or build what's missing when nothing does.",
  },
];

/**
 * Positioning copy. Kept here so the words can change without touching layout.
 *
 * The niche is a STAGE of company, not an industry or an age. A 20-year-old
 * business hits this too.
 *
 * Deliberately avoided: "growing companies" (excludes established ones),
 * "patched together" / "mess" / "chaos" (nobody self-identifies as chaotic),
 * and "actually" (empty intensifier).
 *
 * LAYOUT NOTE (2026-08-14): `headline` and `role` no longer lead the hero.
 * Launch / Scale / Reorganize carries the positioning (see StateCycle), and
 * the name + role now sit together on the portrait as a name plate. Both
 * fields are still used — just not as the visual lead.
 */
export const positioning = {
  /**
   * Sits above the headline. States the role, not a service list.
   *
   * Changed 2026-08-19 from "Fractional Operations Strategist". Her call:
   * "fractional" reads ahead of where she is, and the title didn't match her
   * business card, which says "automation and systems consultant." This is the
   * card, with "Operations" restored in front — it's the word buyers search,
   * and it's the through-line of the rest of the site.
   *
   * NOTE: the lede comment below rejects "consulting" as "a delivery model,
   * not a skill." That reasoning holds for the LEDE and does not apply here.
   * A job title is supposed to name the delivery model alongside the skill,
   * so "Consultant" is correct in this slot. Do not revert on that grounds.
   */
  role: "Operations, Automation, and Systems Consultant",
  headline: "Ruthnie Benoit",
  /**
   * Hers, settled 2026-08-14.
   *
   * "Design" was her call and it's the word that makes "strategist" cohere —
   * a strategist designs how a system should work. Rejected on the way here:
   * "support" (what a helpdesk does), "leadership" (implies running someone
   * else's team), and "consulting" (a delivery model, not a skill — that
   * reasoning is scoped to this lede, not to the role above).
   *
   * "At any stage" instead of naming the stages: Launch / Scale / Reorganize
   * sit directly above this line and already do the audience work. Spelling
   * them out again repeated "scale" on one screen.
   *
   * Availability (on call / ongoing / project-based) deliberately left out —
   * it's an engagement detail and it belongs on the plans page.
   */
  lede: "Operations and systems design for businesses at any stage.",
} as const;

export const BOOKING_URL = "https://opsette.io/booking/deebuilt/discovery-call";
export const SPEC_URL = "https://spec.deebuilt.co/";
export const YOUTUBE_URL = "https://www.youtube.com/@DeeBuiltSystems";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/ruthnie-benoit-7a567265/";

/** Opsette-hosted forms. Scored lead-magnet quiz + generic contact capture. */
export const ASSESSMENT_URL =
  "https://opsette.io/f/deebuilt/see-how-your-operations-actually-stack-up";
export const CONTACT_FORM_URL = "https://opsette.io/f/deebuilt/get-in-touch";
