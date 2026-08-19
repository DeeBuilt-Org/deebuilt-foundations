import { useState } from "react";
import { FadeUp } from "@/components/FadeUp";
import type { Service } from "@/content/projects";

/**
 * One flip card: symptom on the front, service + solution on the back.
 *
 * Click to flip, not hover — hover has no touch equivalent, so a tap would
 * fire it once and leave the card stuck. Rendered as a real <button> so it
 * works from the keyboard, and the hidden face is aria-hidden so a screen
 * reader doesn't announce both sides at once.
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
          : `${service.symptom} See how I fix it.`
      }
      className="flip-scene group relative h-full w-full cursor-pointer bg-background text-left transition-[transform,box-shadow] duration-300 hover:z-10 hover:-translate-y-1 hover:shadow-[0_16px_36px_-18px_rgba(var(--shadow-ink),0.35)]"
      data-flipped={flipped}
    >
      <div className="flip-inner h-full">
        {/* Front — the symptom */}
        <div
          className="flip-face flex h-full flex-col justify-between p-7 transition-colors duration-300 group-hover:bg-surface md:p-9"
          aria-hidden={flipped}
        >
          <p className="font-serif text-xl leading-snug text-foreground md:text-2xl">
            {service.symptom}
          </p>
          {/* Circular flip affordance. Icon only — the arrow rotates on
              hover so it reads as "this turns over" without a text label. */}
          <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
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
        </div>

        {/* Back — the service and what she does */}
        <div
          className="flip-back flip-face flex h-full flex-col justify-between bg-accent-tint p-7 md:p-9"
          aria-hidden={!flipped}
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {service.title}
            </span>
            <p className="mt-4 text-base leading-relaxed text-foreground">
              {service.description}
            </p>
          </div>
          <span className="mt-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 text-accent transition-all duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 transition-transform duration-500 group-hover:-rotate-180"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-7.5-4" />
              <path d="M3 12a9 9 0 0 1 9-9 9 9 0 0 1 7.5 4" />
              <path d="M20 3v4.5H15.5" />
              <path d="M4 21v-4.5H8.5" />
            </svg>
          </span>
        </div>
      </div>
    </button>
  );
}

/**
 * Qualification grid, not a service list. A visitor scans four complaints,
 * recognizes one, and flips it to find out what happens next.
 *
 * 2x2 so it reads as a set to compare rather than a list to read top to
 * bottom. Deliberately four, not three.
 *
 * No CTA under the grid. "More than one of these sound familiar? Score your
 * operations in two minutes" was cut 2026-08-19 — it re-asked the section
 * heading ("Which sounds familiar?") a few inches below it, and the centered
 * assessment band directly after this makes the ask a third time. The band is
 * the only centered section on the page so it can carry that on its own.
 */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-sm border border-hairline bg-hairline sm:grid-cols-2">
      {services.map((service, i) => (
        <FadeUp
          key={service.title}
          delay={i * 70}
          className="flex min-h-[16rem]"
        >
          <ServiceCard service={service} />
        </FadeUp>
      ))}
    </div>
  );
}
