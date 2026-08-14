import { useState } from "react";
import { StateCycle } from "@/components/StateCycle";
import { ASSESSMENT_URL, BOOKING_URL, positioning } from "@/content/projects";

/**
 * Real photograph, three-quarter framing. The earlier AI-rendered headshot is
 * kept for /about so the two pages don't show the identical image.
 */
const PROFILE_PHOTO = "/headshot2.png";

/**
 * Full-bleed hero: one deep slate block, one photo, split down the middle.
 *
 * Built as a SINGLE grid on purpose. An earlier version stacked two grids
 * (headline+photo, then lede+CTAs), which left a dead gap under a short
 * headline because the photo set the first row's height. All the copy now
 * lives in one column that flows, so the length of the headline can't punch
 * a hole in the layout.
 */
function Portrait() {
  const [ok, setOk] = useState(true);

  if (!ok) {
    return <div className="absolute inset-0 h-full w-full bg-accent" aria-hidden />;
  }

  return (
    <img
      src={PROFILE_PHOTO}
      alt="Ruthnie Benoit"
      onError={() => setOk(false)}
      /* absolute + inset so the image fills a height-capped grid cell instead
         of forcing the row taller than the viewport cap.
         Focal point sits at 18% rather than the top edge: pinning to `top`
         cropped the frame at mid-neck once the hero height came down, and 28%
         left too much dead air above her head. This keeps a little headroom
         and carries the frame through mid-chest. */
      className="absolute inset-0 h-full w-full object-cover object-[center_18%]"
    />
  );
}

export function Hero() {
  return (
    <section data-hero className="bg-ink-wash text-white">
      {/* Height tracks the viewport minus the sticky header, so the hero ends
          right at the fold — tall enough to give the portrait room for head
          through mid-chest, but never spilling a sliver below the screen the
          way the old fixed min-h-[44rem] did. */}
      <div className="grid md:h-[calc(100svh-4.5rem)] md:max-h-[52rem] md:min-h-[38rem] md:grid-cols-2">
        {/* Copy side */}
        <div className="flex flex-col justify-center px-5 py-12 md:px-12 md:py-16 lg:px-16">
          {/* The three states lead and carry the positioning on their own. Her
              name is overlaid on the portrait instead of sitting in this
              column — it identifies the photo, which is where a visitor looks
              for it anyway. See VOICE.md: not a pipeline, and all three words
              stay visible so no visitor sees a state that excludes them. */}
          <h1 className="sr-only">
            {positioning.headline} — {positioning.role}
          </h1>

          <StateCycle />

          <p className="lede mt-7 max-w-lg text-white/80">{positioning.lede}</p>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-invert">
              Book a discovery call
            </a>
            <a
              href={ASSESSMENT_URL}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-white/85 underline underline-offset-4 decoration-white/30 transition-colors hover:text-white hover:decoration-white"
            >
              Take the free assessment ↗
            </a>
          </div>
        </div>

        {/* Photo side — full bleed, no rounding, no border. The name plate sits
            bottom-left over a scrim so it stays legible against any crop. */}
        <div className="relative order-first h-72 sm:h-[24rem] md:order-last md:h-auto">
          <Portrait />

          {/* Scrim: only the lower third, so it darkens the plate without
              washing out her face. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent"
          />

          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <p className="font-serif text-2xl leading-tight text-white md:text-3xl">
              {positioning.headline}
            </p>
            <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/75 md:text-sm">
              {positioning.role}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
