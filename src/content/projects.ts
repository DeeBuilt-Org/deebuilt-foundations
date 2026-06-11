export type Project = {
  title: string;
  description: string;
  href: string;
  index: string;
  /** Tech/stack tags shown as mono chips on the card */
  stack: string[];
  /**
   * Screenshot in /public. Drop a file (e.g. public/projects/opsette.png) and
   * set the path here. Leave undefined to render the styled placeholder.
   */
  image?: string;
};

export const projects: Project[] = [
  {
    title: "Opsette",
    description:
      "An all-in-one workspace for managing clients, tasks, scheduling, and internal operations.",
    href: "https://opsette.io/",
    index: "01",
    stack: ["Next.js", "Supabase", "Ops"],
    image: "/Opsette Business Toolkit.png",
  },
  {
    title: "The Midterm Project",
    description:
      "A voter resource hub for finding elections, checking registration, and understanding the ballot.",
    href: "https://themidtermproject.org/",
    index: "02",
    stack: ["Astro", "Civic Data"],
    image: "/The Midterm Project Home.png",
  },
  {
    title: "Ezii Quote Builder",
    description:
      "A quote builder for service businesses to create clients, define services, and generate clear estimates.",
    href: "https://www.ezii.io/home",
    index: "03",
    stack: ["Next.js", "Supabase"],
    image: "/Ezii Quote Builder Home.png",
  },
  {
    title: "Pet Karma",
    description:
      "Coordinate vacation pet care with friends through a simple scheduling app.",
    href: "https://petkarma.app/",
    index: "04",
    stack: ["Next.js", "Scheduling"],
    image: "/Pet Karma.png",
  },
];

export const BOOKING_URL =
  "https://opsette.io/booking/deebuilt/discovery-call";
export const YOUTUBE_URL = "https://www.youtube.com/@DeeBuiltSystems";
export const CONTACT_EMAIL = "hello@deebuilt.co";
export const FORMSPREE_ENDPOINT = "https://formspree.io/f/PLACEHOLDER";
