# Embedded Forms + Resources Page — Plan

Started 2026-10-21. Two pieces of work, in this order:

1. **Embed Opsette forms on deebuilt.co** so visitors fill them out here instead
   of being sent to opsette.io. Get in Touch first; the slimmed assessment and
   the platform picker quiz reuse the same component later.
2. **A Resources page** that lists free tools (they open in a new window) and
   downloadable files. Scaffold now, layout decided together, filled as tools
   are ready.

Out of scope, decided 2026-10-21: the `/hello` card page and Launch / Scale /
Reorganize picker (cards are already printed), blogging, Google Business
Profile.

---

## Part 1 — Embedded forms

### Why the embed never worked here

It was never the static hosting. Opsette's embed is a plain iframe, and Opsette
does not block other sites from framing `/embed/*` (no `X-Frame-Options` or
`frame-ancestors` set; `/embed` is a public route in `middleware.ts`).

The problem is that this site is React (TanStack Start). The HTML snippet from
Opsette's embed screen can't be pasted into a `.tsx` file as-is: React wants
`frameBorder` not `frameborder`, and `style` as an object, not a string. So the
paste errors or renders nothing. The fix is a component, not a paste.

### What Opsette gives us today

Snippet from Opsette's embed screen (Get in Touch):

```html
<iframe src="https://opsette.io/embed/form/deebuilt/get-in-touch"
  width="100%" height="600" frameborder="0" style="border: none;"></iframe>
```

URL options the embed page reads (`app/embed/form/[org]/[form]/page.tsx`):

| Param | Effect |
| --- | --- |
| `hideHeader=true` | Hides the form's own title block |
| `hideBranding=true` | Hides "Powered by Opsette" |
| `transparent=true` | Form background becomes transparent |
| `s=<token>` | Link source tracking, same as on `/f` links |

On submit, the embed already posts a message to the parent page:
`{ type: 'opsette-form-submit', formId, formSlug, success: true }`.

What it does **not** do yet: tell the parent page how tall it is. Height is
fixed (600px default). See Part 2 for the Opsette change.

### The component: `OpsetteFormEmbed`

New file `src/components/OpsetteFormEmbed.tsx`. One component for every
Opsette form on the site, so no page ever hand-writes an iframe.

Props:
- `form` — the form slug (`"get-in-touch"`)
- `source` — the `?s=` token for this placement
- `minHeight` — starting height before the form reports its own (default 600)
- `title` — accessible name for the iframe ("Get in touch form")
- options: `hideHeader`, `transparent` (branding is always hidden on our own site)

Behavior:
- Builds the URL from a single `OPSETTE_EMBED_BASE` constant in
  `src/content/projects.ts`, next to the existing `CONTACT_FORM_URL`.
- Renders the iframe full width, no border, `loading="lazy"` (both placements
  are low on the page).
- **Auto-height:** listens for `opsette-form-resize` messages. Only accepts a
  message when `event.origin === "https://opsette.io"` **and**
  `event.source` is this iframe's own window, so two forms on a page never
  resize each other. Until a message arrives, it uses `minHeight`, which means
  the component works today, before the Opsette change ships.
- **After submit:** on `opsette-form-submit`, scrolls the top of the iframe
  into view. The thank-you screen is much shorter than the form, and without
  this a visitor on a phone is left staring at empty space.
- Mobile: width is 100% of its column; nothing fixed-width.

Later, a `collapsed` mode for the assessment and platform picker: a button that
opens the form inline on click (her call, 2026-10-21). Same component, not a
second one.

### Placements (decided 2026-10-21)

**1. Solutions page, closing section** (`src/routes/solutions.tsx`, the
"Show me what you're working with." band). Replace the `Get in touch ↗` button
with the embedded form. Heading on the left, form on the right from `md` up;
stacked on a phone. Light background (`bg-surface-raised`), so
`transparent=true` works.

