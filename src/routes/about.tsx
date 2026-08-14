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
            {/* Hers, 2026-08-14. Replaced "I help teams improve the way their
                work flows," which fails the stance test — nobody claims the
                opposite. This one can be disagreed with (plenty of people find
                integrations tedious), and "honestly" is the front-loaded
                softener that matches how she actually writes. */}
            <h1 className="display-lg max-w-xl">Honestly, I love integrations.</h1>
          </FadeUp>

          {/* WORKSHOP — being written line by line with Ruthnie, 2026-08-14.
              The three paragraphs that were here (several years of experience /
              the process starts with discovery / the goal is to make operations
              easier) were removed: vague where a number belongs, a services
              list rather than a bio, and negative parallelism.

              Two comparisons in the opener are deliberate and NOT redundant.
              The mathematician carries the PROCESS — building step by step
              toward a solution. The carpet cleaning video carries the PAYOFF —
              the moment it lands. Cutting either one halves the feeling. */}
          <div className="mt-8 space-y-6 text-base leading-relaxed text-foreground md:text-lg">
            <FadeUp delay={80}>
              <p>
                Integrations click for me the way solving an algorithmic problem clicks for a
                mathematician, or the way an oddly satisfying carpet cleaning video clicks for
                everyone else. I love the way they work when they work.
              </p>
            </FadeUp>
            {/* Hers, dictated. The paragraph used to close with "I'll help you
                not only launch it, but scale and reorganize..." — cut
                2026-08-14. It implied a ranking between the three (they're
                equal), and it restated Launch / Scale / Reorganize from the
                home page hero. */}
            <FadeUp delay={160}>
              <p>
                I know firsthand that starting a business offers the pride and gratification of
                being in control and having agency in the trajectory of your life. I value
                entrepreneurship and want to bring that same care and attentiveness that you do to
                your business.
              </p>
            </FadeUp>
            {/* The five fields are a real inventory, not a rhetorical list —
                leave all five. "Systems development" is deliberate and she
                wants credit for it; do NOT shorten to "operations" and do NOT
                write "DevOps," which means deployment pipelines and
                infrastructure, not this.

                The "across all industries / stack of small processes" claim
                that used to close this paragraph moved to the home page hook
                slot on 2026-08-14. */}
            <FadeUp delay={240}>
              <p>
                As a self-proclaimed generalist, I&rsquo;ve worked across teaching, tech support,
                sales, customer service, and in operations and systems development.
              </p>
            </FadeUp>
            {/* Hers, verbatim. The one deliberately unserious line on the page. */}
            <FadeUp delay={320}>
              <p>
                I have two tuxedo cats named Moonie and Vivi. I enjoy taking Pilates classes and
                listening to audiobooks with post-apocalyptic themes.
              </p>
            </FadeUp>
          </div>

          <FadeUp delay={360}>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-primary mt-10">
              Book a discovery call
            </a>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
