import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

/**
 * Exists only so the build can write 404.html (the "/404" page in
 * vite.config.ts). Cloudflare serves that file, with a 404 status, for every
 * address that has no page. It is left out of the sitemap and marked noindex.
 */
export const Route = createFileRoute("/404")({
  head: () => ({
    meta: [{ title: "Page not found — DeeBuilt" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFound,
});
