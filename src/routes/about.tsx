import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import { BOOKING_URL, positioning } from "@/content/projects";

/** Headshot lives in /public. */
const PROFILE_PHOTO = "/Prof Headshot.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DeeBuilt" },
      {
        name: "description",
        content:
          "Ruthnie (Dee) Benoit, fractional operations strategist. Systems, integrations, and the handoffs between them.",
      },
      { property: "og:title", content: "About — DeeBuilt" },
      {
        property: "og:description",
        content:
          "Ruthnie (Dee) Benoit, fractional operations strategist. Systems, integrations, and internal tools.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});

function ProfilePhoto() {
  const [ok, setOk] = useState(true);
  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-hairline bg-surface">
      {ok ? (
        <img
          src={PROFILE_PHOTO}
          alt="Ruthnie Benoit"
          onError={() => setOk(false)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-accent-tint">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Headshot
          </span>
        </div>
      )}
    </div>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-28">
      <div className="grid gap-12 md:grid-cols-12 md:gap-16">
        <div className="md:col-span-5">
          <FadeUp>
            <ProfilePhoto />
            <p className="mt-5 font-serif text-2xl">Ruthnie (Dee) Benoit</p>
            <p className="mt-1 text-sm text-muted">{positioning.role}</p>
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

          <FadeUp delay={360}>
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
      </div>
    </section>
  );
}
