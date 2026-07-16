import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
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
      { title: "DeeBuilt — Ruthnie Benoit" },
      {
        name: "description",
        content:
          "Independent operations practice. Systems, automations, and workflow design for businesses, small teams, and solo founders.",
      },
      { property: "og:title", content: "DeeBuilt — Ruthnie Benoit" },
      {
        property: "og:description",
        content:
          "Systems, automations, and workflow design for businesses, small teams, and solo founders.",
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
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-10 md:pb-32 md:pt-28">
        <FadeUp>
          <span className="eyebrow">Systems · Automations · Web Design</span>
        </FadeUp>
        <FadeUp delay={80}>
          <h1 className="display-xl mt-6">
            Ruthnie<br />
            Benoit.
          </h1>
        </FadeUp>
        <FadeUp delay={160}>
          <p className="lede mt-8 max-w-xl text-muted">
            Systems, automations, and web design for businesses, small teams,
            and solo founders.
          </p>
        </FadeUp>
        <FadeUp delay={240}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Let's chat
            </a>
            <Link to="/portfolio" className="btn-secondary">
              See the work
            </Link>
          </div>
        </FadeUp>
        <FadeUp delay={320}>
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <span className="eyebrow-muted">Explore</span>
            <a
              href={SPEC_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent transition-colors hover:text-foreground"
            >
              Specs ↗
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-accent transition-colors hover:text-foreground"
            >
              Demos ↗
            </a>
          </div>
        </FadeUp>
      </section>

      {/* Approach */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <FadeUp>
              <span className="eyebrow">Approach</span>
              <span className="accent-rule mt-4" />
            </FadeUp>
          </div>
          <div className="md:col-span-8">
            <FadeUp>
              <p className="display-lg max-w-2xl text-foreground">
                Operations look different for every business.
              </p>
            </FadeUp>
            <FadeUp delay={100}>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-foreground md:text-lg">
                The work starts with discovery, a look at how work moves through
                the business. From there comes a clear plan. That can mean
                restructuring workflows, connecting existing apps, migrating
                data into a better system, or building a custom internal tool.
                The goal is operations that stay easy to manage and easy to
                grow.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Operations assessment — lead magnet */}
      <section className="border-t border-hairline bg-accent-tint">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
          <div className="grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
            <div className="md:col-span-8">
              <FadeUp>
                <span className="eyebrow">Free assessment</span>
              </FadeUp>
              <FadeUp delay={80}>
                <p className="display-lg mt-5 max-w-2xl text-foreground">
                  See how your operations stack up.
                </p>
              </FadeUp>
              <FadeUp delay={160}>
                <p className="mt-5 max-w-xl text-base leading-relaxed text-foreground md:text-lg">
                  A quick run through the parts of a business that tend to slow
                  down, from daily work to scheduling and payments. Ends with a
                  score. Takes about two minutes.
                </p>
              </FadeUp>
            </div>
            <div className="md:col-span-4 md:flex md:justify-end">
              <FadeUp delay={240}>
                <a
                  href={ASSESSMENT_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  Start the assessment ↗
                </a>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <span className="eyebrow">What I build</span>
            <span className="accent-rule mt-4" />
          </FadeUp>
          <FadeUp delay={80}>
            <p className="display-lg mt-6 max-w-2xl text-foreground">
              More than a pretty screen.
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
            <div className="mb-10 flex items-end justify-between gap-4 md:mb-14">
              <div>
                <span className="eyebrow">Selected work</span>
                <span className="accent-rule mt-4" />
              </div>
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

      {/* Closing CTA */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-32">
          <FadeUp>
            <span className="eyebrow">Start with discovery</span>
            <span className="accent-rule mt-4" />
          </FadeUp>
          <FadeUp delay={80}>
            <p className="display-lg mt-6 max-w-3xl">
              A clear look at how work moves through your business, and a plan
              for what comes next.
            </p>
          </FadeUp>
          <FadeUp delay={160}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary mt-10"
            >
              Book a discovery call
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
