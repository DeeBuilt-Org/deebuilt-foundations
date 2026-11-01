import type { MouseEventHandler } from "react";
import { BOOKING_URL } from "@/content/projects";
import { smallerOffers, stageOffers } from "@/content/services";
import { solutionsPage } from "@/content/solutions";

/**
 * Services hero: one slate band, type only, no photo.
 *
 * The headline is set at display size with "buildable" in italic, which is
 * where the line's weight is. The right side lists every service with its
 * price, so a visitor sees the range and the cost before scrolling. It replaced
 * the index of eight solutions on 2026-11-01, when this page took over from
 * Solutions.
 *
 * Carries data-hero so SiteHeader stays slate over it, the same way it does
 * over the home hero.
 */
const priceList = [
  ...smallerOffers.map((offer) => ({
    href: `#${offer.id}`,
    name: offer.name,
    price: offer.price,
    startingAt: offer.startingAt,
  })),
  ...stageOffers.map((stage) => ({
    href: "#stages",
    name: stage.name,
    price: stage.price,
    startingAt: true,
  })),
];

export function ServicesHero({ onBook }: { onBook: MouseEventHandler<HTMLAnchorElement> }) {
  const [lead, last] = splitLastWord(solutionsPage.header);

  return (
    <section data-hero className="bg-ink-wash text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-14 pt-14 md:grid-cols-12 md:gap-10 md:px-10 md:pb-24 md:pt-24">
        <div className="md:col-span-7 md:self-end">
          <h1 className="display-xl">
            {lead} <em className="italic text-accent-soft">{last}</em>
          </h1>
          <p className="lede mt-7 max-w-md text-white/75">{solutionsPage.subtitle}</p>
          {/* ONE button, booking only, hers 2026-10-16. "Pick a time to talk"
              over "Schedule a call", which read passive. */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            onClick={onBook}
            className="btn-invert mt-9"
          >
            Pick a time to talk
          </a>
        </div>

        <nav aria-label="Services and prices" className="md:col-span-5 md:col-start-8 md:self-end">
          <ul className="border-t border-white/20">
            {priceList.map((item) => (
              <li key={item.name} className="border-b border-white/20">
                <a
                  href={item.href}
                  className="flex items-baseline justify-between gap-4 py-3 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                >
                  {item.name}
                  <span className="shrink-0 text-sm text-white/60">
                    {item.startingAt ? "From " : ""}
                    {item.price}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}

/** "Better is buildable." → ["Better is", "buildable."] */
function splitLastWord(text: string): [string, string] {
  const i = text.lastIndexOf(" ");
  return i === -1 ? ["", text] : [text.slice(0, i), text.slice(i + 1)];
}
