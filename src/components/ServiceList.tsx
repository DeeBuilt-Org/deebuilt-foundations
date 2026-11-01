import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import type { Service } from "@/content/projects";

/** Solid saffron on the card front. Outlined on the back, which is saffron already. */
function FlipIcon({ solid = false, className = "" }: { solid?: boolean; className?: string }) {
  const tone = solid ? "bg-saffron text-foreground" : "border border-foreground/40 text-foreground";

  return (
    <span
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full transition-all duration-300 group-hover:bg-accent group-hover:text-white ${tone} ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-180"
        aria-hidden="true"
      >
        <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.5-4" />
        <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.5 4" />
        <path d="M20 3v4.5H15.5" />
        <path d="M4 21v-4.5H8.5" />
      </svg>
    </span>
  );
}

/**
 * One flip card: symptom on the front, service name + diagnosis on the back.
 *
 * Click to flip, not hover — hover has no touch equivalent, so a tap would
 * fire it once and leave the card stuck. Rendered as a real <button> so it
 * works from the keyboard, and the hidden face is aria-hidden so a screen
 * reader doesn't announce both sides at once.
 *
 * The cards don't link to the Solutions page (hers, 2026-11-01). The two lists
 * don't line up yet, and that page has no next step to send a visitor toward.
 */
function ServiceCard({ service }: { service: Service }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((v) => !v)}
      aria-expanded={flipped}
      aria-label={
        flipped
          ? `${service.title}. Show the symptom again.`
          : `${service.symptom} See what's behind it.`
      }
      className="flip-scene group relative h-full w-full cursor-pointer bg-background text-left"
      data-flipped={flipped}
    >
      <div className="flip-inner h-full">
        {/* Front — the symptom */}
        <div
          className="flip-face flex h-full items-start justify-between gap-4 bg-[#fbf0d9] p-5 transition-colors duration-300 group-hover:bg-[#f8e7c2]"
          aria-hidden={flipped}
        >
          <p className="font-serif text-xl leading-snug text-foreground">{service.symptom}</p>
          <FlipIcon solid className="shrink-0" />
        </div>

        {/* Back — the service and the diagnosis */}
        <div
          className="flip-back flip-face flex h-full items-start justify-between gap-4 bg-saffron p-5"
          aria-hidden={!flipped}
        >
          <div>
            <p className="text-sm font-semibold text-foreground">{service.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{service.description}</p>
          </div>
          <FlipIcon className="shrink-0" />
        </div>
      </div>
    </button>
  );
}

/**
 * Qualification grid, not a service list. A visitor scans six complaints,
 * recognizes one, and flips it to see what's behind it. All six are the same
 * size and tone because they are the same kind of thing.
 *
 * Two columns so it reads as a set to compare rather than a list to read top
 * to bottom. Keep the count even (six since 2026-09-28) so no row is left
 * with an empty cell, and never three.
 *
 * No CTA under the grid. "More than one of these sound familiar? Score your
 * operations in two minutes" was cut 2026-08-19 — it re-asked the section
 * heading ("Which sounds familiar?") a few inches below it, and the assessment
 * band directly after this makes the ask a third time.
 */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-2">
      {services.map((service, i) => (
        <FadeUp key={service.title} delay={i * 50} className="flex">
          <ServiceCard service={service} />
        </FadeUp>
      ))}
    </div>
  );
}
