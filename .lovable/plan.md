# DeeBuilt marketing site

## Stack note (important)

Lovable projects run on TanStack Start, not Create React App + React Router. I'll build the site using TanStack Start's file-based routing, which gives you clean URLs (`/about`, `/portfolio`, `/contact`) with no hash routing and no `404.html` redirect hack. The output is static-friendly.

For GitHub Pages deployment to `deebuilt.co`, you have two paths after the build:
1. Deploy through Lovable and point `deebuilt.co` at it (simplest, clean URLs work out of the box).
2. Keep targeting GitHub Pages: I'll include a `public/404.html` redirect shim and a small `redirect` snippet in `index.html` so deep links work, and document the manual export step. Static prerender on TanStack Start is available, but pushing to your GitHub repo is a manual step Lovable doesn't automate.

I'll build option 2 (GitHub Pages friendly) per your request, and you can still preview everything live in Lovable.

## Design system

- Background `#FAF8F4`, ink `#1A1A1A`, accent ink blue `#2E4057`, hairline `#E8E4DD`.
- Headings: Instrument Serif, loaded via `<link>` in the root head. Body: Work Sans.
- Hierarchy through size and weight only. Generous line-height on body (~1.65), tight tracking on large serif display, slight positive tracking on small caps labels.
- Buttons: two variants only. Primary = solid ink on off-white, squared with 2px radius. Secondary = underline link with accent on hover.
- Motion: single `fade-up` on scroll using IntersectionObserver, 400ms ease-out, 12px translate. No bounce. Respects `prefers-reduced-motion`.
- Mobile-first: every layout authored at 360px first, scales up at `sm` and `md`. Hero serif clamps from ~44px to ~88px.

## Pages and routes

```
src/routes/
  __root.tsx        shared shell: header, footer, fonts, base meta
  index.tsx         /         Home
  about.tsx         /about    About
  portfolio.tsx     /portfolio Portfolio
  contact.tsx       /contact  Contact
```

Each route owns its own `head()` with unique title, description, og:title, og:description, og:url, and canonical.

### Home (`/`)
- Hero: small eyebrow "DeeBuilt", large serif "Ruthnie Benoit", supporting line "Systems, automations, and workflow design for businesses, small teams, and solo founders.", primary CTA "Let's chat" → `https://opsette.io/booking/deebuilt/discovery-call`. Left-aligned, asymmetric — CTA sits below copy, not centered.
- Approach section: small caps label "Approach" with the provided paragraph as a wide left-aligned text block on a 2/3 column.
- Selected work: 3 cards (Opsette, The Midterm Project, Ezii Quote Builder) in an asymmetric layout — first card spans wider on desktop, two stack beside it. Each links to the live project; "View all work" secondary link to `/portfolio`.
- Closing CTA: small caps "Start with discovery", one line, primary button to booking URL.

### About (`/about`)
- Stacked on mobile, two-column on `md+` (5/7 split, portrait left, bio right).
- Portrait slot: `src/assets/portrait-placeholder.jpg` with a neutral neutral-toned placeholder I'll generate, sized 3:4. Caption under: "Ruthnie (Dee) Benoit".
- Bio uses the provided copy verbatim, broken into 2–3 paragraphs for rhythm.

### Portfolio (`/portfolio`)
- Header: "Selected work" plus a one-line intro.
- Project data lives in `src/content/projects.ts` as an array, so adding cards later is a single object push.
- Grid: 1 column mobile, 2 columns `md+`. Each card = image slot (4:3 placeholder asset), title in serif, one-line description, external link with quiet accent underline. Images lazy-loaded.
- Four cards from your list: Opsette, The Midterm Project, Ezii Quote Builder, Pet Karma.

### Contact (`/contact`)
- Left column: heading and short line. Right column on `md+`: form (name, email, message, submit). Stacked on mobile.
- Form posts to `https://formspree.io/f/PLACEHOLDER` via standard `fetch` POST; endpoint defined as `FORMSPREE_ENDPOINT` constant at the top of the file for easy swap. Success and error states inline, no toast library.
- Below: email link (placeholder `hello@deebuilt.co` — confirm or I'll use this) and YouTube link to `https://www.youtube.com/@DeeBuiltSystems`.

## Navigation and footer

- Header in `__root.tsx`: wordmark "DeeBuilt" left, nav right (Home, About, Portfolio, Contact). Active route indicated by a thin underline in accent, not a pill.
- Mobile (`<md`): hamburger icon (custom 2-line SVG, not a Lucide pill) opens a full-screen panel with the four links in serif at large size. Closes on link click and on Escape.
- Footer: thin top hairline, "DeeBuilt" wordmark, YouTube link, copyright line "© {year} DeeBuilt".

## GitHub Pages support

- `public/404.html`: minimal HTML that rewrites the path into a query param and redirects to `/`, plus a small inline script in `index.html` (root route head `scripts`) that restores the path. This is the standard SPA-on-Pages shim.
- `public/CNAME` with `deebuilt.co`.
- Base path `/` (custom domain at apex), no `basename` needed.

## Files I'll create or modify

- `src/styles.css` — palette, fonts, typography utilities.
- `src/routes/__root.tsx` — fonts link, header, footer, mobile menu.
- `src/routes/index.tsx`, `about.tsx`, `portfolio.tsx`, `contact.tsx`.
- `src/components/Header.tsx`, `Footer.tsx`, `MobileMenu.tsx`, `ProjectCard.tsx`, `FadeUp.tsx`, `Button.tsx`.
- `src/content/projects.ts` — project data.
- `src/assets/` — generated placeholder portrait + 4 project thumbnail placeholders (neutral, on-brand, clearly swappable).
- `public/404.html`, `public/CNAME`.

## Out of scope

- Pushing to your GitHub repo (manual step on your side after preview looks right).
- Real photos and screenshots (placeholder assets only, swap-ready).
- Analytics, cookie banner, CMS.

Confirm the plan and I'll build it. If `hello@deebuilt.co` isn't the right contact email, tell me which one to use.
