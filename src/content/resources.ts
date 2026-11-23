import type { PopupKey } from "@/components/EmbedPopup";
import { ASSESSMENT_URL, PLATFORM_PICKER_URL } from "@/content/projects";

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
 * soon" and not clickable. Every card opens in the site's pop-up so visitors
 * stay on deebuilt.co (2026-11-23; tools used to open a new tab). A tool's
 * `popup` names one of EmbedPopup's built-in pop-ups; without it, the tool's
 * own page loads in the pop-up. PDFs use files in public/resources/ and get
 * a page each (see DownloadResource).
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
  /**
   * A built-in pop-up to open instead of loading `href` in one, for a tool
   * that has a better embed (the assessment's Opsette form embed)
   */
  popup?: PopupKey;
  /** The stage's focal card. One per stage at most */
  featured?: boolean;
  /** A real screenshot of the tool, shown on a featured card */
  image?: { src: string; alt: string; width: number; height: number };
};

/**
 * A PDF. Each one gets its own page at /resources/<slug>
 * (src/routes/resources_.$slug.tsx), added 2026-11-23 so a shared link shows
 * a real preview card on Facebook and LinkedIn. A bare PDF link has no title,
 * description, or image for them to read. The page shows the PDF in the
 * browser, and the Resources page opens the same viewer in a pop-up.
 *
 * Adding a PDF: put the file in public/resources/, a 1200×630 share image
 * beside it, and one entry below. The page, the pop-up, and the sitemap
 * entry follow from that.
 */
export type DownloadResource = {
  kind: "download";
  stage: Stage;
  title: string;
  description: string;
  /** "PDF" */
  fileType: string;
  /** "2 pages" */
  length: string;
  /** The page's address: /resources/<slug> */
  slug: string;
  /** The file in public/resources/. No file = "Coming soon", no page */
  file?: string;
  /** 1200×630 image for the link preview card, in public/resources/ */
  shareImage?: string;
};

/** The page address for a PDF. */
export function downloadPath(file: DownloadResource): string {
  return `/resources/${file.slug}`;
}

/** The PDF with this page address, if it has a file to show. */
export function downloadBySlug(slug: string): DownloadResource | undefined {
  return resources.find(
    (r): r is DownloadResource => r.kind === "download" && r.slug === slug && Boolean(r.file),
  );
}

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
    slug: "new-business-systems-workbook",
    file: "/resources/new-business-systems-workbook.pdf",
    shareImage: "/resources/new-business-systems-workbook-share.png",
  },

  // Scaling
  {
    kind: "tool",
    stage: "scaling",
    // Her app. The link goes straight to the platform picker, which is what
    // the screenshot shows, and opens in the same pop-up the Services page
    // uses for it.
    title: "Decision Lab",
    description:
      "Work through the decisions that come with growth, like which platform fits your team now and what you'll need next.",
    cta: "Find your platform",
    href: PLATFORM_PICKER_URL,
    popup: "picker",
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
    popup: "assessment",
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
    slug: "platform-migration-checklist",
    file: "/resources/platform-migration-checklist.pdf",
    shareImage: "/resources/platform-migration-checklist-share.png",
  },
];
