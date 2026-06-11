import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/content/projects";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — DeeBuilt" },
      {
        name: "description",
        content:
          "Selected work: Opsette, The Midterm Project, Ezii Quote Builder, Pet Karma.",
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

      <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-2 md:gap-x-10 md:gap-y-20">
        {projects.map((p, i) => (
          <FadeUp key={p.title} delay={(i % 2) * 80}>
            <ProjectCard project={p} />
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
