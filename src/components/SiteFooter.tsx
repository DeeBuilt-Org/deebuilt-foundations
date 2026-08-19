import { Link } from "@tanstack/react-router";
import {
  BOOKING_URL,
  CONTACT_FORM_URL,
  LINKEDIN_URL,
  YOUTUBE_URL,
  positioning,
} from "@/content/projects";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-hairline">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-16">
          {/* Brand + short line */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <img
                src="/DeeBuilt logo_A14 (1).png"
                alt="DeeBuilt"
                className="h-6 w-6 object-contain"
              />
              <span className="font-serif text-xl">DeeBuilt</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {positioning.role}. {positioning.lede}
            </p>
          </div>

          {/* Navigate */}
          <div className="md:col-span-3">
            <span className="eyebrow-muted">Pages</span>
            <nav className="mt-4 flex flex-col gap-2 text-sm">
              <Link to="/" className="text-muted transition-colors hover:text-accent">
                Home
              </Link>
              <Link
                to="/about"
                className="text-muted transition-colors hover:text-accent"
              >
                About
              </Link>
              <Link
                to="/portfolio"
                className="text-muted transition-colors hover:text-accent"
              >
                Portfolio
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="md:col-span-4">
            <span className="eyebrow-muted">Get in touch</span>
            <div className="mt-4 flex flex-col gap-2 text-sm">
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                Send a message ↗
              </a>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                Book a discovery call ↗
              </a>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                YouTube ↗
              </a>
              {/* Lowest-commitment path in this group: for the reader who
                  wants to look her over before contacting her at all. Plain
                  text, no mark — nothing else on the site uses brand icons
                  (her call, 2026-08-19), so one here would be the odd one. */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                className="text-muted transition-colors hover:text-accent"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-hairline pt-6 text-xs text-muted">
          <span>© {new Date().getFullYear()} DeeBuilt</span>
        </div>
      </div>
    </footer>
  );
}
