import type { DownloadResource } from "@/content/resources";

/**
 * A downloadable file drawn as a sheet of paper: portrait from sm up, white,
 * lifted off the band it sits on. Added 2026-10-21. Downloads get a different
 * shape from the tool cards on purpose, so the two read as different things
 * before anyone reads a word.
 *
 * File type sits large at the top like a document's masthead; title, one
 * line, and length sit at the foot. Plain text, no chips. The whole sheet is
 * the link once it has a file.
 */
export function DownloadSheet({
  file,
  className = "",
}: {
  file: DownloadResource;
  className?: string;
}) {
  const inner = (
    <>
      <p className="font-serif text-5xl leading-none text-accent/30">{file.fileType}</p>

      <div>
        <h3 className="font-serif text-2xl leading-tight">{file.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{file.description}</p>
        <div className="mt-5 flex items-center justify-between gap-4 border-t border-hairline pt-4 text-sm">
          <span className="text-muted">{file.length}</span>
          {file.href ? (
            <span className="font-medium text-accent group-hover:underline">Download ↓</span>
          ) : (
            <span className="text-muted">Coming soon</span>
          )}
        </div>
      </div>
    </>
  );

  // The 3:4 paper shape is a MINIMUM: with no fixed height, aspect-ratio
  // lets the sheet grow when its text runs long. (It was h-full, which locked
  // the height, and a long description pushed "Download" off the bottom of
  // the white sheet onto the dark band, 2026-10-21.)
  const base = `flex flex-col justify-between gap-10 rounded-sm bg-surface p-6 text-foreground shadow-[0_18px_40px_-24px_rgba(var(--shadow-ink),0.35)] sm:aspect-[3/4] md:p-7 ${className}`;

  if (!file.href) return <article className={base}>{inner}</article>;

  return (
    <a href={file.href} download className={`group ${base} transition-transform duration-300 hover:-translate-y-1`}>
      {inner}
    </a>
  );
}
