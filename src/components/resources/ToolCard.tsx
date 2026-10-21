import type { ToolResource } from "@/content/resources";

/**
 * A free tool as a card. Added 2026-10-21 for the Resources page, replacing
 * an earlier row layout she rejected (rows, eyebrows, and chips made every
 * entry look identical, with nothing for the eye to land on).
 *
 * The page picks a tone per slot so neighboring cards never match, and so
 * each stage band (light, tint, dark) has tones that read on it:
 * - featured / featuredLight: a stage's focal card, largest type, dark or white
 * - tint / surface / outline / outlineInverse: the smaller cards around it
 *
 * The WHOLE card is the link (bigger target on a phone; it lifts on hover).
 * The button inside is a visual cue only, a span, so there's no link inside a
 * link. Tools open in a new tab. No href = "Coming soon", not clickable.
 *
 * A featured card with an image shows a real screenshot of the tool, anchored
 * to the bottom edge and cropped by it, so the card reads as a peek at the
 * tool rather than a framed picture. A small card shows its image cropped
 * from the top.
 *
 * `split` (md up): text on one side, image on the other, set by the page for
 * full-width and wide cards. The card's height then comes from its own text,
 * never from a neighbor. (2026-10-21: a featured card spanning two rows got
 * stretched by a taller neighbor and left a dead gap above its screenshot.)
 * Phones always stack.
 */
export type ToolCardTone =
  | "featured"
  | "featuredLight"
  | "tint"
  | "surface"
  | "outline"
  | "outlineInverse";

type ToneStyle = { card: string; body: string; quiet: string; button: string; large: boolean };

const tones: Record<ToolCardTone, ToneStyle> = {
  featured: {
    card: "bg-ink-wash text-white",
    body: "text-white/75",
    quiet: "text-white/60",
    button: "btn-invert",
    large: true,
  },
  featuredLight: {
    card: "bg-surface text-foreground",
    body: "text-muted",
    quiet: "text-muted",
    button: "btn-primary",
    large: true,
  },
  tint: {
    card: "bg-accent-tint text-foreground",
    body: "text-muted",
    quiet: "text-muted",
    button: "btn-secondary",
    large: false,
  },
  surface: {
    card: "border border-hairline bg-surface text-foreground",
    body: "text-muted",
    quiet: "text-muted",
    button: "btn-secondary",
    large: false,
  },
  outline: {
    card: "border border-foreground/15 text-foreground",
    body: "text-muted",
    quiet: "text-muted",
    button: "btn-secondary",
    large: false,
  },
  outlineInverse: {
    card: "border border-white/20 text-white",
    body: "text-white/70",
    quiet: "text-white/55",
    button: "inline-flex items-center gap-2 border-b border-white/30 py-2 text-[0.9375rem] font-medium text-white",
    large: false,
  },
};

export function ToolCard({
  tool,
  tone,
  split = false,
}: {
  tool: ToolResource;
  tone: ToolCardTone;
  split?: boolean;
}) {
  const t = tones[tone];
  const image = tool.image;
  const sideBySide = split && Boolean(image);

  const inner = (
    <>
      <div className={sideBySide ? "md:flex-1" : ""}>
        {/* Small cards: the title IS the link cue, underlined with ↗, no
            separate link line (hers, 2026-10-21, to save space). Only the
            large cards keep a button. */}
        <h3
          className={
            t.large
              ? "display-lg max-w-md"
              : "font-serif text-[1.75rem] leading-tight md:text-3xl"
          }
        >
          {!t.large && tool.href ? (
            <span className="underline decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-2">
              {tool.title}
              <span className="ml-1.5 inline-block text-[0.7em] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                ↗
              </span>
            </span>
          ) : (
            tool.title
          )}
        </h3>
        <p
          className={`mt-4 max-w-md leading-relaxed ${t.body} ${
            t.large ? "text-base md:text-lg" : "text-[0.9375rem]"
          }`}
        >
          {tool.description}
        </p>
        {t.large && tool.href && (
          <div className="mt-8">
            <span className={t.button}>{tool.cta} ↗</span>
          </div>
        )}
        {!tool.href && <p className={`mt-6 text-sm ${t.quiet}`}>Coming soon</p>}
      </div>

      {image && !t.large && (
        <div
          className={`mt-8 aspect-[41/24] overflow-hidden rounded-md border border-hairline ${
            sideBySide ? "md:mt-0 md:flex-1 md:self-center" : ""
          }`}
        >
          <img
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}

      {/* Tall screenshot (the planner): peeks up from the bottom edge,
          cropped by it. Wide screenshot (Decision Lab): shown whole and
          centered, since cropping it would cut off its content. Decided by
          the image's own proportions, not by which tool it is. */}
      {image && t.large && image.height > image.width && (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={`mt-10 -mb-24 w-full max-w-[18rem] self-end rounded-lg shadow-[0_24px_48px_-20px_rgba(var(--shadow-ink),0.55)] transition-transform duration-500 group-hover:-translate-y-2 md:-mb-28 md:max-w-[20rem] ${
            sideBySide ? "md:mt-0" : ""
          }`}
        />
      )}
      {image && t.large && image.height <= image.width && (
        <img
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          className={`mt-10 w-full max-w-[26rem] self-center rounded-lg transition-transform duration-500 group-hover:-translate-y-1 ${
            sideBySide ? "md:mt-0" : ""
          }`}
        />
      )}
    </>
  );

  const base = `flex h-full flex-col justify-between overflow-hidden rounded-lg p-7 md:p-9 ${
    sideBySide ? "md:flex-row md:gap-12" : ""
  } ${t.card}`;

  if (!tool.href) return <article className={base}>{inner}</article>;

  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noreferrer"
      className={`group ${base} transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_-22px_rgba(var(--shadow-ink),0.45)]`}
    >
      {inner}
    </a>
  );
}
