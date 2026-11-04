import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoPages, sprintDemo, toEmbedUrl } from "@/content/sprintDemo";

/**
 * Tabs over one Airtable embed, shown in the "demo" pop-up (EmbedPopup). Radix
 * mounts only the active panel, so only the selected page's iframe loads; the
 * other four load when picked. The frame fills the pop-up's height.
 *
 * Underline tabs rather than the stage selector's folder tabs. On a phone the
 * tab row scrolls sideways instead of wrapping.
 */
export function SprintDemo({ onLoad }: { onLoad: () => void }) {
  return (
    <div className="flex h-full flex-col px-5 pb-4 pt-4 md:px-8">
      <Tabs defaultValue={demoPages[0].id} className="flex min-h-0 flex-1 flex-col">
        <TabsList
          aria-label="Demo pages"
          className="flex h-auto w-full shrink-0 justify-start gap-6 overflow-x-auto rounded-none border-b border-hairline bg-transparent p-0 text-foreground [scrollbar-width:none] md:gap-8"
        >
          {demoPages.map((page) => (
            <TabsTrigger
              key={page.id}
              value={page.id}
              className="-mb-px shrink-0 rounded-none border-b-2 border-transparent px-0 pb-3 pt-1 text-[0.9375rem] text-foreground/60 hover:text-foreground data-[state=active]:border-accent data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none"
            >
              {page.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {demoPages.map((page) => (
          <TabsContent key={page.id} value={page.id} className="mt-4 min-h-0 flex-1">
            <iframe
              src={toEmbedUrl(page.shareUrl)}
              title={`Demo: ${page.label}`}
              onLoad={onLoad}
              className="block h-full w-full rounded-lg border border-hairline bg-surface"
            />
          </TabsContent>
        ))}
      </Tabs>
      <p className="mt-3 shrink-0 text-sm text-foreground/70">{sprintDemo.caption}</p>
    </div>
  );
}
