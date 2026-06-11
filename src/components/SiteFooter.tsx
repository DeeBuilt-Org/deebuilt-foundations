import { YOUTUBE_URL } from "@/content/projects";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-2.5">
          <img
            src="/DeeBuilt logo_A14 (1).png"
            alt="DeeBuilt"
            className="h-6 w-6 object-contain"
          />
          <span className="font-serif text-xl">DeeBuilt</span>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted md:flex-row md:items-center md:gap-8">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-accent"
          >
            YouTube
          </a>
          <span>© {new Date().getFullYear()} DeeBuilt</span>
        </div>
      </div>
    </footer>
  );
}
