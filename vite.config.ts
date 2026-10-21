// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Pinned to match DEV_SERVERS.md (83xx = DeeBuilt org / personal site).
  // Without this the Lovable preset falls back to 8080, which collides with
  // whatever else is running.
  vite: {
    server: { port: 8300, strictPort: true },
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
    },
    pages: [
      { path: "/" },
      { path: "/about" },
      { path: "/portfolio" },
    ],
  },
});
