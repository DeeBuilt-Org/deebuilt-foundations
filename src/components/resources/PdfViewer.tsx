import { useEffect, useState } from "react";
import type { DownloadResource } from "@/content/resources";

/**
 * A PDF shown in the browser, on its own page (/resources/<slug>) and in the
 * pop-up. Added 2026-11-23.
 *
 * On a computer the browser's own PDF viewer shows the file inline, with its
 * own zoom, print, and save controls. Phones can't do that well: Chrome on
 * Android shows nothing inside a page (and may download the file instead),
 * and an iPhone shows only the first page with no way to scroll. So a phone,
 * or any browser that reports no PDF viewer, gets two buttons instead: open
 * the PDF full screen in the same tab, or save it.
 *
 * Which one to show is only known in the browser, so the first render (and
 * the prerendered HTML) is an empty panel of the same size. That keeps the
 * file from loading on a phone before the check runs.
 */
const PHONE_QUERY = "(max-width: 767px)";

function canShowInline(): boolean {
  return navigator.pdfViewerEnabled && !window.matchMedia(PHONE_QUERY).matches;
}

export function PdfViewer({
  file,
  className = "",
  heading = true,
  onLoad,
}: {
  file: DownloadResource;
  className?: string;
  /** Name the PDF above the phone buttons. Off on the PDF's own page, which already names it */
  heading?: boolean;
  onLoad?: () => void;
}) {
  const [inline, setInline] = useState<boolean | null>(null);

  useEffect(() => {
    const phone = window.matchMedia(PHONE_QUERY);
    const check = () => setInline(canShowInline());
    check();
    phone.addEventListener("change", check);
    return () => phone.removeEventListener("change", check);
  }, []);

  // The phone panel has nothing to wait for.
  useEffect(() => {
    if (inline === false) onLoad?.();
  }, [inline, onLoad]);

  if (!file.file) return null;

  if (inline === null) {
    return <div className={`min-h-[16rem] ${className}`} />;
  }

  if (inline) {
    return (
      <iframe
        // FitH: each page fills the frame's width.
        src={`${file.file}#view=FitH`}
        title={file.title}
        onLoad={onLoad}
        className={`block w-full border-0 ${className}`}
      />
    );
  }

  return (
    <div className={`flex flex-col justify-center gap-6 bg-accent-tint px-6 py-12 ${className}`}>
      {heading && (
        <div>
          <p className="font-serif text-2xl leading-tight">{file.title}</p>
          <p className="mt-2 text-sm text-muted">
            {file.fileType}, {file.length}
          </p>
        </div>
      )}
      <div className="flex flex-col gap-3">
        <a href={file.file} className="btn-primary justify-center">
          Open the PDF
        </a>
        <a href={file.file} download className="btn-outline justify-center">
          Save to your phone
        </a>
      </div>
    </div>
  );
}
