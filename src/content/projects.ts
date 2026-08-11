/**
 * Live = clickable and working (sign-up included).
 * Demo = viewable front end, sign-up no longer active.
 * Personal project = learning/side work, honestly labeled.
 */
export type ProjectStatus =
  | "Live"
  | "Live · redesign in progress"
  | "Personal project"
  | "Demo";

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
    description:
      "A suite of 20+ standalone tools that plug into the Opsette consulting platform.",
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
    title: "Ezii Quote Builder",
    description:
      "A quote builder for service businesses to define services and generate estimates.",
    href: "https://www.ezii.io/home",
    index: "05",
    status: "Demo",
    stack: ["Next.js", "Supabase"],
  },
  {
    title: "Pet Karma",
    description:
      "A scheduling app for coordinating vacation pet care between friends.",
    href: "https://petkarma.app/",
    index: "06",
    status: "Demo",
    stack: ["Next.js", "Scheduling"],
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
   */
  symptom: string;
};

/** What DeeBuilt is hired for, back-end first. Shown on the home page. */
export const services: Service[] = [
  {
    index: "01",
    symptom: "“Nobody can tell me where a project stands.”",
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
    symptom: "“The same manual steps come back every week.”",
    title: "Automation",
    description:
      "I take the repeat steps off your team's plate and hand them to software.",
  },
  {
    index: "04",
    symptom: "“We pay for software that fits us badly.”",
    title: "Internal tools & web",
    description:
      "I find software that fits, or build what's missing when nothing does.",
  },
];

/**
 * Positioning copy. Kept here so the words can change without touching layout.
 *
 * The niche is a STAGE of company, not an industry or an age. A 20-year-old
 * business hits this too. The through-line is the SEAMS: the handoffs between
 * tools, teams, and steps, where work stalls and gets retyped.
 *
 * Deliberately avoided: "growing companies" (excludes established ones),
 * "patched together" / "mess" / "chaos" (nobody self-identifies as chaotic),
 * and "actually" (empty intensifier).
 *
 * The hero headline is her NAME, plainly. Not a greeting and not a slogan —
 * a single-practitioner site states who this is, and the role line carries
 * the positioning.
 */
export const positioning = {
  /** Sits above the headline. States the role, not a service list. */
  role: "Fractional Operations Strategist",
  headline: "Ruthnie Benoit",
  /**
   * "On call" carries the retainer/accessible idea without saying either.
   * The second sentence is the temperament line: an invitation, not a pitch.
   * It stays deliberately broad so it covers all four services rather than
   * diagnosing one problem the way an integrations-specific line would.
   */
  lede:
    "Operations and systems support, on call. Tell me what you're feeling and I'll tell you what you need.",
} as const;

export const BOOKING_URL =
  "https://opsette.io/booking/deebuilt/discovery-call";
export const SPEC_URL = "https://spec.deebuilt.co/";
export const DEMO_URL = "https://demo.deebuilt.co/";
export const YOUTUBE_URL = "https://www.youtube.com/@DeeBuiltSystems";

/** Opsette-hosted forms. Scored lead-magnet quiz + generic contact capture. */
export const ASSESSMENT_URL =
  "https://opsette.io/f/deebuilt/see-how-your-operations-actually-stack-up";
export const CONTACT_FORM_URL = "https://opsette.io/f/deebuilt/get-in-touch";