**2. Homepage, closing section** (`src/routes/index.tsx`, the dark
`bg-ink-wash` band). ⚠️ This band is dark. A transparent form here puts dark
form text on a dark background, so the form goes in a **light panel** inside the
band (no `transparent`). Heading, the thirty-minutes copy and the booking button
on the left; form panel on the right from `md` up; stacked on a phone, form
under the button. Give the section `id="get-in-touch"`.

Open question for Ruthnie: the band will hold two asks (booking button + form).
That is intentional, since they serve different people (ready to talk vs. want
to write first), but confirm she's fine with both in one band.

**3. Off-site links that point at the form.** The footer "Send a message" link
(`SiteFooter.tsx`) and the Portfolio page link both send people to
`CONTACT_FORM_URL` on opsette.io. Recommendation: point them to
`/#get-in-touch` so they land on the form on our own site. Keep
`CONTACT_FORM_URL` in `projects.ts` for anywhere outside the site (email
signature, LinkedIn).

### Tracking

Decided 2026-10-21: the embed reuses the site's existing token,
`G6MEhvk02qEo`. No new link source. Once the footer and Portfolio links jump to
the embedded form, no plain link is left on the site, so every on-site
submission comes through the embed and a second token would have nothing to
split.

---

## Part 2 — Opsette change: auto-height (Ruthnie does this in opsette-v2)

A feature for every Opsette customer, not just deebuilt.co: an embedded form
that sizes itself.

**File:** `app/embed/form/[org]/[form]/page.tsx`

**What to add:** when the page is inside an iframe, measure the form's real
height and post it to the parent every time it changes.

1. Wrap the content (the `FormRenderer` and the branding line) in an inner
   `<div ref={contentRef}>`. Measure **that**, not the outer container. The
   outer container has `minHeight: '100%'`, which means it is always at least
   as tall as the iframe, so measuring it would let the form grow but never
   shrink.
2. In a `useEffect`, if `window.parent !== window`, create a `ResizeObserver`
   on `contentRef.current`. On every change, post:
   ```ts
   window.parent.postMessage(
     { type: 'opsette-form-resize', formSlug, height },
     '*'
   );
   ```
   where `height` is the inner div's height plus the container's top and bottom
   padding (12px each on mobile, 16px on desktop), rounded up.
   Disconnect the observer in the effect's cleanup.
3. The effect must run once the form has loaded (the ref is null during the
   loading state), so depend on `formData`.

`'*'` as the target origin matches the existing submit message and is fine
here: a height number isn't sensitive. The **receiving** side is where origin
is checked (Part 1).

**Optional, for non-React sites:** the embed screen at
`app/(dashboard)/forms/[id]/embed/page.tsx` could offer an "auto-height"
snippet: the iframe plus a few lines of script that listen for
`opsette-form-resize`. That makes auto-height work for customers pasting into
Squarespace, WordPress, or plain HTML. Not needed for deebuilt.co.

**Testing order:** we can build and test the deebuilt.co component against the
current embed first (fixed height). Once the Opsette change is deployed, the
same component picks up the resize messages with no change on this side.

---

## Part 3 — Resources page (scaffold and plan; layout decided together)

Route `src/routes/resources.tsx` → `/resources`. Content lives in a new
`src/content/resources.ts`, same pattern as `projects.ts` and `solutions.ts`,
so adding a resource is one entry in one file.

Entry shape (draft):

```ts
type Resource =
  | { kind: "tool"; title: string; description: string; href: string }
  | { kind: "download"; title: string; description: string; href: string;
      fileType: string; fileSize: string };
```

