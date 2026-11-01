import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/**
 * A small link that opens what a service leaves out. In a pop-up so the cards
 * stay the same size (hers, 2026-11-01). The tone comes from the caller, since
 * the link sits on both light cards and the dark stage panel.
 */
export function NotIncluded({
  name,
  items,
  intro,
  note,
  className,
}: {
  name: string;
  items: string[];
  intro?: string;
  note?: string;
  className: string;
}) {
  return (
    <Dialog>
      <DialogTrigger
        className={`cursor-pointer text-sm underline underline-offset-4 ${className}`}
      >
        What's not included
      </DialogTrigger>
      <DialogContent className="w-[calc(100%-2.5rem)] rounded-lg bg-surface p-7 md:p-8">
        <DialogTitle className="pr-6 font-serif text-3xl font-normal leading-tight">
          {name}
        </DialogTitle>
        {intro && <p className="text-base leading-relaxed text-foreground/75">{intro}</p>}
        <div>
          <p className="text-sm font-semibold text-foreground">Not included</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.9375rem] leading-relaxed">
            {items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        {note && <p className="text-sm leading-relaxed text-foreground/70">{note}</p>}
      </DialogContent>
    </Dialog>
  );
}
