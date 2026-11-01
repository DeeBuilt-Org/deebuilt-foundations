import type { MouseEventHandler, ReactNode } from "react";
import { NotIncluded } from "@/components/NotIncluded";
import { BOOKING_URL } from "@/content/projects";
import type { SmallerOffer } from "@/content/services";

/**
 * One smaller service as a card. These differ in kind (a session, a website, a
 * sprint), so the page gives each its own tone and width.
 *
 * An offer sold on the spot with no `buyUrl` shows its button without a link,
 * so it never points to a checkout that doesn't exist.
 */
export type OfferCardTone = "tint" | "surface" | "outline";

const tones: Record<OfferCardTone, string> = {
  tint: "bg-accent-tint",
  surface: "border border-hairline bg-surface",
  outline: "border border-foreground/15",
};

export function OfferCard({
  offer,
  tone,
  wide = false,
  onBook,
  children,
}: {
  offer: SmallerOffer;
  tone: OfferCardTone;
  wide?: boolean;
  onBook: MouseEventHandler<HTMLAnchorElement>;
  children?: ReactNode;
}) {
  return (
    <article
      id={offer.id}
      className={`flex h-full scroll-mt-28 flex-col rounded-lg p-7 text-foreground md:p-9 ${tones[tone]}`}
    >
      <h3 className="font-serif text-3xl leading-tight md:text-4xl">{offer.name}</h3>
      <p className="mt-3 text-lg text-accent">
        {offer.startingAt ? "Starting at " : ""}
        {offer.price}
        {offer.priceNote && <span className="text-base text-foreground/70"> {offer.priceNote}</span>}
      </p>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-foreground/75">
        {offer.description}
      </p>
      <ul
        className={`mt-6 grid gap-x-10 gap-y-2.5 text-[0.9375rem] leading-relaxed ${
          wide ? "md:grid-cols-2" : ""
        }`}
      >
        {offer.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {offer.terms && <p className="mt-5 text-sm text-foreground/70">{offer.terms}</p>}
      {children}
      {/* mt-auto pins the button to the bottom when a neighbor sets the height. */}
      <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-8">
        <OfferButton offer={offer} onBook={onBook} />
        <NotIncluded
          name={offer.name}
          items={offer.notIncluded}
          intro={offer.scope}
          className="text-foreground/75 hover:text-foreground"
        />
      </div>
    </article>
  );
}

function OfferButton({
  offer,
  onBook,
}: {
  offer: SmallerOffer;
  onBook: MouseEventHandler<HTMLAnchorElement>;
}) {
  if (offer.buyNow) {
    return offer.buyUrl ? (
      <a href={offer.buyUrl} className="btn-primary">
        {offer.cta}
      </a>
    ) : (
      <span aria-disabled="true" className="btn-primary cursor-not-allowed">
        {offer.cta}
      </span>
    );
  }
  return (
    <a href={BOOKING_URL} target="_blank" rel="noreferrer" onClick={onBook} className="btn-primary">
      {offer.cta}
    </a>
  );
}
