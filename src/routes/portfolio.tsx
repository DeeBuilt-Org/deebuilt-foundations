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
          "Apps and tools I've built: Opsette, Opsette Tools, The Midterm Project, G-Up, Read Amour, and more.",
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
        <h1 className="display-lg max-w-3xl">Things I&rsquo;ve built.</h1>
      </FadeUp>

      {/* Subheading removed 2026-08-19 (hers): "Internal tools, client
          workspaces, and a few consumer apps. Each one is labeled with where
          it stands today, live or otherwise." — "client workspaces" named
          nothing on the list, "a few consumer apps" stopped being true once
          Ezii and Pet Karma came off, and the status line explained a chip
          that speaks for itself. The gap below tightened to match a heading
          standing alone. */}
      <div className="mt-10 border-t border-hairline md:mt-12">
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
