import { createFileRoute, Link } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { ProjectCard } from "@/components/ProjectCard";
import { BOOKING_URL, projects } from "@/content/projects";

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
  const featured = projects.slice(0, 3);

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
      </section>

      {/* Approach */}
      <section className="border-t border-hairline">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <div className="md:col-span-4">
            <FadeUp>
              <span className="eyebrow">Approach</span>
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

      {/* Selected work */}
      <section className="border-t border-hairline">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
          <FadeUp>
            <div className="mb-12 flex items-end justify-between gap-4 md:mb-16">
              <span className="eyebrow">Selected work</span>
              <Link to="/portfolio" className="btn-secondary">
                View all
              </Link>
            </div>
          </FadeUp>

          <div className="grid gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
            <FadeUp className="md:col-span-2">
              <ProjectCard project={featured[0]} wide />
            </FadeUp>
            {featured.slice(1).map((p, i) => (
              <FadeUp key={p.title} delay={i * 80}>
                <ProjectCard project={p} />
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