- **Tools** open in a new window (`target="_blank"`, `↗` on the label, same as
  the site's other external links).
- **Downloads** show file type and size so nobody is surprised by a file.
  Files live in `public/resources/`.
- The assessment and, later, the platform picker belong here too.

Where tools come from: Ruthnie is sorting the Opsette Tools
(tools.opsette.io) into the ones that stay inside Opsette as widgets and the
ones that become DeeBuilt free tools (rebranded header, footer and colors,
moved to a DeeBuilt domain). Already decided: Smart Flow is removed. Candidates
she named: Contact Capture, Brand Board, File Builder, Startup Planner,
Icebreaker. A software spend checker could become a small tool (possibly part
of Startup Planner) instead of a spreadsheet.

Open decisions for the layout conversation:
- **Layout.** She said "little cards." House design rule bans the three-up card
  grid. Options to look at together: a list of rows like `ProjectRow` on the
  home page, or a two-column layout like the Solutions entries, with tools and
  downloads as two labeled groups.
- **Nav.** Add "Resources" to the header, or footer only until the page has
  enough in it.
- **Launch threshold.** Don't link the page until it has a few real entries; a
  near-empty resources page reads worse than none.
- **Tool hosting.** Where converted tools live (for example a
  `tools.deebuilt.co` apex with each tool at a route, the same pattern as
  tools.opsette.io), decided when the first tool is ready.

---

## Not in this plan, parked for later

- Slim down the assessment (Ruthnie, in Opsette).
- Build the platform picker quiz (Ruthnie, in Opsette), then embed it
  collapsed.
- Unique title and meta description per page (pinned).
- Bing Webmaster Tools: import from Search Console.

## Build order

1. `OpsetteFormEmbed` component + `OPSETTE_EMBED_BASE` constant.
2. Solutions closing section embed. Verify in the dev server, phone and desktop.
3. Homepage closing section embed, in a light panel inside the dark band.
4. Footer and Portfolio links → `/#get-in-touch`.
5. (Ruthnie, opsette-v2) auto-height change; then re-check both placements.
6. Resources page scaffold once the layout is decided.

## Progress

**2026-10-21 — build order steps 1–4 built, awaiting her check in the dev server.**

- `src/components/OpsetteFormEmbed.tsx`: new. Builds the embed URL, always
  hides branding, listens for `opsette-form-resize` (origin + own-iframe
  checked), scrolls to the top of the form on `opsette-form-submit`. Falls back
  to `minHeight` (600) until Opsette sends heights.
- `src/content/projects.ts`: `OPSETTE_ORIGIN`, `OPSETTE_EMBED_BASE`,
  `CONTACT_FORM_SLUG`, `CONTACT_EMBED_SOURCE` (existing token). `CONTACT_FORM_URL`
  kept as the record of the plain link; nothing on the site uses it now.
- `src/routes/solutions.tsx`: closing button replaced by the embedded form,
  transparent, heading 5 cols / form 7 cols from md.
- `src/routes/index.tsx`: dark closing band is now a 5/7 grid. Booking ask
  left, form in a light `bg-surface` panel right. Section has
  `id="get-in-touch"`.
- `SiteFooter.tsx` and `portfolio.tsx`: "Send a message" is now an internal
  `Link` to `/#get-in-touch`, no ↗.
- `npx tsc --noEmit` clean.
- After her first look: `hideHeader` on both placements (the band headings
  already do that job), and `transparent` added on the homepage too. Inside
  the white panel, transparent is safe and drops the form's gray background,
  so both placements now look the same. She checked: not cramped, looks good.
  Only the 600px inner scroll remains, which Part 2 fixes.
- Checked by her in the dev server; committed and pushed 2026-10-21 (no build:
  contained edits, typecheck clean).
- Left: the Opsette auto-height change (Part 2, her session in opsette-v2;
  nothing to change here afterward, the component already listens), then the
  Resources page.

**2026-10-21 — Resources page scaffold built, NOT committed (sitting locally on purpose).**

- First version was full-width rows with eyebrow labels and chips. She
  rejected it as the default AI layout ("everything looks completely
  identical"). Rebuilt as cards; she approved the direction.
- `src/routes/resources.tsx`: page intro, then tools as an uneven 6-column
  grid (first tool is the featured dark card, 4 cols x 2 rows; the rest vary
  in width and tone via `toolSlots`), then downloads as staggered portrait
  "paper" sheets on an `accent-tint` band.
- `src/components/resources/ToolCard.tsx` (tones: featured / tint / surface /
  outline) and `src/components/resources/DownloadSheet.tsx`.
- `src/content/resources.ts`: all entries are placeholders. Tools have a
  `cta` label (placeholder, to be workshopped); downloads have `fileType` and
  `length`. No hrefs yet, so everything reads "Coming soon".
- "Resources" added to `SiteHeader.tsx` nav and `SiteFooter.tsx` pages list
  (local only, ships with the page).
- Superseded: the "draft entry shape" and "layout options" in Part 3 above.
  The layout is decided (cards as built). Part 3's launch threshold and
  tool hosting questions are still open.
- Wording: she may revisit "Templates to keep." heading; otherwise copy is
  hers to write.
- Before committing: needs real entries (her converted tools' links, any
  files in `public/resources/`), and a full build, because this adds a new
  route (`/resources`). It's Vite, so the build can run with the dev server
  up; no port check needed.
- She's away on other projects and will come back with tool links.

**2026-10-21 (later) — Resources reorganized by stage, first live tool wired. Still NOT committed.**

- Her call: organize by Launching / Scaling / Reorganizing (the home page's
  words) so a visitor lands where they qualify. The assessment fills
  Reorganizing as its featured card. Opener has a "Where's your business
  right now?" prompt with the three stages as large jump links.
- Each stage is its own band: Launching on the page background (featured
  dark card), Scaling on `accent-tint`, Reorganizing on `ink-wash` (featured
  white card). Downloads now sit inside their stage, after the tools, as
  paper sheets with a "Templates to download." lead-in.
- First live tool: StartUp Planner → https://tools.deebuilt.co/startup-planner/
  (spelled "StartUp" to match the app). Featured card shows her Budget Summary
  screenshot, `public/resources/startup-planner-budget.png`, cropped off the
  card's bottom edge.
- Whole cards and sheets are now the link (button inside is a visual span).
- Tools subdomain: tools.deebuilt.co (apex repo she set up). Platform Picker
  added to Scaling as a coming-soon placeholder.
- Content model: one `resources` array in `src/content/resources.ts`, each
  entry tagged with `stage`; `featured` and `image` optional.

**2026-10-21 (later still) — tool links in.**

Listed on the page:

| Tool | Stage | Link |
| --- | --- | --- |
| StartUp Planner (featured, budget screenshot) | Launching | https://tools.deebuilt.co/startup-planner/ |
| Signature Studio (no image, her call) | Launching | https://tools.deebuilt.co/signature-studio/ |
| Brand Board (palette strip image) | Launching | https://tools.deebuilt.co/brand-board/ |
| File Builder | Reorganizing | https://tools.deebuilt.co/file-builder/ |
| Assessment (featured) | Reorganizing | Opsette form, `ASSESSMENT_URL` |

Live on tools.deebuilt.co but deliberately NOT listed (her call): Palette
Studio, Icon Kit, and Banner Designer overlap Brand Board; QR Creator
doesn't say anything about her work. They're recorded in a comment in
`resources.ts`.

| Tool | Link |
| --- | --- |
| Palette Studio | https://tools.deebuilt.co/palette-studio/ |
| Icon Kit | https://tools.deebuilt.co/icon-kit/ |
| Banner Designer | https://tools.deebuilt.co/banner-designer/ |
| QR Creator | https://tools.deebuilt.co/qr-creator/ |

Images: two only (planner, brand board). More would start to look busy.

Still placeholders: Decision Lab, Icebreaker, all four downloads.

Copy and card updates, same day:
- Small cards drop the separate link line; the underlined title with ↗ is
  the cue and the whole card is the link. Only large (featured) cards keep a
  button. Open question: the assessment card kept its button; she may want
  it title-only too.
- No card spans two rows anymore (a tall neighbor stretched the planner card
  and left a dead gap). StartUp Planner is full width, split text/screenshot;
  Signature Studio narrow + Brand Board wide (split) below it.
- Brand Board description: "Build and share your brand kit." (hers)
- Signature Studio description: "Sign off your emails in style." (hers)
- Platform Picker → **Decision Lab** (her app, in progress; the platform
  picker quiz lives inside it). Scaling's featured-to-be. Coming soon until
  she has the link.
- First real template: **New Business Systems Workbook**,
  `public/resources/new-business-systems-workbook.pdf`, 3 pages, fillable,
  branded header and footer. Replaces the "New Business Systems Checklist"
  placeholder in Launching. Reviewed: Google Voice example now says "(with
  Google Workspace)"; business bank account deliberately left out (it's a
  systems list); no AI or advice disclaimer (her call). "Templates to
  download." label is now just "Templates."
