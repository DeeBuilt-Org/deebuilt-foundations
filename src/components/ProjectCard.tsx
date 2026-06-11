import { useState } from "react";
import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  // Fall back to the styled placeholder if no image is set or it fails to load
  const [imgOk, setImgOk] = useState(Boolean(project.image));

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div
        className={`relative overflow-hidden rounded-xl border border-hairline bg-surface transition-all duration-500 group-hover:border-accent-soft group-hover:shadow-[0_18px_40px_-24px_rgba(25,21,25,0.25)] ${
          wide ? "aspect-[16/9]" : "aspect-[4/3]"
        }`}
      >
        {imgOk && project.image ? (
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            onError={() => setImgOk(false)}
            className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <PlaceholderTile title={project.title} />
        )}

        {/* Stack chips */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap gap-1.5 p-4">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline bg-background/85 px-2.5 py-0.5 text-[0.6875rem] font-medium text-muted backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline gap-3">
          <span className="text-xs font-semibold tracking-[0.16em] text-accent">
            {project.index}
          </span>
          <h3 className="font-serif text-2xl leading-tight">{project.title}</h3>
        </div>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent transition-transform group-hover:translate-x-0.5">
          Visit ↗
        </span>
      </div>
    </a>
  );
}

/** Soft rose-tinted placeholder shown until a real screenshot is set. */
function PlaceholderTile({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-accent-tint">
      <span className="font-serif text-3xl text-foreground/35 md:text-4xl">
        {title}
      </span>
    </div>
  );
}
