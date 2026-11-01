import { useState, type MouseEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EmbedPopup, type PopupKey } from "@/components/EmbedPopup";
import { FadeUp } from "@/components/FadeUp";
import { OfferCard } from "@/components/OfferCard";
import { ProblemLinks } from "@/components/ProblemLinks";
import { ServicesHero } from "@/components/ServicesHero";
import { StageOffers } from "@/components/StageOffers";
import { CONTACT_FORM_URL, PLATFORM_PICKER_URL } from "@/content/projects";
import { servicesPage, smallerOffers } from "@/content/services";

const DESCRIPTION =
  "Operations and systems services for businesses launching, scaling, or reorganizing, with starting prices.";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — DeeBuilt" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Services — DeeBuilt" },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
  component: Services,
});

/**
 * Added 2026-11-01. Took over from the Solutions page: a visitor could see the
 * problems she solves but not what to buy or what it costs. The solutions open
 * from the stage they belong to (ProblemLinks).
 * /solutions redirects here (public/_redirects).
 */
function Services() {
  const [popup, setPopup] = useState<PopupKey | null>(null);

  // Every trigger stays a real link, so ctrl-click still opens a new tab.
  const openPopup = (key: PopupKey) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey) return;
    event.preventDefault();
    setPopup(key);
  };

  const [session, debut, sprint] = smallerOffers;

  return (
    <>
      <EmbedPopup popup={popup} onClose={() => setPopup(null)} />

      <ServicesHero onBook={openPopup("booking")} />

      <section id="stages" className="scroll-mt-20">
        <div className="mx-auto max-w-6xl px-5 pb-10 pt-14 md:px-10 md:pb-14 md:pt-20">
          <FadeUp>
            <h2 className="display-lg">{servicesPage.stagesHeading}</h2>
            <p className="mt-3 text-base text-foreground/70 md:text-lg">{servicesPage.stagesNote}</p>
          </FadeUp>
          <FadeUp delay={80} className="mt-8 md:mt-10">
            <StageOffers onBook={openPopup("booking")} />
          </FadeUp>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-6 md:px-10 md:pb-24">
          <FadeUp>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">
              {servicesPage.smallerHeading}
            </h2>
          </FadeUp>
          <div className="mt-8 grid gap-5 md:grid-cols-12">
            <FadeUp className="md:col-span-5">
              <OfferCard offer={session} tone="tint" onBook={openPopup("booking")} />
            </FadeUp>
            <FadeUp delay={80} className="md:col-span-7">
              <OfferCard offer={debut} tone="surface" onBook={openPopup("booking")} />
            </FadeUp>
            <FadeUp delay={120} className="md:col-span-12">
              <OfferCard offer={sprint} tone="outline" wide onBook={openPopup("booking")}>
                <div className="mt-4">
                  <ProblemLinks
                    heading="Common problem"
                    ids={["platform-migration"]}
                    className="text-foreground/70"
                  />
                </div>
                <p className="mt-4 text-sm text-foreground/70">
                  Review the{" "}
                  <a
                    href="/resources/platform-migration-checklist.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="text-accent underline underline-offset-4"
                  >
                    Platform Migration Checklist
                  </a>{" "}
                  to prepare for moving your information to a new platform.
                </p>
                <p className="mt-2 text-sm text-foreground/70">
                  Not sure which platform fits?{" "}
                  <a
                    href={PLATFORM_PICKER_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={openPopup("picker")}
                    className="text-accent underline underline-offset-4"
                  >
                    Try the Platform Picker.
                  </a>
                </p>
              </OfferCard>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Closing ask, a slim band (hers, 2026-11-01). The page already carries a
          lot, so the get-in-touch form opens in a pop-up instead of sitting
          embedded here. It's for a visitor who wants to talk before choosing. */}
      <section className="border-t border-hairline bg-accent-tint">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:px-10 md:py-12 lg:flex-row lg:items-center lg:justify-between">
          <FadeUp>
            <p className="font-serif text-3xl leading-tight text-foreground md:text-4xl">
              {servicesPage.closing}
            </p>
          </FadeUp>
          <FadeUp delay={100} className="lg:shrink-0">
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noreferrer"
              onClick={openPopup("contact")}
              className="btn-primary"
            >
              {servicesPage.closingCta}
            </a>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
