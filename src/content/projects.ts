/**
 * Live = clickable and working (sign-up included).
 * Demo = viewable front end, sign-up no longer active. No entry carries this
 * today. Ezii Quote Builder and Pet Karma were both pulled 2026-08-19 (her
 * call: Ezii wasn't worth naming, and Pet Karma's front end showed early
 * work). Pet Karma came back 2026-08-22 as entry 06, redesigned, with sign-up
 * open. Ezii stays off. The status stays defined because Ezii could return.
 *
 * "Personal project" was removed as a status 2026-08-22 (hers). It was on G-Up
 * and Read Amour, and both are live: anyone can open them and use them. The
 * label was splitting the list into real work and lesser work when the only
 * fact a visitor needs is whether the link works.
 */
export type ProjectStatus = "Live" | "Live · redesign in progress" | "Demo";

export type Project = {
  title: string;
  description: string;
  index: string;
  status: ProjectStatus;
  /** Tech/stack tags shown as mono chips */
  stack: string[];
  /** Only set when the link survives a click. Archived projects omit it. */
  href?: string;
  /** Surfaced in the home page "My apps" strip. */
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
    stack: ["Next.js", "SQL"],
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
    status: "Live",
    stack: ["Astro"],
  },
  {
    title: "Read Amour",
    description:
      "A mobile-first poster maker to share your reading journey online.",
    href: "https://readamour.com/",
    index: "05",
    status: "Live",
    stack: ["Vite", "PWA"],
  },
  {
    /**
     * Description is Ruthnie's, dictated 2026-08-22 and tightened by her the
     * same day (the first version said "plan trips for when they're going to
     * be out" and closed on "while they're out," which said it twice). Do not
     * rewrite it into a pitch. The nouns are already real
     * (trips, friend group, shifts, pets), which is what §1 of VOICE.md asks
     * for, and every rewrite would be swapping her plain words for fancier
     * ones (§3.5: reach for the more specific word, not the fancier one).
     *
     * Status is Live: petkarma.app was checked 2026-08-22 and sign-up is open.
     */
    title: "Pet Karma",
    description:
      "A pet care share app where users can plan their trips, and their friend group can take on shifts to care for their pets while they're out.",
    href: "https://petkarma.app/",
    index: "06",
    status: "Live",
    stack: ["Next.js", "SQL"],
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

/**
 * Certification verification pages. Both are public and carry her name.
 *
 * HubSpot's is the URL from their own badge embed snippet. Airtable verifies
 * through Skilljar, the platform running their academy, which is why the
 * domain isn't airtable.com.
 *
 * Both certifications expire: Airtable 2026-09-26, HubSpot 2028-09-27. A
 * lapsed certification on the site is worse than none, so both come off if
 * they aren't renewed.
 */
export const HUBSPOT_CERT_URL =
  "https://app-na2.hubspot.com/academy/achievements/v48n2h9z/en/1/ruthnie-benoit/hubspot-revenue-operations-certified";
export const AIRTABLE_CERT_URL = "https://verify.skilljar.com/c/6r6mi3w523wn";

/**
 * Opsette-hosted forms. Scored lead-magnet quiz + generic contact capture.
 *
 * The ?s= parameter is Opsette's link source tracking, added 2026-08-30. It
 * tags which link a submission came from, so it has to survive any edit here.
 * Dropping it doesn't break the form, it just makes the submission land
 * unattributed.
 *
 * Slugs are unchanged. business-systems-review is a DIFFERENT Opsette form
 * and is not the one behind "Take the full assessment" on this site.
 */
export const ASSESSMENT_URL =
  "https://opsette.io/f/deebuilt/see-how-your-operations-actually-stack-up?s=anOQuuXEW_tM";
export const CONTACT_FORM_URL = "https://opsette.io/f/deebuilt/get-in-touch?s=G6MEhvk02qEo";
