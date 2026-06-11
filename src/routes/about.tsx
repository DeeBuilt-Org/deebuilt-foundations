import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DeeBuilt" },
      {
        name: "description",
        content:
          "Ruthnie (Dee) Benoit. Several years supporting startup operations and building systems that reduce manual work.",
      },
      { property: "og:title", content: "About — DeeBuilt" },
      {
        property: "og:description",
        content:
          "Ruthnie (Dee) Benoit. Operations, automations, and internal tools.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-28">
      <FadeUp>
        <span className="eyebrow">About</span>
      </FadeUp>

      <div className="mt-10 grid gap-12 md:mt-16 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeUp>
            <div className="aspect-[3/4] w-full bg-[#efeae1] border border-hairline" />
            <p className="mt-5 font-serif text-2xl">Ruthnie (Dee) Benoit</p>
            <p className="mt-1 text-sm text-muted">
              Operations, automations, and internal tools.
            </p>
          </FadeUp>
        </div>

        <div className="md:col-span-7">
          <FadeUp>
            <h1 className="display-lg max-w-xl">
              I help teams improve the way their work flows.
            </h1>
          </FadeUp>

          <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground md:text-lg">
            <FadeUp delay={80}>
              <p>
                I have several years of experience supporting startup operations
                and building systems that reduce manual work. The process starts
                with discovery, which means looking at how work moves through
                the business.
              </p>
            </FadeUp>
            <FadeUp delay={160}>
              <p>
                From there I put together a clear plan. That might include
                restructuring existing workflows, connecting the apps a team
                already uses, migrating data into a better system, or building a
                custom internal tool when it makes sense.
              </p>
            </FadeUp>
            <FadeUp delay={240}>
              <p>
                The goal is to make current operations easier to manage and
                easier to grow, not to add more software. Support and training
                are included so transitions stay smooth.
              </p>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
