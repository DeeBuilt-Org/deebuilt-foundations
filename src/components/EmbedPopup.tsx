import {
  createContext,
  useCallback,
  useContext,
  useState,
  type MouseEvent,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import { OpsetteFormEmbed } from "@/components/OpsetteFormEmbed";
import { PdfViewer } from "@/components/resources/PdfViewer";
import { SprintDemo } from "@/components/SprintDemo";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ASSESSMENT_URL,
  BOOKING_EMBED_URL,
  BOOKING_URL,
  CONTACT_EMBED_SOURCE,
  CONTACT_FORM_SLUG,
  CONTACT_FORM_URL,
  PLATFORM_PICKER_URL,
} from "@/content/projects";
import { downloadPath, type DownloadResource } from "@/content/resources";
import { demoPages, sprintDemo } from "@/content/sprintDemo";

/**
 * The site's one pop-up. It lives in the root layout (PopupProvider in
 * __root.tsx), so any button on any page, the header and footer included, can
 * open it with usePopup(). Moved there 2026-11-23 so the Resources page and
 * the Book buttons in the header, footer, and About page keep visitors on the
 * site instead of opening a new tab. Before that, the home and Services pages
 * each kept their own copy.
 *
 * What it can show:
 * - a built-in pop-up by name (PopupKey)
 * - any page by address, e.g. a free tool on tools.deebuilt.co
 * - a PDF from the Resources page
 */
export type PopupKey = "assessment" | "booking" | "contact" | "picker" | "demo";

export type PopupTarget =
  | PopupKey
  | { kind: "page"; url: string; title: string }
  | { kind: "pdf"; file: DownloadResource };

const POPUPS: Record<PopupKey, { title: string; newTabUrl: string }> = {
  assessment: { title: "See how your operations stack up", newTabUrl: ASSESSMENT_URL },
  booking: { title: "Book a discovery call", newTabUrl: BOOKING_URL },
  contact: { title: "Get in touch", newTabUrl: CONTACT_FORM_URL },
  picker: { title: "Platform Picker", newTabUrl: PLATFORM_PICKER_URL },
  demo: { title: sprintDemo.link, newTabUrl: demoPages[0].shareUrl },
};

function describe(target: PopupTarget): { id: string; title: string; newTabUrl: string } {
  if (typeof target === "string") return { id: target, ...POPUPS[target] };
  if (target.kind === "page") return { id: target.url, title: target.title, newTabUrl: target.url };
  // A PDF's "new tab" is its page on this site, which has the share card.
  const path = downloadPath(target.file);
  return { id: path, title: target.file.title, newTabUrl: path };
}

/** Stays invisible until the embedded page has loaded, then fades in. */
function EmbedPopupBody({ target }: { target: PopupTarget }) {
  const [loaded, setLoaded] = useState(false);
  const showPage = useCallback(() => setLoaded(true), []);
  const { title } = describe(target);

  return (
    <div
      className={`min-h-0 flex-1 overflow-y-auto transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      {target === "assessment" && (
        <OpsetteFormEmbed
          form="see-how-your-operations-stack-up"
          source="anOQuuXEW_tM"
          title={title}
          onLoad={showPage}
        />
      )}
      {target === "booking" && <FramedPage url={BOOKING_EMBED_URL} title={title} onLoad={showPage} />}
      {target === "contact" && (
        <OpsetteFormEmbed
          form={CONTACT_FORM_SLUG}
          source={CONTACT_EMBED_SOURCE}
          title={title}
          onLoad={showPage}
        />
      )}
      {target === "picker" && <FramedPage url={PLATFORM_PICKER_URL} title={title} onLoad={showPage} />}
      {target === "demo" && <SprintDemo onLoad={showPage} />}
      {typeof target !== "string" && target.kind === "page" && (
        <FramedPage url={target.url} title={title} onLoad={showPage} />
      )}
      {typeof target !== "string" && target.kind === "pdf" && (
        <PdfViewer file={target.file} onLoad={showPage} className="h-full" />
      )}
    </div>
  );
}

/**
 * Another site's page, filling the pop-up. clipboard-write lets the free
 * tools' copy buttons work from inside the frame (Signature Studio copies the
 * finished signature).
 */
function FramedPage({ url, title, onLoad }: { url: string; title: string; onLoad: () => void }) {
  return (
    <iframe
      src={url}
      title={title}
      onLoad={onLoad}
      allow="clipboard-write"
      className="block h-full w-full border-0"
    />
  );
}

/** Fills the screen on a phone. A wide box from `sm` up, since booking needs the width. */
function EmbedPopup({ target, onClose }: { target: PopupTarget | null; onClose: () => void }) {
  // `target` turns null the moment the visitor closes. The last value keeps
  // the content on screen so the closing animation can play.
  const [shown, setShown] = useState(target);
  if (target !== null && target !== shown) setShown(target);
  const info = shown ? describe(shown) : null;

  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && onClose()}>
      {shown && info && (
        <DialogContent
          aria-describedby={undefined}
          className="flex h-[100svh] max-w-none flex-col gap-0 overflow-hidden border-0 bg-surface p-0 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:h-[90svh] sm:w-[calc(100%-3rem)] sm:max-w-6xl [&>button]:right-2 [&>button]:top-2 [&>button]:p-2 [&>button>svg]:h-5 [&>button>svg]:w-5"
        >
          <DialogTitle className="sr-only">{info.title}</DialogTitle>
          <div className="flex h-12 shrink-0 items-center border-b border-hairline pl-5 pr-12">
            <a
              href={info.newTabUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4"
            >
              Open in a new tab ↗
            </a>
          </div>
          <EmbedPopupBody key={info.id} target={shown} />
        </DialogContent>
      )}
    </Dialog>
  );
}

type OpenPopup = (target: PopupTarget) => MouseEventHandler<HTMLAnchorElement>;

const PopupContext = createContext<OpenPopup | null>(null);

/** Wraps the whole site once, in __root.tsx, and renders the pop-up. */
export function PopupProvider({ children }: { children: ReactNode }) {
  const [target, setTarget] = useState<PopupTarget | null>(null);

  // Every trigger stays a real link, so ctrl-click still opens a new tab.
  const openPopup = useCallback<OpenPopup>(
    (next) => (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      setTarget(next);
    },
    [],
  );

  return (
    <PopupContext.Provider value={openPopup}>
      {children}
      <EmbedPopup target={target} onClose={() => setTarget(null)} />
    </PopupContext.Provider>
  );
}

/**
 * Returns a click handler factory for links: `onClick={openPopup("booking")}`.
 * The link keeps its real href for ctrl-click, crawlers, and no-JS visitors.
 */
export function usePopup(): OpenPopup {
  const openPopup = useContext(PopupContext);
  if (!openPopup) throw new Error("usePopup must be used inside PopupProvider");
  return openPopup;
}
