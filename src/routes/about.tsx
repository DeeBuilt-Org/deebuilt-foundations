import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import {
  AIRTABLE_CERT_URL,
  BOOKING_URL,
  HUBSPOT_CERT_URL,
  positioning,
} from "@/content/projects";

/** Headshot lives in /public. */
const PROFILE_PHOTO = "/Prof Headshot.png";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — DeeBuilt" },
      {
        name: "description",
        content:
          "Ruthnie (Dee) Benoit, operations, automation, and systems consultant. What I work on, and how I got here.",
      },
      { property: "og:title", content: "About — DeeBuilt" },
      {
        property: "og:description",
        content:
          "Ruthnie (Dee) Benoit, operations, automation, and systems consultant. What I work on, and how I got here.",
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

          {/* CERTIFICATIONS — added 2026-08-28.
              Deliberately NOT a logo wall. Vendor badges in a row are a
              three-up grid by another name (banned, global VOICE.md §6).

              Certifications and partner programs ONLY. A "Builds on" row
              listing Monday, Airtable, Zapier, Supabase was cut on her read:
              she didn't want the platform list here, and the label had no
              subject in it, so it read as a caption written about her by
              someone else.

              Sits below the booking button on purpose. It qualifies her for a
              reader already reaching for the CTA and shouldn't compete with it.

              TWO TIERS, hers 2026-08-29. Badges on top under "Certified",
              everything else as text under "Also certified".

              Her reasoning, and it's positioning rather than layout: HubSpot
              and Airtable are not equal signals. HubSpot reads as revenue
              (their lead pipeline is what the name carries), Airtable reads
              as where you keep your work. Promoting the one that signals
              moneymaking is the point. A visitor who specifically wants
              Airtable still finds it listed.

              This also beats a single uniform row, which was the earlier
              proposal: flattening every credential into the same shape hides
              a real difference in how established the programs are. A vendor
              who built a badge, a share flow, and a hosted credential page
              invested in that certification being seen.

              Scales without a redesign. New badges join the top, anything
              without artwork drops into the list. Do NOT fabricate a badge
              for a vendor that doesn't issue one (Airtable doesn't): a
              home-made badge beside a real one looks home-made.

              LABELS: "Specializations" over the badges, "Also certified"
              under. "Certified / Also certified" was redundant, hers. The top
              label has to mean highlighted, not certified, and specializing
              in RevOps is a truer claim than merely having passed it.

              The tier split is vendor-issued badge vs. a row we build. The
              lower rows carry the issuer's logo at the left, which is the
              same nominative fair use as the badge: she holds the credential
              and the mark identifies who issued it. What stays banned is
              INVENTING a badge for a vendor that never made one.

              Airtable ACADEMY lockup, not the bare Airtable mark. It names
              the actual issuer (their academy program, not the company),
              which also keeps it from implying a partnership she doesn't
              have, and it matches "HubSpot Academy" on the badge above.

              The badge PNG is served from /public, NOT hotlinked from
              HubSpot's S3 bucket the way their embed snippet does it. Their
              markup points at
              hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/...,
              which is an external request on every page load and a broken
              image the day they move the file.

              Names are copied off the certificates themselves. Do not shorten
              "HubSpot Revenue Operations Certified" to "RevOps": the full term
              is what a buyer searches and what the credential says.

              Both credentials link to their verification pages, target
              _blank so the visitor keeps this tab. HubSpot's is the URL from
              their own embed snippet; Airtable verifies through Skilljar,
              who runs their academy.

              EXPIRES. Airtable runs to 2028-09-26, HubSpot to 2028-09-27.
              A lapsed certification on a site is worse than no certification,
              so both come off if they aren't renewed by then.

              PENDING:
              • Monday.com — taking Champion Essentials now (the role she
                plays on the current Upwork engagement). Monday charges for the
                cert itself. Worth buying when she applies to their partner
                program after the current engagement ships, not before: a cert
                is a signal for strangers, and it does nothing for a client who
                already hired her. Course ≠ certification, so nothing goes
                here until she passes and says so. */}
          <FadeUp delay={420}>
            <div className="mt-14 border-t border-hairline pt-8">
              <p className="eyebrow-muted">Specializations</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-6">
                <a
                  href={HUBSPOT_CERT_URL}
                  target="_blank"
                  rel="noreferrer"
                  title="HubSpot Revenue Operations Certified"
                  className="transition-opacity hover:opacity-70"
                >
                  <img
                    src="/hubspot-revops-badge.png"
                    alt="HubSpot Revenue Operations Certified"
                    width={666}
                    height={355}
                    loading="lazy"
                    className="h-20 w-auto md:h-24"
                  />
                </a>
              </div>

              <p className="eyebrow-muted mt-10">Also certified</p>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    href={AIRTABLE_CERT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex flex-wrap items-center gap-x-4 gap-y-2 text-foreground transition-colors hover:text-accent"
                  >
                    <img
                      src="/airtable-academy-logo.png"
                      alt="Airtable Academy"
                      width={1523}
                      height={163}
                      loading="lazy"
                      className="h-[22px] w-auto md:h-6"
                    />
                    <span className="font-serif text-lg md:text-xl">Builder Certification</span>
                    <span className="text-xs text-muted transition-colors group-hover:text-accent">
                      Verify
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
