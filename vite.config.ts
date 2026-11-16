// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { pageUrl } from "./src/lib/site";

// The client build, which Cloudflare uploads (wrangler.jsonc).
const clientDir = (file: string) => fileURLToPath(new URL(`./dist/client/${file}`, import.meta.url));

// Prerendered to 404.html, which Cloudflare serves for unknown addresses. It is
// not a page of its own, so it stays out of the sitemap and the redirects.
const NOT_FOUND_PATH = "/404";

// Every page the prerender wrote, filled in as each one finishes.
const builtPages = new Set<string>();

/**
 * Writes dist/client/sitemap.xml and dist/client/_redirects from the pages
 * built so far. It runs after each page, so the last run has every page, and
 * a new page is added with no list to update.
 *
 * TanStack Start has a sitemap option, but it lists every link the crawler
 * saw, including the PDFs and /#get-in-touch that the filter below skips, and
 * it also publishes a pages.json. This list holds only the real pages.
 *
 * _redirects: public/_redirects (hand-written rules, like /solutions) comes
 * first, then a 301 from each page's address with a trailing slash to the one
 * without it (/about/ -> /about). Cloudflare's own slash redirect is a
 * temporary 307; a 301 tells search engines the address is permanent.
 *
 * The sitemap has no lastmod: the build date isn't when a page changed, and
 * Google ignores lastmod values that aren't accurate.
 */
function writeSeoFiles() {
  const paths = [...builtPages].sort();

  const urls = paths.map((path) => `  <url><loc>${pageUrl(path)}</loc></url>`);
  writeFileSync(
    clientDir("sitemap.xml"),
    [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls,
      "</urlset>",
      "",
    ].join("\n"),
  );

  const handWritten = readFileSync(new URL("./public/_redirects", import.meta.url), "utf8").trimEnd();
  const slashRules = paths.filter((path) => path !== "/").map((path) => `${path}/ ${path} 301`);
  writeFileSync(clientDir("_redirects"), [handWritten, ...slashRules, ""].join("\n"));
}

export default defineConfig({
  // Pinned to match DEV_SERVERS.md (83xx = DeeBuilt org / personal site).
  // Without this the Lovable preset falls back to 8080, which collides with
  // whatever else is running.
  vite: {
    server: { port: 8300, strictPort: true },
    // Cloudflare's build machine caps open files. lucide-react's index pulls in
    // ~1,600 icon files, and Rollup's default of 1,000 parallel reads failed
    // there with EMFILE: too many open files (2026-11-04). Smaller batches stay
    // under the cap.
    build: { rollupOptions: { maxParallelFileOps: 100 } },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Prerender every page to static HTML at build time so the site can be
    // served by GitHub Pages (no Node server). The crawler starts at "/" and
    // follows in-app links; we also list pages explicitly to be safe.
    prerender: {
      enabled: true,
      crawlLinks: true,
      // Only prerender real pages. The crawler follows every link, and when
      // the Resources page started linking PDFs it fetched them and wrote
      // them back out as text, corrupting the files in dist (2026-10-21).
      // Skip anything ending in a file extension (public/ copies those as-is)
      // and on-page jumps like /#get-in-touch.
      filter: (page: { path: string }) =>
        !/\.[a-z0-9]+$/i.test(page.path) && !page.path.includes("#"),
      onSuccess: ({ page }: { page: { path: string } }) => {
        if (page.path === NOT_FOUND_PATH) return;
        builtPages.add(page.path);
        writeSeoFiles();
      },
    },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/portfolio" },
      {
        path: NOT_FOUND_PATH,
        prerender: { outputPath: "/404.html" },
        sitemap: { exclude: true },
      },
    ],
  },
});
