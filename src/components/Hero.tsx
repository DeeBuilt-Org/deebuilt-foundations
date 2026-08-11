import { useState } from "react";
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
    return <div className="h-full w-full bg-accent" aria-hidden />;
  }

  return (
    <img
      src={PROFILE_PHOTO}
      alt="Ruthnie Benoit"
      onError={() => setOk(false)}
      className="h-full w-full object-cover object-[center_top]"
    />
  );
}

export function Hero() {
  return (
    <section data-hero className="bg-ink-wash text-white">
      <div className="grid md:min-h-[44rem] md:grid-cols-2">
        {/* Copy side */}
        <div className="flex flex-col justify-center px-5 py-14 md:px-12 md:py-20 lg:px-16">
          {/* Role above the name — it lands harder as a label the name then
              answers. Name sized down from display-xl; at full scale it
              wrapped and read like a slogan instead of a name. */}
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
            {positioning.role}
          </p>

          <h1 className="display-lg mt-4 text-white">
            {positioning.headline}
          </h1>

          <p className="lede mt-7 max-w-lg text-white/80">
            {positioning.lede}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-invert"
            >
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

        {/* Photo side — full bleed, no rounding, no border. On mobile it caps
            its height so the copy still leads. */}
        <div className="order-first h-80 sm:h-[26rem] md:order-last md:h-auto">
          <Portrait />
        </div>
      </div>
    </section>
  );
}
