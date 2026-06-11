import type { Project } from "@/content/projects";

export function ProjectCard({
  project,
  wide = false,
}: {
  project: Project;
  wide?: boolean;
}) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noreferrer"
      className="group block"
    >
      <div className="overflow-hidden border border-hairline bg-[var(--hairline)]">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.02] ${
            wide ? "aspect-[16/10]" : "aspect-[4/3]"
          }`}
        />
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <span className="mt-3 inline-block text-xs uppercase tracking-[0.18em] text-accent transition-colors group-hover:text-foreground">
          Visit →
        </span>
      </div>
    </a>
  );
}
