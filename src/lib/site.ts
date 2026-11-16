// The live site's address. Canonical tags, og:url, schema, the sitemap and
// the slash redirects all build full addresses from it (see vite.config.ts for
// the last two). public/robots.txt names the sitemap's address by hand, so it
// has to change too if this ever does.
export const SITE_URL = "https://deebuilt.co";

/** A page's full address, from its path: "/about" -> "https://deebuilt.co/about". */
export function pageUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}

/** The canonical tag for a page's head() links. */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: pageUrl(path) };
}
