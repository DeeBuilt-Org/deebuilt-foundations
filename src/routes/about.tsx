import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import {
  AIRTABLE_AGENTIC_CERT_URL,
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
            {/* Booking button moved here 2026-09-22, hers. It used to close
                the right column under the certifications, which pushed it
                further down the page every time a credential was added. On
                the portrait it sits with her name at the top of the page and
                stays put no matter how long that list gets. */}
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-primary mt-6">
              Book a discovery call
            </a>
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

          {/* CERTIFICATIONS — added 2026-08-28.
              Deliberately NOT a logo wall. Vendor badges in a row are a
              three-up grid by another name (banned, global VOICE.md §6).

              Certifications and partner programs ONLY. A "Builds on" row
              listing Monday, Airtable, Zapier, Supabase was cut on her read:
              she didn't want the platform list here, and the label had no
              subject in it, so it read as a caption written about her by
              someone else.

              Sits ABOVE the booking button (moved 2026-09-22). Below it the
              section was past the point where anyone still scrolls, so the
              reader most likely to want reassurance never saw it. Now it
              lands while they're still reading and the ask follows it.

              ORDER within the tier is hers and it's strategic, not
              alphabetical: Airtable first because that's the work she wants
              more of. Sales Hub last because it's the one she cares least
              about.

              HubSpot Sales Hub Software Certified was REMOVED 2026-09-27,
              hers. The rule is ONE VISUAL INSTANCE PER PLATFORM: a platform's
              mark appears in one place on the page, however many credentials
              sit behind it. Airtable holds two certifications and is still
              one instance, because both names sit under a single Airtable
              Academy logo. HubSpot was appearing twice, RevOps up top and
              Sales Hub below, and the second instance took space without
              saying anything new. RevOps carries HubSpot on its own; someone
              who wants to know about Sales Hub will ask.

              She still holds it. hubspot-academy-logo.png and
              hubspot-saleshub-badge.png stay in /public, and
              HUBSPOT_SALESHUB_CERT_URL stays exported, so putting it back is
              a paste rather than a rebuild.

              monday Work Management Core, added 2026-09-26, sits in the TOP
              tier because it is a vendor-issued BADGE, which is what that
              tier is for. It also gives Specializations a second item, so
              the row finally reads as a set rather than one badge alone.

              The badge was cropped out of the LinkedIn share card monday
              hands you (a square "I'm officially..." graphic that does not
              belong on the page), then upscaled 3x and masked to a circle so
              the JPEG's white corners don't sit as a box on the paper
              background. monday's own certificate PDF is encrypted, so its
              copy of the seal could not be extracted.

              Worth noting for the $95: monday gave no verification page, no
              confirmation email, and no standalone badge file. Every other
              vendor here did at least one of those.

              GROUPED BY PLATFORM (2026-09-24, hers). One logo per row, every
              credential from that issuer stacked beside it, so a second
              Airtable certification didn't mean the Airtable mark appearing
              twice. Each name keeps its own verification link.

              Two different things happen when a certification is added to a
              platform that's already listed, and they are NOT the same edit:
              a higher LEVEL of the same credential (SmartSuite Pro becoming
              Expert) is a rename in place, because the new level supersedes
              the old one. A PARALLEL certification in a different subject
              (Agentic Systems Design next to Builder Certification) is a new
              name stacked under the same logo, because both stay true.

              Names stacked rather than inline: they're long enough to wrap
              badly on a phone side by side, and stacked reads as a list of
              credentials instead of one hyphenated title.

              SmartSuite's row is NOT a link. Its "verify" URL
              (mycourse.app/...) 302s to academy.smartsuite.com and serves the
              certificate PDF straight down, so clicking it downloads a file
              instead of opening a page. A link that silently downloads
              something is bad behavior, and with no hosted page there's
              nothing for it to prove. HubSpot and Airtable both resolve to
              real pages, so theirs stay.

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

              hubspot-academy-logo.png is CROPPED from the Sales Hub badge
              (2026-08-31). HubSpot publishes no standalone Academy lockup,
              so the wordmark band was cut out of the badge they issued and
              its white background cleared. The full badge is kept at
              hubspot-saleshub-badge.png if Sales Hub is ever promoted to the
              top tier.

              Cropping a logo out of a badge is fine. Cropping a BADGE down
              (dropping the credential name or her name and still presenting
              it as a badge) is not: it would leave a HubSpot-issued mark
              that no longer says what it certifies or who holds it.

              The badge PNG is served from /public, NOT hotlinked from
              HubSpot's S3 bucket the way their embed snippet does it. Their
              markup points at
              hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/...,
              which is an external request on every page load and a broken
              image the day they move the file.

              Names are copied off the certificates themselves. Do not shorten
              "HubSpot Revenue Operations Certified" to "RevOps": the full term
              is what a buyer searches and what the credential says.

              Every credential links to its verification page, target _blank
              so the visitor keeps this tab. No "Verify" label: it repeated on
              every row and the rows are clearly clickable without it. The link
              is a quiet bonus for anyone who checks, not a thing to announce. HubSpot's is the URL from
              their own embed snippet; Airtable verifies through Skilljar,
              who runs their academy.

              SmartSuite publishes no certification badge. Their certificate
              is vector art in a PDF with nothing extractable, so the row uses
              the official logo SVG off their own brand kit CDN
              (smartsuite.com/brand-kit), saved locally. Their brand rules say
              never use the icon without the wordmark, so this is the full
              lockup and must stay that way.

              Worth knowing: SmartSuite is the one vendor here with a
              published trademark policy, and it has no carve-out for
              certification holders. This is still nominative fair use (she
              holds the credential, the mark names the issuer, it sits in a
              certification list and not under "Partners"), and they put the
              same logo on the certificate they issued her. Flagged to her
              2026-09-22; marketing@smartsuite.com is the address on their
              brand kit if she ever wants it in writing.

              EXPIRES. Airtable Builder runs to 2028-09-26, Airtable Agentic
              Systems Design to 2028-10-24, HubSpot to 2028-09-27.
              SmartSuite's certificate states no expiry. A lapsed
              certification on a site is worse than no certification, so any
              of them comes off if it isn't renewed.

              PENDING:
              • Monday.com — taking Champion Essentials now (the role she
                plays on the current Upwork engagement). Monday charges for the
                cert itself. Worth buying when she applies to their partner
                program after the current engagement ships, not before: a cert
                is a signal for strangers, and it does nothing for a client who
                already hired her. Course ≠ certification, so nothing goes
                here until she passes and says so. */}
          <FadeUp delay={360}>
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
                {/* Not a link: monday issues no verification page, no
                    credential email, and nothing shareable beyond the
                    certificate PDF itself. */}
                <img
                  src="/monday-core-badge.png"
                  alt="monday.com certified, Work Management Core, monday academy"
                  width={507}
                  height={507}
                  loading="lazy"
                  className="h-20 w-auto md:h-24"
                />
              </div>

              <p className="eyebrow-muted mt-10">Also certified</p>
              <ul className="mt-4 space-y-6">
                <li className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                  <img
                    src="/airtable-academy-logo.png"
                    alt="Airtable Academy"
                    width={1523}
                    height={163}
                    loading="lazy"
                    className="h-[22px] w-auto shrink-0 self-start sm:mt-1 md:h-6"
                  />
                  <div className="flex flex-col gap-1">
                    <a
                      href={AIRTABLE_AGENTIC_CERT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-lg text-foreground transition-colors hover:text-accent md:text-xl"
                    >
                      Agentic Systems Design
                    </a>
                    <a
                      href={AIRTABLE_CERT_URL}
                      target="_blank"
                      rel="noreferrer"
                      className="font-serif text-lg text-foreground transition-colors hover:text-accent md:text-xl"
                    >
                      Builder Certification
                    </a>
                  </div>
                </li>
                <li className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-5">
                  <img
                    src="/smartsuite-logo.svg"
                    alt="SmartSuite"
                    width={158}
                    height={25}
                    loading="lazy"
                    className="h-[22px] w-auto shrink-0 self-start sm:mt-1 md:h-6"
                  />
                  <span className="font-serif text-lg text-foreground md:text-xl">
                    Pro Certification
                  </span>
                </li>
              </ul>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
