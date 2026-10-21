import { createFileRoute } from "@tanstack/react-router";
import { FadeUp } from "@/components/FadeUp";
import { DownloadSheet } from "@/components/resources/DownloadSheet";
import { ToolCard, type ToolCardTone } from "@/components/resources/ToolCard";
import {
  resources,
  resourcesPage,
  stages,
  type DownloadResource,
  type Stage,
  type ToolResource,
} from "@/content/resources";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Free Resources — DeeBuilt" },
      { name: "description", content: resourcesPage.subtitle },
      { property: "og:title", content: "Free Resources — DeeBuilt" },
      { property: "og:description", content: resourcesPage.subtitle },
      { property: "og:url", content: "/resources" },
    ],
    links: [{ rel: "canonical", href: "/resources" }],
  }),
  component: Resources,
});

/**
 * Each stage gets its own band so the three sections look different at a
 * glance, and tones that read on that band. Featured tone applies to the
 * stage's featured tool; `tones` rotate through the rest.
 */
const bands: Record<
  Stage,
  { section: string; description: string; featured: ToolCardTone; tones: ToolCardTone[] }
> = {
  launching: {
    section: "",
    description: "text-muted",
    featured: "featured",
    tones: ["tint", "surface", "outline"],
  },
  scaling: {
    section: "bg-accent-tint",
    description: "text-muted",
    // White, not dark: Decision Lab's screenshot is itself a dark card, and
    // dark on dark turns muddy.
    featured: "featuredLight",
    tones: ["surface", "outline"],
  },
  reorganizing: {
    section: "bg-ink-wash text-white",
    description: "text-white/70",
    featured: "featuredLight",
    tones: ["outlineInverse"],
  },
};

/**
 * Grid placement on a 6-column grid (md up; one column on a phone). No card
 * spans two rows: a row-spanning card gets stretched by its neighbors, which
 * left a dead gap above the planner's screenshot (2026-10-21).
 *
 * - Featured WITH an image: full width, text and screenshot side by side.
 *   The rest follow as an uneven pair (narrow + wide, the wide one split),
 *   or half width each, with an odd last card going full width.
 * - Featured WITHOUT an image: 4 columns, the next card beside it in 2, the
 *   rest half width.
 * - No featured card: half width each, odd last card full width.
 */
function placement(
  index: number,
  count: number,
  featured: ToolResource | undefined,
): { className: string; split: boolean } {
  const half = (i: number, n: number) =>
    n % 2 === 1 && i === n - 1
      ? { className: "md:col-span-6", split: true }
      : { className: "md:col-span-3", split: false };

  if (featured?.image) {
    if (index === 0) return { className: "md:col-span-6", split: true };
    const rest = count - 1;
    if (rest === 2) {
      return index === 1
        ? { className: "md:col-span-2", split: false }
        : { className: "md:col-span-4", split: true };
    }
    return half(index - 1, rest);
  }

  if (featured) {
    // Alone in its stage, it takes the full row rather than leave a gap.
    if (count === 1) return { className: "md:col-span-6", split: false };
    if (index === 0) return { className: "min-h-[22rem] md:col-span-4", split: false };
    if (index === 1) return { className: "md:col-span-2", split: false };
    return half(index - 2, count - 2);
  }

  return half(index, count);
}

/**
 * Added 2026-10-21, reorganized the same day by stage (hers): Launching /
 * Scaling / Reorganizing, the home page's three words, so a visitor lands
 * where they qualify. The opener's jump links are the qualifier.
 *
 * Earlier version, rejected: full-width rows with eyebrows and chips, the
 * default AI layout. No eyebrows or chips anywhere on this page.
 */
function Resources() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-16 pb-16 md:px-10 md:pt-28 md:pb-24">
        <FadeUp>
          <h1 className="display-xl max-w-4xl">{resourcesPage.title}</h1>
        </FadeUp>
        <FadeUp delay={80}>
          <p className="lede mt-6 max-w-2xl text-muted">{resourcesPage.subtitle}</p>
        </FadeUp>
        <FadeUp delay={160}>
          <div className="mt-14 border-t border-hairline pt-8 md:mt-20">
            <p className="text-base text-muted">{resourcesPage.jumpPrompt}</p>
            <nav className="mt-4 flex flex-wrap gap-x-10 gap-y-3">
              {stages.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="group font-serif text-4xl leading-tight text-foreground transition-colors hover:text-accent md:text-5xl"
                >
                  {s.name.replace(".", "")}
                  <span className="ml-2 inline-block text-2xl text-accent/50 transition-transform group-hover:translate-y-1 md:text-3xl">
                    ↓
                  </span>
                </a>
              ))}
            </nav>
          </div>
        </FadeUp>
      </section>

      {stages.map((s) => (
        <StageSection
          key={s.id}
          id={s.id}
          name={s.name}
          description={s.description}
          tools={resources.filter((r): r is ToolResource => r.kind === "tool" && r.stage === s.id)}
          downloads={resources.filter(
            (r): r is DownloadResource => r.kind === "download" && r.stage === s.id,
          )}
        />
      ))}
    </>
  );
}

function StageSection({
  id,
  name,
  description,
  tools,
  downloads,
}: {
  id: Stage;
  name: string;
  description: string;
  tools: ToolResource[];
  downloads: DownloadResource[];
}) {
  const band = bands[id];
  // Featured tool always leads its stage's grid.
  const ordered = [...tools].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
  const featured = ordered[0]?.featured ? ordered[0] : undefined;
  let rotation = 0;

  return (
    <section id={id} className={`scroll-mt-28 ${band.section}`}>
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-10 md:py-28">
        <FadeUp>
          <h2 className="display-lg">{name}</h2>
          <p className={`lede mt-4 max-w-xl ${band.description}`}>{description}</p>
        </FadeUp>

        {ordered.length > 0 && (
          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-6">
            {ordered.map((tool, i) => {
              const tone =
                featured && i === 0
                  ? band.featured
                  : band.tones[rotation++ % band.tones.length];
              const place = placement(i, ordered.length, featured);
              return (
                <FadeUp key={tool.title} delay={i * 60} className={place.className}>
                  <ToolCard tool={tool} tone={tone} split={place.split} />
                </FadeUp>
              );
            })}
          </div>
        )}

        {downloads.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:pb-12">
            <FadeUp className="sm:col-span-2 lg:col-span-1">
              <p className="font-serif text-2xl leading-tight md:text-3xl">Templates.</p>
            </FadeUp>
            {downloads.map((file, i) => (
              <FadeUp
                key={file.title}
                delay={i * 80}
                className={i % 2 === 0 ? "lg:translate-y-12" : ""}
              >
                <DownloadSheet file={file} />
              </FadeUp>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
