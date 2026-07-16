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
  title: string;
  description: string;
};

/** What DeeBuilt is hired for, back-end first. Shown on the home page. */
export const services: Service[] = [
  {
    index: "01",
    title: "Back-end & systems",
    description:
      "The database and internal tools a business runs on.",
  },
  {
    index: "02",
    title: "Custom integrations & APIs",
    description: "Connect separate tools so information moves on its own.",
  },
  {
    index: "03",
    title: "Automation setup",
    description: "Automate manual steps that consume billable hours.",
  },
  {
    index: "04",
    title: "Websites & web apps",
    description: "Custom front ends built on strategic systems.",
  },
];

export const BOOKING_URL =
  "https://opsette.io/booking/deebuilt/discovery-call";
export const SPEC_URL = "https://spec.deebuilt.co/";
export const DEMO_URL = "https://demo.deebuilt.co/";
export const YOUTUBE_URL = "https://www.youtube.com/@DeeBuiltSystems";

/** Opsette-hosted forms. Scored lead-magnet quiz + generic contact capture. */
export const ASSESSMENT_URL =
  "https://opsette.io/f/deebuilt/see-how-your-operations-actually-stack-up";
export const CONTACT_FORM_URL = "https://opsette.io/f/deebuilt/get-in-touch";
