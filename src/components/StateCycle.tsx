import { useEffect, useState } from "react";

/**
 * The three business states DeeBuilt is hired for. Settled 2026-08-14 — see
 * VOICE.md "The hero rotator". They are NOT a pipeline: a business can sit in
 * any one of them at any time, so no ordering logic should imply progression.
 */
const STATES = ["Launch", "Scale", "Reorganize"] as const;

/** Milliseconds each word stays lit. Slow enough to read, not to wait on. */
const DWELL = 2600;

/**
 * All three words stay on screen the whole time; only the highlight moves.
 *
 * A conventional rotator swaps ONE slot, which hides two-thirds of the
 * positioning at any given moment — someone who is launching may look at the
 * hero during the "Reorganize" beat and conclude the site isn't for them.
 * Keeping every word visible removes that cost while still giving the section
 * motion.
 *
 * Respects prefers-reduced-motion by parking on the first word.
 */
export function StateCycle({ className = "" }: { className?: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const id = setInterval(() => setActive((i) => (i + 1) % STATES.length), DWELL);
    return () => clearInterval(id);
  }, []);

  return (
    <p className={`state-cycle ${className}`}>
      {STATES.map((word, i) => (
        <span key={word} className={`state-word ${i === active ? "is-active" : ""}`}>
          {word}
          <span aria-hidden className="state-dot">
            .
          </span>
        </span>
      ))}
    </p>
  );
}
