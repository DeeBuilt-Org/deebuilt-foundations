import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { Hero } from "@/components/Hero";
import { ProjectRow } from "@/components/ProjectRow";
import { ServiceList } from "@/components/ServiceList";
import {
  ASSESSMENT_URL,
  BOOKING_URL,
  DEMO_URL,
  SPEC_URL,
  projects,
  services,
} from "@/content/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruthnie Benoit — Fractional Operations Strategist" },
      {
        name: "description",
        content:
          "I design the seams in a business: the handoffs between your tools, your team, and the steps nobody wrote down. Then I wire them to run on their own.",
      },
      {
        property: "og:title",
        content: "Ruthnie Benoit — Fractional Operations Strategist",
      },
      {
        property: "og:description",
        content:
          "The handoffs between your tools, your team, and the steps nobody wrote down.",
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

      {/* Approach — runs as prose, no label above it. */}
      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <p className="display-lg max-w-3xl text-foreground">
              Your software is probably fine. The gaps between it are the
              problem.
            </p>
          </FadeUp>
          <div className="mt-8 grid gap-8 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <FadeUp delay={100}>
                <p className="text-base leading-relaxed text-foreground md:text-lg">
                  Every engagement opens the same way. I follow one job from the
                  first request to the final invoice and write down every place
                  it stops moving. It usually stops in the same spots: waiting
                  on an approval, or waiting on someone to retype what another
                  system already knows.
                </p>
              </FadeUp>
            </div>
            <div className="md:col-span-5">
              <FadeUp delay={180}>
                <p className="text-base leading-relaxed text-muted md:text-lg">
                  What follows depends on what I find. Fewer tools. A migration.
                  A custom build when nothing off the shelf fits. Your team gets
                  trained on all of it, so none of it depends on me.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Operations assessment — centered CTA band. Deliberately the only
          centered section on the page, so it reads as an interruption rather
          than another content block. No body paragraph: headline, button,
          one short reassurance under it. */}
      <section className="border-y border-hairline bg-accent-tint">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-24">
          <FadeUp>
            <p className="display-lg text-foreground">
              See how your operations stack up.
            </p>
          </FadeUp>
          <FadeUp delay={120}>
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-9"
            >
              Start the assessment ↗
            </a>
          </FadeUp>
          <FadeUp delay={200}>
            <p className="mt-5 text-sm text-muted">
              About two minutes. You get your score before we ask for anything.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-hairline bg-surface-raised">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <p className="display-lg max-w-2xl text-foreground">
              Which sounds familiar?
            </p>
          </FadeUp>
          <div className="mt-12 md:mt-16">
            <ServiceList services={services} />
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
              <p className="display-lg max-w-xl text-foreground">
                Things I&rsquo;ve built.
              </p>
              <Link to="/portfolio" className="btn-secondary">
                View all
              </Link>
            </div>
          </FadeUp>

          <div className="border-t border-hairline">
            {featured.map((p, i) => (
              <FadeUp
                key={p.title}
                delay={i * 60}
                className="border-b border-hairline"
              >
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
                Thirty minutes, no pitch. You&rsquo;ll leave knowing where the
                time is going even if we never work together.
              </p>
            </FadeUp>
            <FadeUp delay={160}>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-invert mt-10"
              >
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
                <a
                  href={DEMO_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
                >
                  Demos ↗
                </a>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
