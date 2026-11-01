import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EmbedPopup, type PopupKey } from "@/components/EmbedPopup";
import { FadeUp } from "@/components/FadeUp";
import { Hero } from "@/components/Hero";
import { OpsetteFormEmbed } from "@/components/OpsetteFormEmbed";
import { ToolCard } from "@/components/resources/ToolCard";
import { ServiceList } from "@/components/ServiceList";
import type { ToolResource } from "@/content/resources";
import {
  AIRTABLE_AGENTIC_CERT_URL,
  AIRTABLE_CERT_URL,
  ASSESSMENT_URL,
  BOOKING_URL,
  CONTACT_EMBED_SOURCE,
  CONTACT_FORM_SLUG,
  HUBSPOT_CERT_URL,
  PLATFORM_PICKER_URL,
  SPEC_URL,
  services,
} from "@/content/projects";

/**
 * The quiz only, not the whole Decision Lab site. The description is adapted
 * from the Resources page entry, which describes the wider site.
 */
const PLATFORM_PICKER: ToolResource = {
  kind: "tool",
  stage: "scaling",
  title: "Platform Picker",
  description: "See which platform fits your team now and what you'll need next.",
  cta: "Find your platform",
  href: PLATFORM_PICKER_URL,
  featured: true,
  image: {
    src: "/resources/decision-lab-platform-picker.png",
    alt: "Platform Picker card asking how comfortable your team is with new software, with seven platform logos and a ranking preview",
    width: 498,
    height: 324,
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ruthnie Benoit — Operations, Automation, and Systems Consultant" },
      {
        name: "description",
        content:
          "Operations and systems design for businesses launching, scaling, or reorganizing.",
      },
      {
        property: "og:title",
        content: "Ruthnie Benoit — Operations, Automation, and Systems Consultant",
      },
      {
        property: "og:description",
        content: "Operations and systems design for businesses at any stage.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const [popup, setPopup] = useState<PopupKey | null>(null);

  // Every trigger stays a real link, so ctrl-click still opens a new tab.
  const openPopup = (key: PopupKey) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setPopup(key);
  };

  return (
    <>
      <EmbedPopup popup={popup} onClose={() => setPopup(null)} />

      <Hero onBook={openPopup("booking")} onAssessment={openPopup("assessment")} />

      {/* The hook. One sentence, standing alone — no paragraph under it (removed
          2026-08-14; it explained how an engagement opens, which is about her at
          the moment a reader is still deciding whether the site is about them). */}
      <section>
        <div className="mx-auto max-w-[88rem] px-5 py-10 md:px-10 md:py-12">
          <FadeUp>
            {/* Hers, moved here from the About page 2026-08-14. States a
                principle instead of a service, which is why it earns the
                standalone slot.

                It is also grounded, though she arrived at it on her own:
                outcomes come from the system (Deming), and improvement is
                capped by the constraint, so effort spent anywhere but the
                weakest process barely moves output (Goldratt's Theory of
                Constraints).

                Previously here: "If information only moves when you move it,
                you need better integrations." Dropped 2026-08-14 — it's a
                diagnosis she still likes, but it had no home that worked. She
                has it saved elsewhere. Do not reinstate without her. */}
            <p className="display-lg text-center text-foreground">
              Your business is capped by your{" "}
              <span className="underline decoration-saffron decoration-4 underline-offset-8 [text-decoration-skip-ink:none]">
                weakest process.
              </span>
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Services: the question on the left, its six answers on the right. */}
      <section className="border-t border-hairline bg-surface-raised">
        <div className="mx-auto grid max-w-[88rem] gap-6 px-5 py-10 md:px-10 md:py-12 lg:grid-cols-12 lg:gap-8">
          <FadeUp className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              Which sounds familiar?
            </p>
          </FadeUp>
          <div className="lg:col-span-9">
            <ServiceList services={services} />
          </div>
        </div>
      </section>

      {/* Operations assessment, in its own slim band.

          Sits BELOW the flip cards on purpose (moved 2026-08-14). The cards
          are the qualifier — six symptoms in a customer's voice, with the
          flip as a micro-commitment. The assessment is the heavier ask
          (20+ statements, scored, ends in a capture), so it only makes sense
          once someone has already recognized themselves in a card. Above the
          cards it was asking for too much too early. */}
      <section className="border-y border-hairline bg-accent-tint">
        <div className="mx-auto flex max-w-[88rem] flex-col gap-6 px-5 py-10 md:px-10 md:py-12 lg:flex-row lg:items-center lg:justify-between">
          <FadeUp>
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              See how your operations stack up.
            </p>
          </FadeUp>
          <FadeUp delay={100} className="flex flex-col items-start gap-2 lg:shrink-0 lg:items-center">
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noreferrer"
              onClick={openPopup("assessment")}
              className="btn-primary"
            >
              Take the full assessment
            </a>
            {/* Hers, 2026-08-19. Was "About two minutes. You get your score
                before we ask for anything." — naming the ask is what made it
                read as creepy: it plants the idea that something is coming.
                The form handles the capture on its own. */}
            <p className="text-sm text-foreground/75">About two minutes to get your score.</p>
          </FadeUp>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[88rem] px-5 py-10 md:px-10 md:py-12">
          <FadeUp>
            <ToolCard
              tool={PLATFORM_PICKER}
              tone="featuredLight"
              split
              onClick={openPopup("picker")}
            />
          </FadeUp>
        </div>
      </section>

      {/* Certifications from /about, keeping her two tiers and one logo per
          platform. */}
      <section className="bg-surface-raised">
        <div className="mx-auto grid max-w-[88rem] gap-10 px-5 py-12 md:px-10 md:py-14 lg:grid-cols-12 lg:gap-6">
          <FadeUp className="lg:col-span-4">
            <p className="text-sm font-semibold text-foreground">Specializations</p>
            <div className="mt-4 flex flex-wrap items-center gap-6">
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
                  className="h-20 w-auto"
                />
              </a>
              <img
                src="/monday-core-badge.png"
                alt="monday.com certified, Work Management Core, monday academy"
                width={507}
                height={507}
                loading="lazy"
                className="h-20 w-auto"
              />
            </div>
          </FadeUp>

          <FadeUp delay={100} className="lg:col-span-8">
            <p className="text-sm font-semibold text-foreground">Also certified</p>
            <ul className="mt-4 flex flex-wrap gap-x-12 gap-y-6">
              <li>
                <img
                  src="/airtable-academy-logo.png"
                  alt="Airtable Academy"
                  width={1523}
                  height={163}
                  loading="lazy"
                  className="h-5 w-auto"
                />
                <div className="mt-2 flex flex-col text-sm">
                  <a
                    href={AIRTABLE_AGENTIC_CERT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Agentic Systems Design
                  </a>
                  <a
                    href={AIRTABLE_CERT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    Builder Certification
                  </a>
                </div>
              </li>
              <li>
                <img
                  src="/smartsuite-logo.svg"
                  alt="SmartSuite"
                  width={158}
                  height={25}
                  loading="lazy"
                  className="h-5 w-auto"
                />
                <p className="mt-2 text-sm">Pro Certification</p>
              </li>
              <li>
                <img
                  src="/softr-logo.svg"
                  alt="Softr"
                  width={845}
                  height={256}
                  loading="lazy"
                  className="h-5 w-auto"
                />
                <p className="mt-2 text-sm">Professional Certification</p>
              </li>
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* Closing CTA — dark band. The inverted color gives the page a hard stop
          instead of fading out.

          The get-in-touch form is the one main action here. Booking is a line of
          text beside it (hers, 2026-11-01), for the visitor who would rather
          talk first. Every on-site "send a message" link jumps here
          (#get-in-touch). The form sits in a light panel, NOT transparent: a
          transparent form puts its dark text on this dark band. Inside the
          panel, transparent is fine and drops the form's own gray background.
          Header hidden: the band's heading already does that job. Stacked on a
          phone, form under the booking line. */}
      <section id="get-in-touch" className="scroll-mt-28 bg-ink-wash text-white">
        <div className="mx-auto max-w-[88rem] px-5 py-16 md:px-10 md:py-24">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <FadeUp>
                <p className="display-lg max-w-3xl text-white">
                  Get in touch for <span className="text-saffron">real solutions.</span>
                </p>
              </FadeUp>
              <FadeUp delay={100}>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                  Prefer to talk first?{" "}
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={openPopup("booking")}
                    className="underline underline-offset-4 transition-colors hover:text-white"
                  >
                    Book a discovery call.
                  </a>
                </p>
              </FadeUp>
            </div>
            <FadeUp delay={200} className="md:col-span-7">
              <div className="overflow-hidden rounded-md bg-surface">
                <OpsetteFormEmbed
                  form={CONTACT_FORM_SLUG}
                  source={CONTACT_EMBED_SOURCE}
                  title="Get in touch form"
                  hideHeader
                  transparent
                />
              </div>
            </FadeUp>
          </div>
          <FadeUp delay={240}>
            <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/15 pt-6 text-sm">
              <span className="text-white/60">More from DeeBuilt</span>
              <a
                href={SPEC_URL}
                target="_blank"
                rel="noreferrer"
                className="font-medium text-white/90 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Specs ↗
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
