import { useEffect, useRef, useState } from "react";
import { OPSETTE_EMBED_BASE, OPSETTE_ORIGIN } from "@/content/projects";

/**
 * Added 2026-10-21. Every Opsette form shown on this site goes through this
 * component, so no page hand-writes an iframe. The snippet from Opsette's
 * embed screen is HTML and can't be pasted into a .tsx file as-is, which is
 * why earlier embed attempts never rendered.
 *
 * Height: starts at minHeight. Once Opsette's embed page posts
 * `opsette-form-resize` messages (docs/EMBEDDED_FORMS_AND_RESOURCES_PLAN.md,
 * Part 2), the iframe follows the form's real height. Until then it just
 * stays at minHeight, so this works against the current embed too.
 *
 * Messages are only trusted when they come from opsette.io AND from this
 * iframe's own window, so two forms on one page never resize each other.
 */

type OpsetteMessage =
  | { type: "opsette-form-resize"; height: number }
  | { type: "opsette-form-submit" };

function readMessage(data: unknown): OpsetteMessage | null {
  if (typeof data !== "object" || data === null || !("type" in data)) return null;
  if (data.type === "opsette-form-submit") return { type: "opsette-form-submit" };
  if (
    data.type === "opsette-form-resize" &&
    "height" in data &&
    typeof data.height === "number" &&
    data.height > 0
  ) {
    return { type: "opsette-form-resize", height: data.height };
  }
  return null;
}

export function OpsetteFormEmbed({
  form,
  source,
  title,
  minHeight = 600,
  hideHeader = false,
  transparent = false,
  className = "",
}: {
  /** Opsette form slug, e.g. "get-in-touch" */
  form: string;
  /** Opsette link source token (the ?s= value) for this placement */
  source?: string;
  /** Accessible name for the iframe */
  title: string;
  minHeight?: number;
  hideHeader?: boolean;
  transparent?: boolean;
  className?: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(minHeight);

  // Branding is always hidden on our own site.
  const params = new URLSearchParams({ hideBranding: "true" });
  if (hideHeader) params.set("hideHeader", "true");
  if (transparent) params.set("transparent", "true");
  if (source) params.set("s", source);
  const src = `${OPSETTE_EMBED_BASE}/${form}?${params.toString()}`;

  useEffect(() => {
    function onMessage(event: MessageEvent) {
      if (event.origin !== OPSETTE_ORIGIN) return;
      if (event.source !== iframeRef.current?.contentWindow) return;
      const msg = readMessage(event.data);
      if (!msg) return;

      if (msg.type === "opsette-form-resize") {
        setHeight(Math.ceil(msg.height));
      } else {
        // The thank-you screen is far shorter than the form. Without this, a
        // visitor on a phone is left looking at the empty space below it.
        iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }

    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={src}
      title={title}
      loading="lazy"
      height={height}
      className={`block w-full scroll-mt-28 border-0 ${className}`}
    />
  );
}
