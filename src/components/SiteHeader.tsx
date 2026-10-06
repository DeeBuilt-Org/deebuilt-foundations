import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BOOKING_URL } from "@/content/projects";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const isHome = pathname === "/";

  /**
   * On the home page the header carries its OWN slate background matching the
   * hero, so the top of the page reads as one block of color.
   *
   * It is not transparent: the hero's right half is a bright photo, so white
   * nav links laid over it disappeared into the window behind her. A solid
   * bar keeps every link legible regardless of what sits underneath.
   */
  const onDark = isHome && !scrolled && !open;

  /**
   * Stay dark for as long as the hero is behind the header, then swap. Keyed
   * to the hero's actual height rather than a fixed pixel threshold, so the
   * bar doesn't flip to light while the slate is still on screen.
   */
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      const hero = document.querySelector("[data-hero]");
      const limit = hero
        ? hero.getBoundingClientRect().height - 72
        : 24;
      setScrolled(window.scrollY > limit);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isHome]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-300 ${
        onDark
          ? "border-b border-transparent bg-ink-wash text-white"
          : "border-b border-hairline bg-background/95 text-foreground backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <Link to="/" className="group flex items-center gap-2.5">
          <img
            src="/DeeBuilt logo_A14 (1).png"
            alt="DeeBuilt"
            className={`h-7 w-7 object-contain md:h-8 md:w-8 ${
              onDark ? "brightness-0 invert" : ""
            }`}
          />
          <span className="font-serif text-xl tracking-tight md:text-2xl">
            DeeBuilt
          </span>
        </Link>

        <nav className="hidden gap-8 md:flex">
          {nav.map((item) => {
            const isActive =
              item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`text-sm transition-colors ${
                  onDark
                    ? isActive
                      ? "text-white"
                      : "text-white/70 hover:text-white"
                    : isActive
                      ? "font-medium text-foreground"
                      : "text-foreground/65 hover:text-foreground"
                }`}
              >
                <span
                  className={`border-b pb-1 ${
                    isActive
                      ? onDark
                        ? "border-white"
                        : "border-accent"
                      : "border-transparent"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span
            className={`block h-px w-6 transition-transform ${
              onDark ? "bg-white" : "bg-foreground"
            } ${
              open ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 transition-transform ${
              onDark ? "bg-white" : "bg-foreground"
            } ${
              open ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {open && (
        /* absolute, not fixed: the header's backdrop-blur makes it the
           containing block for fixed children, which collapsed this panel to
           zero height and left the links floating over the page. The explicit
           height is the viewport minus the header (100% = header height). */
        <div className="absolute inset-x-0 top-full z-30 flex h-[calc(100dvh-100%)] flex-col bg-background md:hidden">
          <nav className="flex flex-col gap-2 px-6 py-10">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="font-serif text-4xl leading-tight text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto border-t border-hairline px-6 py-8">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
              className="btn-primary w-full justify-center"
            >
              Book a discovery call
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
