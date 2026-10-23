import { ASSESSMENT_URL } from "@/content/projects";

/**
 * Resources page entries (src/routes/resources.tsx). Added 2026-10-21.
 * Plan: docs/EMBEDDED_FORMS_AND_RESOURCES_PLAN.md, Part 3.
 *
 * ORGANIZED BY STAGE (hers, 2026-10-21): Launching / Scaling / Reorganizing,
 * the same three words as the home page, so a visitor lands where they
 * qualify. The assessment is the Reorganizing section's featured entry.
 *
 * Listed and live: StartUp Planner, Signature Studio, Brand Board, the
 * assessment, the New Business Systems Workbook, and the
 * Platform Migration Checklist (PDFs), and Decision Lab (link pending its
 * repo move). Nothing on the page is "Coming soon" anymore. More tools are live but deliberately not
 * listed; see the note in the Launching entries below. Placeholder titles, descriptions, and button labels are plain
 * stand-ins; she writes the real copy, and button labels get workshopped (one
 * per card, none reused).
 *
 * Adding a resource is one entry in `resources` below. No href = "Coming
 * soon" and not clickable. Tools open in a new tab; downloads use files in
 * public/resources/.
 *
 * "StartUp Planner" is spelled the way the app spells it.
 */

export type Stage = "launching" | "scaling" | "reorganizing";

export type ToolResource = {
  kind: "tool";
  stage: Stage;
  title: string;
  description: string;
  /** Button label. Placeholder until workshopped */
  cta: string;
  href?: string;
  /** The stage's focal card. One per stage at most */
  featured?: boolean;
  /** A real screenshot of the tool, shown on a featured card */
  image?: { src: string; alt: string; width: number; height: number };
};

export type DownloadResource = {
  kind: "download";
  stage: Stage;
  title: string;
  description: string;
  /** "PDF" */
  fileType: string;
  /** "2 pages" */
  length: string;
  href?: string;
};

export type Resource = ToolResource | DownloadResource;

export const resourcesPage = {
  title: "Free resources.",
  subtitle: "Free to use, no sign-up.",
  jumpPrompt: "Where are you now?",
} as const;

/**
 * Section order and the words each section opens with. `label` is the short
 * word in the opener's jump nav (hers, 2026-10-23: the -ing forms ran too
 * long on a phone).
 */
export const stages: { id: Stage; name: string; label: string; description: string }[] = [
  {
    id: "launching",
    name: "Launching.",
    label: "Launch",
    description: "For getting a new business set up.",
  },
  {
    id: "scaling",
    name: "Scaling.",
    label: "Scale",
    description: "For a business adding people, clients, and work.",
  },
  {
    id: "reorganizing",
    name: "Reorganizing.",
    label: "Reorganize",
    description: "For a business whose systems need sorting out.",
  },
];

export const resources: Resource[] = [
  // Launching
  {
    kind: "tool",
    stage: "launching",
    title: "StartUp Planner",
    // Hers, 2026-10-21.
    description: "Plan the first steps of launching a business, with a first-year budget.",
    cta: "Start planning",
    href: "https://tools.deebuilt.co/startup-planner/",
    featured: true,
    image: {
      src: "/resources/startup-planner-budget.png",
      alt: "StartUp Planner budget summary showing one-time, monthly, and annual costs adding up to a year 1 total",
      width: 424,
      height: 465,
    },
  },
  {
    kind: "tool",
    stage: "launching",
    title: "Signature Studio",
    // Hers, 2026-10-21.
    description: "Sign off your emails in style.",
    cta: "Build a signature",
    href: "https://tools.deebuilt.co/signature-studio/",
  },
  {
    kind: "tool",
    stage: "launching",
    title: "Brand Board",
    // Hers, 2026-10-21.
    description: "Build and share your brand kit.",
    cta: "Make a brand board",
    href: "https://tools.deebuilt.co/brand-board/",
    // Her DeeBuilt sample kit (an older design, on purpose: it's a sample,
    // not a mirror of this site). Shown as a strip cropped to the top.
    image: {
      src: "/resources/brand-board-palette.png",
      alt: "Brand Board sample for DeeBuilt showing the logo, tagline, and a palette of labeled color swatches",
      width: 820,
      height: 684,
    },
  },
  // LIVE BUT NOT LISTED (hers, 2026-10-21). These tools are live on
  // tools.deebuilt.co but don't get their own card: Palette Studio, Icon
  // Kit, and Banner Designer overlap Brand Board, which already covers
  // palette, icons, and social sizes, and QR Creator says nothing about her
  // work. To list one, move it back into this array as a normal entry.
  //   Palette Studio   https://tools.deebuilt.co/palette-studio/
  //   Icon Kit         https://tools.deebuilt.co/icon-kit/
  //   Banner Designer  https://tools.deebuilt.co/banner-designer/
  //   QR Creator       https://tools.deebuilt.co/qr-creator/
  {
    kind: "download",
    stage: "launching",
    // Hers, 2026-10-21. Fillable PDF: checklist, add-on systems, and a system
    // inventory table. Subtitle is the PDF's own.
    title: "New Business Systems Workbook",
    description: "The systems most new businesses need in their first month.",
    fileType: "PDF",
    length: "3 pages",
    href: "/resources/new-business-systems-workbook.pdf",
  },

  // Scaling
  {
    kind: "tool",
    stage: "scaling",
    // Her app. The link goes straight to the platform picker, which is what
    // the screenshot shows. ⚠️ The URL is the one it WILL have once she moves
    // the repo to tools.deebuilt.co (2026-10-21); it 404s until then. Check
    // it before shipping.
    title: "Decision Lab",
    description:
      "Work through the decisions that come with growth, like which platform fits your team now and what you'll need next.",
    cta: "Find your platform",
    href: "https://tools.deebuilt.co/decision-lab/platform-picker",
    featured: true,
    image: {
      src: "/resources/decision-lab-platform-picker.png",
      alt: "Decision Lab's Platform Picker card asking how comfortable your team is with new software, with seven platform logos and a ranking preview",
      width: 498,
      height: 324,
    },
  },
  // SmartFlow (her flowchart app) is hidden until it's up to standard
  // (2026-10-21). Placeholder line was "Map how work moves through your
  // business as a flowchart."
  // Scaling has no templates (hers, 2026-10-21): the process documentation
  // and new hire onboarding placeholders were cut, and so was Icebreaker.

  // Reorganizing
  {
    kind: "tool",
    stage: "reorganizing",
    // Title and description are her copy from the home page assessment band.
    title: "See how your operations stack up.",
    description: "About two minutes to get your score.",
    cta: "Take the full assessment",
    href: ASSESSMENT_URL,
    featured: true,
  },
  // File Builder (https://tools.deebuilt.co/file-builder/) is live but not
  // listed: she doesn't think it belongs in Reorganizing (2026-10-21).
  {
    kind: "download",
    stage: "reorganizing",
    // Hers, 2026-10-21. Fillable PDF: clean up, map, test, and a field map.
    title: "Platform Migration Checklist",
    // Hers, 2026-10-21 (shorter than the PDF's own subtitle on purpose).
    description: "Clean up, map, and test before moving from one system to another.",
    fileType: "PDF",
    length: "3 pages",
    href: "/resources/platform-migration-checklist.pdf",
  },
];
