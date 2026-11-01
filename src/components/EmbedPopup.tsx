import { useState } from "react";
import { OpsetteFormEmbed } from "@/components/OpsetteFormEmbed";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  ASSESSMENT_URL,
  BOOKING_EMBED_URL,
  BOOKING_URL,
  PLATFORM_PICKER_URL,
} from "@/content/projects";

export type PopupKey = "assessment" | "booking" | "picker";

const POPUPS: Record<PopupKey, { title: string; newTabUrl: string }> = {
  assessment: { title: "See how your operations stack up", newTabUrl: ASSESSMENT_URL },
  booking: { title: "Book a discovery call", newTabUrl: BOOKING_URL },
  picker: { title: "Platform Picker", newTabUrl: PLATFORM_PICKER_URL },
};

/** Stays invisible until the embedded page has loaded, then fades in. */
function EmbedPopupBody({ popup }: { popup: PopupKey }) {
  const [loaded, setLoaded] = useState(false);
  const showPage = () => setLoaded(true);

  return (
    <div
      className={`min-h-0 flex-1 overflow-y-auto transition-opacity duration-500 motion-reduce:transition-none ${loaded ? "opacity-100" : "opacity-0"}`}
    >
      {popup === "assessment" && (
        <OpsetteFormEmbed
          form="see-how-your-operations-stack-up"
          source="anOQuuXEW_tM"
          title={POPUPS.assessment.title}
          onLoad={showPage}
        />
      )}
      {popup === "booking" && (
        <iframe
          src={BOOKING_EMBED_URL}
          title={POPUPS.booking.title}
          onLoad={showPage}
          className="block h-full w-full border-0"
        />
      )}
      {popup === "picker" && (
        <iframe
          src={PLATFORM_PICKER_URL}
          title={POPUPS.picker.title}
          onLoad={showPage}
          className="block h-full w-full border-0"
        />
      )}
    </div>
  );
}

/** Fills the screen on a phone. A wide box from `sm` up, since booking needs the width. */
export function EmbedPopup({ popup, onClose }: { popup: PopupKey | null; onClose: () => void }) {
  // `popup` turns null the moment the visitor closes. The last value keeps the
  // content on screen so the closing animation can play.
  const [shown, setShown] = useState(popup);
  if (popup !== null && popup !== shown) setShown(popup);

  return (
    <Dialog open={popup !== null} onOpenChange={(open) => !open && onClose()}>
      {shown && (
        <DialogContent
          aria-describedby={undefined}
          className="flex h-[100svh] max-w-none flex-col gap-0 overflow-hidden border-0 bg-surface p-0 max-sm:data-[state=closed]:slide-out-to-bottom max-sm:data-[state=open]:slide-in-from-bottom sm:h-[90svh] sm:w-[calc(100%-3rem)] sm:max-w-6xl [&>button]:right-2 [&>button]:top-2 [&>button]:p-2 [&>button>svg]:h-5 [&>button>svg]:w-5"
        >
          <DialogTitle className="sr-only">{POPUPS[shown].title}</DialogTitle>
          <div className="flex h-12 shrink-0 items-center border-b border-hairline pl-5 pr-12">
            <a
              href={POPUPS[shown].newTabUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-accent underline underline-offset-4"
            >
              Open in a new tab ↗
            </a>
          </div>
          <EmbedPopupBody key={shown} popup={shown} />
        </DialogContent>
      )}
    </Dialog>
  );
}
