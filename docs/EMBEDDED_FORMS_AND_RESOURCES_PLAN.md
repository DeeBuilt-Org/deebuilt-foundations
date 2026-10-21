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
