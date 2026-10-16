import { BOOKING_URL } from "@/content/projects";
import { solutions, solutionsPage } from "@/content/solutions";

/**
 * Solutions hero: one slate band, type only, no photo.
 *
 * The headline is set at display size with "buildable" in italic, which is
 * where the line's weight is. The right side is an index of the eight
 * solutions as jump links, so the hero does a job instead of decorating: a
 * visitor sees the whole range before scrolling and goes straight to the one
 * that applies.
 *
 * Carries data-hero so SiteHeader stays slate over it, the same way it does
 * over the home hero.
 */
export function SolutionsHero() {
  const [lead, last] = splitLastWord(solutionsPage.header);

  return (
    <section data-hero className="bg-ink-wash text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 pb-14 pt-14 md:grid-cols-12 md:gap-10 md:px-10 md:pb-24 md:pt-24">
        <div className="md:col-span-7 md:self-end">
          <h1 className="display-xl">
            {lead} <em className="italic text-accent-soft">{last}</em>
          </h1>
          <p className="lede mt-7 max-w-md text-white/75">{solutionsPage.subtitle}</p>
          {/* ONE button, booking only, hers 2026-10-16. No assessment link:
              after "Better is buildable" the next step is a call, not another
              quiz. "Pick a time to talk" over "Schedule a call", which read
              passive. Not the home hero's pair on purpose. */}
          <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="btn-invert mt-9">
            Pick a time to talk
          </a>
        </div>

        <nav aria-label="Solutions on this page" className="md:col-span-5 md:col-start-8 md:self-end">
          <ul className="grid grid-cols-1 border-t border-white/20 sm:grid-cols-2 md:grid-cols-1">
            {solutions.map((s) => (
              <li key={s.id} className="border-b border-white/20">
                <a
                  href={`#${s.id}`}
                  className="group flex items-center justify-between gap-3 py-3 text-[0.9375rem] text-white/80 transition-colors hover:text-white sm:pr-4 md:pr-0"
                >
                  {s.title}
                  <span
                    aria-hidden
                    className="text-white/40 transition-transform group-hover:translate-y-0.5 group-hover:text-white"
                  >
                    ↓
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
