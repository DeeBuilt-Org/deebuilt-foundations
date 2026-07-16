import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { ProjectRow } from "@/components/ProjectRow";
import { projects } from "@/content/projects";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — DeeBuilt" },
      {
        name: "description",
        content:
          "Selected work: Opsette, Opsette Tools, The Midterm Project, G-Up, and more.",
      },
      { property: "og:title", content: "Portfolio — DeeBuilt" },
      {
        property: "og:description",
        content: "Operations, internal tools, and product work.",
      },
      { property: "og:url", content: "/portfolio" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: Portfolio,
});

function Portfolio() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-28">
      <FadeUp>
        <span className="eyebrow">Portfolio</span>
        <span className="accent-rule mt-4" />
      </FadeUp>
      <FadeUp delay={80}>
        <h1 className="display-lg mt-6 max-w-3xl">Selected work.</h1>
      </FadeUp>
      <FadeUp delay={160}>
        <p className="lede mt-6 max-w-xl text-muted">
          A few projects spanning internal tools, client workspaces, and
          consumer apps.
        </p>
      </FadeUp>

      <div className="mt-16 border-t border-hairline md:mt-20">
        {projects.map((p, i) => (
          <FadeUp
            key={p.title}
            delay={i * 60}
            className="border-b border-hairline"
          >
            <ProjectRow project={p} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
