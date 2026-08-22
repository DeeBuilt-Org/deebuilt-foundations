import type { Project } from "@/content/projects";

/**
 * Status chip. Live reads accent-forward (active, sign-up included). Demo
 * reads in a soft accent tint: viewable, secondary to Live.
 *
 * "Personal project" was a third case here until 2026-08-22, when the status
 * itself was dropped (see projects.ts).
 */
function StatusChip({ status }: { status: Project["status"] }) {
  const secondary = status === "Demo";
  const tone = secondary
    ? "border-accent-soft bg-accent-tint text-accent"
    : "border-accent-soft text-accent";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[0.6875rem] font-medium ${tone}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {status}
    </span>
  );
}

/**
 * A single project as a text row: index, title, one line, status, stack.
 * Linked only when the project has a live href; archived rows are static.
 */
export function ProjectRow({ project }: { project: Project }) {
  const live = Boolean(project.href);

  const inner = (
    <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-8 md:py-10">
      <div className="flex items-baseline gap-4 md:col-span-5">
        <span className="font-serif text-sm font-medium tracking-[0.16em] text-accent">
          {project.index}
        </span>
        <div>
          <h3 className="font-serif text-2xl leading-tight md:text-[1.75rem]">
            {project.title}
            {live && (
              <span className="ml-2 inline-block text-accent transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            )}
          </h3>
          <div className="mt-2.5">
            <StatusChip status={project.status} />
          </div>
        </div>
      </div>

      <div className="md:col-span-7">
        <p className="max-w-xl text-base leading-relaxed text-muted">
          {project.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-hairline px-2.5 py-0.5 text-[0.6875rem] font-medium text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  if (live) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="group block px-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-[0_12px_32px_-16px_rgba(var(--shadow-ink),0.25)] md:px-6"
      >
        {inner}
      </a>
    );
  }

  return <div>{inner}</div>;
}