- Second real template: **Platform Migration Checklist**,
  `public/resources/platform-migration-checklist.pdf`, 3 pages, fillable
  field map. Reorganizing. Suggested to her: add a "set a cutover date /
  pause edits before the final move" item in Test.
- Scaling reworked (hers): no templates (process documentation and new
  hire onboarding cut), Icebreaker cut. Now **Decision Lab** (featured,
  coming soon; gets a screenshot of its dark platform-picker card, tight
  crop, from her) + **SmartFlow** (coming soon, her flowchart app being
  brought up to standard). Screenshot, not a rebuild of the animated card:
  a rebuilt copy would drift from the app.
- Decision Lab screenshot in: `public/resources/decision-lab-platform-picker.png`
  (the "How comfortable is your team with new software?" question). Static
  screenshot, not a rebuild of the animated card: she decided its own brand
  colors would clash as live site UI, while a screenshot reads as a preview.
  Scaling's featured card is white (`featuredLight`) so the dark screenshot
  stands out. Wide screenshots show whole and centered; tall ones (planner)
  peek up from the bottom edge. ToolCard decides by the image's proportions.
- File Builder hidden (not listed; she doesn't think it fits Reorganizing).
  Reorganizing is now the assessment (full width when alone) + the
  migration checklist. Checklist's site line shortened to "Clean up, map,
  and test before moving from one system to another." Download sheets now
  grow to fit their text (3:4 is a minimum), so "Download" can't be pushed
  off the sheet.
- SmartFlow hidden until it's up to standard. Decision Lab linked to
  https://tools.deebuilt.co/decision-lab/platform-picker, the URL it will
  have after her repo move. Platform Migration Checklist stays in
  Reorganizing (Scaling = choose a platform, Reorganizing = move to it).
- Page status (hers): looks solid. Nothing reads "Coming soon" anymore.

**Before shipping /resources:**
1. Confirm https://tools.deebuilt.co/decision-lab/platform-picker loads
   (404 until her repo move).
2. Workshop the button labels still in use: "Open the planner" (StartUp
   Planner), "Take the full assessment" (reused from the home page),
   "Open Decision Lab".
3. Full build (new route). Vite, so the dev server can stay up.
4. Commit and push: resources route, `src/components/resources/`,
   `src/content/resources.ts`, `public/resources/` (2 PDFs + 3
   screenshots), header and footer nav links, `routeTree.gen.ts`, this doc.

**2026-10-21 — shipped.** Her call to ship with the Decision Lab link not
yet live (low traffic; it works once she moves the repo). Button labels
settled: "Start planning" (StartUp Planner), "Take the full assessment"
(kept), "Find your platform" (Decision Lab).

Caught at build: the prerender crawler followed the PDF links and wrote the
PDFs back out as text, corrupting them in dist (~18% larger, different
checksums). Fixed with a prerender `filter` in `vite.config.ts` that skips
paths ending in a file extension and on-page `#` jumps. Second build (her
approval) prerendered only the 5 real pages, and both PDFs in dist match
`public/resources/` byte for byte. Then committed and pushed.

Left after this ship:
- Move Decision Lab to tools.deebuilt.co so
  https://tools.deebuilt.co/decision-lab/platform-picker loads (her
  Decision Lab session; also fix the results-page points display there).
- Opsette auto-height for embedded forms (Part 2, her opsette-v2 session).
- SmartFlow, when it's up to standard.
- Optional: the cutover-date item in the migration checklist PDF.
- Flagged for her Decision Lab session: results rank by percentage but show
  raw points with different totals (Airtable 8 of 30 ranks below Asana 6 of
  17), which reads as a miscount. Show a match % instead, or drop "of X".
- Not shipping until she has a few real templates.
