/**
 * What a service includes, as a labeled bullet list. Shared by the stage panel
 * and the offer cards so every service reads the same way (hers, 2026-11-04):
 * without the label and bullets, the list ran into the description.
 *
 * `dark` is for the stage panel's dark background.
 */
export function IncludesList({
  items,
  columns = false,
  dark = false,
}: {
  items: string[];
  columns?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="mt-7">
      <p className={`text-sm font-semibold ${dark ? "text-white" : "text-foreground"}`}>
        What's included
      </p>
      <ul
        className={`mt-3 grid list-disc gap-x-12 gap-y-2.5 pl-5 text-[0.9375rem] leading-relaxed ${
          dark ? "text-white/90 marker:text-saffron" : "text-foreground marker:text-accent"
        } ${columns ? "md:grid-cols-2" : ""}`}
      >
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
