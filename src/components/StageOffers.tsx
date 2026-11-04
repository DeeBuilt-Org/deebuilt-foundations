import type { MouseEventHandler } from "react";
import { IncludesList } from "@/components/IncludesList";
import { NotIncluded } from "@/components/NotIncluded";
import { ProblemLinks } from "@/components/ProblemLinks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BOOKING_URL } from "@/content/projects";
import { servicesPage, stageOffers } from "@/content/services";

/**
 * The page's focal point: Launch, Scale, and Reorganize as one selector.
 *
 * Tabs rather than three cards side by side, which is the banned three-up
 * grid. The three are parallel, so they stay the same size and tone. Every
 * price stays visible on its tab, and the visitor picks the stage that fits to
 * see what it includes.
 *
 * forceMount keeps all three panels in the prerendered HTML, so what the hidden
 * panels include can still be found by search engines.
 */
export function StageOffers({ onBook }: { onBook: MouseEventHandler<HTMLAnchorElement> }) {
  return (
    <Tabs defaultValue={stageOffers[0].id}>
      <TabsList className="grid h-auto grid-cols-3 items-stretch gap-1.5 rounded-none bg-transparent p-0 md:gap-2">
        {stageOffers.map((stage) => (
          <TabsTrigger
            key={stage.id}
            value={stage.id}
            className="flex-col items-start gap-1 whitespace-normal rounded-b-none rounded-t-lg bg-accent-tint px-3 py-4 text-left text-foreground data-[state=active]:bg-ink-wash data-[state=active]:text-white data-[state=active]:shadow-none md:px-7 md:py-6"
          >
            <span className="font-serif text-xl leading-tight md:text-3xl">{stage.label}</span>
            <span className="text-xs font-normal opacity-75 md:text-sm">
              Starting at {stage.price}
            </span>
          </TabsTrigger>
        ))}
      </TabsList>

      {stageOffers.map((stage) => (
        <TabsContent
          key={stage.id}
          value={stage.id}
          forceMount
          className="mt-0 rounded-b-lg bg-ink-wash p-7 text-white data-[state=inactive]:hidden md:p-12"
        >
          <h3 className="display-lg">{stage.name}</h3>
          <p className="mt-3 text-lg text-saffron md:text-xl">Starting at {stage.price}</p>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {stage.forWho}
          </p>
          <IncludesList items={stage.includes} columns dark />
          {stage.problems.length > 0 && (
            <div className="mt-8 rounded-md bg-white/[0.06] p-5">
              <ProblemLinks
                heading={servicesPage.problemsHeading}
                ids={stage.problems}
                className="text-white/85"
              />
            </div>
          )}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              onClick={onBook}
              className="btn-invert"
            >
              {stage.cta}
            </a>
            <NotIncluded
              name={stage.name}
              items={stage.notIncluded}
              note={stage.notIncludedNote}
              className="text-white/80 hover:text-white"
            />
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
