import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { ProjectRow } from "@/components/ProjectRow";
import { CONTACT_FORM_URL, projects } from "@/content/projects";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio — DeeBuilt" },
      {
        name: "description",
        content:
          "Apps and tools I've built: Opsette, Opsette Tools, The Midterm Project, G-Up, Read Amour, and Pet Karma.",
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
        <h1 className="display-lg max-w-3xl">Apps I&rsquo;ve built.</h1>
      </FadeUp>

      {/* Subheading removed 2026-08-19 (hers): "Internal tools, client
          workspaces, and a few consumer apps. Each one is labeled with where
          it stands today, live or otherwise." — "client workspaces" named
          nothing on the list, "a few consumer apps" stopped being true once
          Ezii and Pet Karma came off, and the status line explained a chip
          that speaks for itself.

          Replaced 2026-08-22 by the copy below, which is hers, dictated and
          settled in chat. Two jobs the old subheading didn't do: it says the
          links work and cost nothing, and it names Claude Code. The CTA is a
          soft nod that she builds apps at all. The home page is operations
          start to finish, so this page is the only place a visitor learns it.

          Do not tighten, re-balance, or "improve" these three sentences. They
          are her wording. Every prior agent pass on this file made the copy
          more professional and moved it further from her. */}
      <FadeUp>
        <p className="lede mt-6 max-w-2xl text-muted">
          The apps shared here are all live and fully functioning, and most of
          them are free. Anyone can sign up today to use them. They were all
          developed and designed using Claude Code.
        </p>
        <p className="lede mt-4 max-w-2xl text-muted">
          If you&rsquo;re interested in learning how you can develop your own
          apps or tools using AI for your business or projects, send me a
          message.
        </p>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-7"
        >
          Send a message ↗
        </a>
      </FadeUp>

      <div className="mt-14 border-t border-hairline md:mt-16">
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
