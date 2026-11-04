/**
 * The Airtable demo for the System Setup Sprint (hers, 2026-11-04). A
 * fictional cleaning company's system, so a business owner on spreadsheets can
 * click through what the Sprint builds. It opens in a pop-up from a link on the
 * home page and on the Services page, so it never makes either page busier.
 *
 * Each page is shared publicly and read-only from Airtable (Team plan). Paste
 * the page's share link here; the embed address is derived from it. The demo
 * dates stay current on their own, so the embed never needs refreshing.
 */

export type DemoPage = {
  id: string;
  /** Tab label. */
  label: string;
  /** The page's public share link, as Airtable gives it. */
  shareUrl: string;
};

export const demoPages: DemoPage[] = [
  {
    id: "clients",
    label: "Clients",
    shareUrl: "https://airtable.com/appAvXy2h58NA3By5/shriaq7bJS7uD7OYL",
  },
  {
    id: "calendar",
    label: "Jobs calendar",
    shareUrl: "https://airtable.com/appAvXy2h58NA3By5/shrUw2YRE9sw5OZzl",
  },
  {
    id: "follow-ups",
    label: "Follow-ups",
    shareUrl: "https://airtable.com/appAvXy2h58NA3By5/shrrWQT5zQ9pEVr49",
  },
  {
    id: "vendors",
    label: "Vendors",
    shareUrl: "https://airtable.com/appAvXy2h58NA3By5/shruoWIEFS0wovYd6",
  },
  {
    id: "dashboard",
    label: "Jobs dashboard",
    shareUrl: "https://airtable.com/appAvXy2h58NA3By5/shr8IXvSyNPA913g5",
  },
];

/** https://airtable.com/app…/shr… becomes https://airtable.com/embed/app…/shr… */
export function toEmbedUrl(shareUrl: string): string {
  return shareUrl.replace("https://airtable.com/", "https://airtable.com/embed/");
}

export const sprintDemo = {
  /** The pop-up's title, and the link text on the home page. */
  link: "Click through an example in Airtable",
  /** The second button on the Sprint card. Hers, 2026-11-04. */
  button: "View demo in Airtable",
  caption: "Sample data for a fictional company. Everything is view-only.",
} as const;
