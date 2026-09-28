import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { Hero } from "@/components/Hero";
import { ProjectRow } from "@/components/ProjectRow";
import { ServiceList } from "@/components/ServiceList";
import {
  ASSESSMENT_URL,
  BOOKING_URL,
  SPEC_URL,
  projects,
  services,
} from "@/content/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruthnie Benoit — Operations, Automation, and Systems Consultant" },
      {
        name: "description",
        content:
          "Operations and systems design for businesses launching, scaling, or reorganizing.",
      },
      {
        property: "og:title",
        content: "Ruthnie Benoit — Operations, Automation, and Systems Consultant",
      },
      {
        property: "og:description",
        content: "Operations and systems design for businesses at any stage.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <>
      <Hero />

      {/* The hook. One sentence, standing alone in white space — no paragraph
          under it (removed 2026-08-14; it explained how an engagement opens,
          which is about her at the moment a reader is still deciding whether
          the site is about them). Extra vertical padding because the sentence
          has to carry the section by itself. */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-24 md:px-10 md:py-36">
          <FadeUp>
            {/* Hers, moved here from the About page 2026-08-14. States a
                principle instead of a service, which is why it earns the
                standalone slot.

                It is also grounded, though she arrived at it on her own:
                outcomes come from the system (Deming), and improvement is
                capped by the constraint, so effort spent anywhere but the
                weakest process barely moves output (Goldratt's Theory of
                Constraints).

                Previously here: "If information only moves when you move it,
                you need better integrations." Dropped 2026-08-14 — it's a
                diagnosis she still likes, but it had no home that worked. She
                has it saved elsewhere. Do not reinstate without her. */}
            <p className="display-lg max-w-3xl text-foreground">
              Your business is capped by your weakest process.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-hairline bg-surface-raised">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <p className="display-lg max-w-2xl text-foreground">Which sounds familiar?</p>
          </FadeUp>
          <div className="mt-12 md:mt-16">
            <ServiceList services={services} />
          </div>
        </div>
      </section>

      {/* Operations assessment — centered CTA band. Deliberately the only
          centered section on the page, so it reads as an interruption rather
          than another content block. No body paragraph: headline, button,
          one short reassurance under it.

          Sits BELOW the flip cards on purpose (moved 2026-08-14). The cards
          are the qualifier — six symptoms in a customer's voice, with the
          flip as a micro-commitment. The assessment is the heavier ask
          (20+ statements, scored, ends in a capture), so it only makes sense
          once someone has already recognized themselves in a card. Above the
          cards it was asking for too much too early. */}
      <section className="border-y border-hairline bg-accent-tint">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
          <FadeUp>
            <p className="display-lg text-foreground">See how your operations stack up.</p>
          </FadeUp>
          <FadeUp delay={120}>
            <a href={ASSESSMENT_URL} target="_blank" rel="noreferrer" className="btn-primary mt-9">
              Take the full assessment ↗
            </a>
          </FadeUp>
          <FadeUp delay={200}>
            {/* Hers, 2026-08-19. Was "About two minutes. You get your score
                before we ask for anything." — naming the ask is what made it
                read as creepy: it plants the idea that something is coming.
                The form handles the capture on its own. */}
            <p className="mt-5 text-sm text-muted">
              About two minutes to get your score.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* My apps */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
              <p className="display-lg max-w-xl text-foreground">My apps.</p>
              <Link to="/portfolio" className="btn-secondary">
                View all
              </Link>
            </div>
          </FadeUp>

          <div className="border-t border-hairline">
            {featured.map((p, i) => (
              <FadeUp key={p.title} delay={i * 60} className="border-b border-hairline">
                <ProjectRow project={p} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA — dark band. Proof sits above the ask, backing it, and the
          inverted color gives the page a hard stop instead of fading out. */}
      <section className="bg-ink-wash text-white">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-32">
          <div>
            <FadeUp>
              <p className="display-lg max-w-3xl text-white">
                Start with a look at how work moves through your business.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                Thirty minutes, no pitch. You&rsquo;ll leave knowing where the time is going even if
                we never work together.
              </p>
            </FadeUp>
            <FadeUp delay={160}>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-invert mt-10">
                Book a discovery call
              </a>
            </FadeUp>
            <FadeUp delay={240}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm">
                <span className="text-white/60">More from DeeBuilt</span>
                <a
                  href={SPEC_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Specs ↗
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
