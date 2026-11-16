# SEO fixes plan

Fix the gaps that keep deebuilt.co from being fully readable to search engines and AI tools, without moving off TanStack Start.

Written 2026-11-14, after the Little Drop Lactation Astro move (`C:\DeeBuilt-Org\little-drop-lactation\docs\ASTRO_PLAN.md`). Decisions below are final.

## Why not Astro

The main reason Little Drop Lactation moved to Astro was that its pages were empty until JavaScript ran. deebuilt.co doesn't have that problem: TanStack Start prerenders every page (`prerender` in `vite.config.ts`), and a live check on 2026-11-14 confirmed that `/`, `/services`, `/about`, `/portfolio` and `/resources` all reach crawlers as HTML with their wording, their own title, heading, description and canonical tag.

Moving to Astro makes sense later, when the AI Answer Pages library (`~/.claude/AI_ANSWER_PAGES.md`) starts on deebuilt.co. Little Drop Lactation's template already has the answers collection, schema checks and off switch for that.

## What the live check found

| Gap | What happens now | Why it matters |
|---|---|---|
| No `robots.txt` | `/robots.txt` returns the homepage HTML | Crawlers get no rules and no sitemap address |
| No sitemap | `/sitemap.xml` returns the homepage HTML | Nothing to submit to Google Search Console |
| No real 404 | Any made-up address shows the homepage with a 200 status (`not_found_handling: "single-page-application"` in `wrangler.jsonc`) | Google treats these as soft 404s, which can look like endless duplicate pages |
| No schema | No JSON-LD on any page | Nothing tells search engines who Ruthnie is or what DeeBuilt offers |
| Relative canonical tags | `href="/about"`, hardcoded in each route file | Google accepts it, but recommends full addresses; one shared helper is cleaner |
| Temporary slash redirect | `/about/` redirects to `/about` with a 307 | A 301 tells search engines the address is permanent |

## Steps

Ruthnie checks each step in the dev server (port 8300), then a typecheck, then a commit and push. Every push to `main` deploys. This is a Vite-based app, so a build may run with the dev server open. A build is needed for the 404, robots and sitemap steps, since they change what the build outputs.

- [x] **A. Site address and canonical tags.**
  - One shared constant for the live address (`https://deebuilt.co`) and a small helper that builds a page's full canonical address from its path.
  - Each route's `head()` uses the helper instead of hardcoding `href: "/about"`.
- [x] **B. robots.txt and sitemap.**
  - `public/robots.txt`: allow Googlebot, Bingbot, OAI-SearchBot, ChatGPT-User, PerplexityBot and Claude-SearchBot, allow everything else, and name the sitemap's full address. Copy the shape of Little Drop Lactation's `public/robots.txt`.
  - A sitemap generated at build time from the prerendered pages, so a new page is added automatically. Check first whether TanStack Start's own config has a sitemap option; if not, write it from the prerendered page list after the build. Don't hand-maintain a list.
  - Confirm after the build that `dist/client/robots.txt` and the sitemap file exist and are real text and XML, not the homepage.
- [x] **C. A real 404.**
  - Make the build output a `404.html` with the existing `NotFoundComponent` content, and set `not_found_handling: "404-page"` in `wrangler.jsonc`, so unknown addresses get that page with a 404 status.
  - Keep the `prerender.filter` that skips file paths (it protects the PDFs in `public/resources`).
  - Check that real pages, the PDFs, and `/solutions` (its `_redirects` rule) still work.
- [x] **D. Schema.**
  - Homepage: `Person` (Ruthnie Benoit) and `ProfessionalService` (DeeBuilt) linked to each other, with the site's address, a description, and `areaServed`. Use the facts already on the site; don't invent credentials.
  - Services page: a `Service` entry for each offer, with the business as `provider`.
  - Every page except the homepage: `BreadcrumbList`.
  - Put the schema builders in one shared file, as Little Drop Lactation does in `src/lib/schema.ts`.
- [x] **E. Permanent slash redirects.**
  - Make `/about/` → `/about` (and the same for each page) a 301. `html_handling: "drop-trailing-slash"` stays as it is. Little Drop Lactation generates its redirects from the built pages (`permanentSlashRedirects` in its `astro.config.mjs`); do the same here, and keep the existing `/solutions /services 301` rule.
- [ ] **F. Live checks.**
  - `curl` every page: 200, with its wording and a full canonical address.
  - A made-up address returns 404.
  - `/robots.txt` and the sitemap return text and XML.
  - `/about/` returns a 301.
  - Request the site as each crawler in step B. All of them get the page.

## Ruthnie's part, after step F

Follow section 5 of `C:\DeeBuilt-Org\little-drop-lactation\docs\CLIENT_SITE_CHECKLIST.md`:

- [ ] Google Search Console → add deebuilt.co as a Domain property and verify it through Cloudflare.
- [ ] Submit the sitemap.
- [ ] URL Inspection → Test live URL on the homepage.
- [ ] Check indexed pages a week later.

## Later

- **The answers library and the Astro move**, together, following `AI_ANSWER_PAGES.md`.

## Progress

### 2026-11-15: steps A to E built, not yet committed

Built and checked locally with one build and a clean `npx tsc --noEmit`. Step F waits on the deploy.

- **A.** `src/lib/site.ts` has `SITE_URL`, `pageUrl()` and `canonicalLink()`. Every route's canonical tag and `og:url` (which was also relative) now use them.
- **B.** `public/robots.txt` copies Little Drop Lactation's file. TanStack Start's own sitemap option was checked and not used: it lists every link the crawler saw, including the PDFs and `/#get-in-touch`, and it publishes a `pages.json`. Instead, `vite.config.ts` collects each page in the prerender's `onSuccess` and writes `dist/client/sitemap.xml` from that list (no `lastmod`, because the build date isn't when a page changed). The build wrote 5 addresses: `/`, `/about`, `/portfolio`, `/resources`, `/services`.
- **C.** The 404 content moved to `src/components/NotFound.tsx`. The root's `notFoundComponent` and a new `/404` route (`src/routes/404.tsx`, marked noindex) both use it. The build prerenders `/404` to `dist/client/404.html`, and `wrangler.jsonc` is now `"not_found_handling": "404-page"`. The `prerender.filter` stays, and the PDFs came out intact. Side effect: the address `/404` itself shows that page with a 200 status. It is noindex, nothing links to it, and it is left out of the sitemap.
- **D.** `src/lib/schema.ts` holds the builders. Homepage: `Person` and `ProfessionalService`, linked by `@id`. Services: a `BreadcrumbList` plus one `Service` for each of the 6 offers. About, Portfolio and Resources: `BreadcrumbList`. The schema is rendered through `head().scripts`, because the React package types `meta` as plain meta tags only. `areaServed` is the United States; the site doesn't state it, so Ruthnie should confirm it.
- **E.** The same `onSuccess` step writes `dist/client/_redirects`: the hand-written rules in `public/_redirects` (`/solutions /services 301`) first, then `/about/ /about 301` and the same for each page. Little Drop Lactation's live site confirmed that Cloudflare applies `_redirects` before its own slash handling.
- **F.** Still open, after the deploy. Also check that a made-up address hydrates without errors in the browser console, since `404.html` was rendered for `/404`.
