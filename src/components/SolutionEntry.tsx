import type { Solution } from "@/content/solutions";

/**
 * One solution, stacked: title on top, then the story, then the reference.
 *
 * Replaced a ProjectRow-style row on 2026-10-16, hers: the left column with an
 * index number beside the title read as AI template. No numbers, no side
 * label column, no box. Entries sit two-up on the page like columns of type,
 * separated by a hairline rule above each one.
 *
 * Results carries a slate rule on its left edge so the "after" reads as the
 * payoff of the "before" without a contrast heading or an arrow.
 */
export function SolutionEntry({ solution }: { solution: Solution }) {
  return (
    <article id={solution.id} className="scroll-mt-28 border-t border-foreground/80 pt-7">
      <h2 className="font-serif text-3xl leading-[1.05] md:text-[2.5rem]">
        {solution.title}
      </h2>

      <p className="eyebrow-muted mt-7">Starting point</p>
      <p className="mt-2.5 text-base leading-relaxed text-muted">
        {solution.startingPoint}
      </p>

      <div className="mt-7 border-l-2 border-accent pl-5">
        <p className="eyebrow">Results</p>
        <p className="mt-2.5 text-base leading-relaxed text-foreground">
          {solution.results}
        </p>
      </div>

      <dl className="mt-7 space-y-2.5 text-sm">
        <div className="flex gap-4">
          <dt className="eyebrow-muted w-[4.5rem] shrink-0 pt-px">Scope</dt>
          <dd className="text-foreground/75">{solution.scope}</dd>
        </div>
        <div className="flex gap-4">
          <dt className="eyebrow-muted w-[4.5rem] shrink-0 pt-px">Systems</dt>
          <dd className="text-foreground/75">{solution.systems}</dd>
        </div>
      </dl>
    </article>
  );
}
