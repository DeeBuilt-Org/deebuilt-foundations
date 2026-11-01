import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SolutionEntry } from "@/components/SolutionEntry";
import { solutions } from "@/content/solutions";

/**
 * Problem titles that each open the full entry in a pop-up. Replaced a section
 * of all eight entries at the bottom of the Services page (hers, 2026-11-01):
 * it was a lot of words, and it sat apart from the services that fix them.
 * Entries keep their words; only where they appear changed.
 */
export function ProblemLinks({
  heading,
  ids,
  className,
}: {
  heading: string;
  ids: string[];
  className: string;
}) {
  const entries = ids.flatMap((id) => solutions.filter((s) => s.id === id));

  return (
    <div className={`text-sm ${className}`}>
      <p className="font-semibold">{heading}</p>
      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {entries.map((solution) => (
          <li key={solution.id}>
            <Dialog>
              <DialogTrigger className="cursor-pointer text-left underline underline-offset-4">
                {solution.title}
              </DialogTrigger>
              <DialogContent
                aria-describedby={undefined}
                className="max-h-[90svh] w-[calc(100%-2.5rem)] overflow-y-auto rounded-lg bg-surface p-7 md:p-8 [&>article]:border-t-0 [&>article]:pt-0 [&>article_h2]:pr-6"
              >
                <DialogTitle className="sr-only">{solution.title}</DialogTitle>
                <SolutionEntry solution={solution} />
              </DialogContent>
            </Dialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
