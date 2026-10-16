import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { SolutionEntry } from "@/components/SolutionEntry";
import { SolutionsHero } from "@/components/SolutionsHero";
import { CONTACT_FORM_URL } from "@/content/projects";
import { solutions, solutionsPage } from "@/content/solutions";

export const Route = createFileRoute("/solutions")({
  head: () => ({
    meta: [
      { title: "Solutions — DeeBuilt" },
      { name: "description", content: solutionsPage.subtitle },
      { property: "og:title", content: "Solutions — DeeBuilt" },
      { property: "og:description", content: solutionsPage.subtitle },
      { property: "og:url", content: "/solutions" },
    ],
    links: [{ rel: "canonical", href: "/solutions" }],
  }),
  component: Solutions,
});

/**
 * Added 2026-10-16. Header, subtitle, and all eight solutions are hers, from
 * the "DeeBuilt Capability Cards" doc, and live in src/content/solutions.ts.
 * Sits before About in the nav.
 *
 * Two columns of entries from md up, one on a phone. Eight entries keeps the
 * grid even, so no row ends with an empty cell.
 */
function Solutions() {
  return (
    <>
      <SolutionsHero />

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-x-16 gap-y-16 md:grid-cols-2 md:gap-y-20">
          {solutions.map((s, i) => (
            <FadeUp key={s.id} delay={(i % 2) * 80}>
              <SolutionEntry solution={s} />
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Closing ask. Left-aligned heading with the action beside it, the
          same row shape as "My apps / View all" on the home page, rather than
          a centered band.

          ONE button to the get-in-touch form, hers 2026-10-16. The heading
          answers the eight starting points above it: a visitor who saw their
          own business in one sends what they're working with. Booking is the
          hero's job. */}
      <section className="border-t border-hairline bg-surface-raised">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-10 md:py-24">
          <FadeUp>
            <p className="display-lg max-w-xl text-foreground">{solutionsPage.closing}</p>
          </FadeUp>
          <FadeUp delay={120}>
            <a href={CONTACT_FORM_URL} target="_blank" rel="noreferrer" className="btn-primary">
              Get in touch ↗
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
