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
      <div
        className={`relative flex items-end overflow-hidden border border-hairline bg-[#efeae1] p-6 transition-colors duration-500 group-hover:bg-[#e8e2d5] ${
          wide ? "aspect-[16/10]" : "aspect-[4/3]"
        }`}
      >
        <span className="absolute right-6 top-6 text-xs uppercase tracking-[0.18em] text-muted">
          {project.index}
        </span>
        <span className="font-serif text-3xl leading-none text-foreground/80 md:text-4xl">
          {project.title}
        </span>
      </div>
      <div className="mt-5">
        <h3 className="font-serif text-2xl leading-tight">{project.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
          {project.description}
        </p>
        <span className="mt-3 inline-block text-xs uppercase tracking-[0.18em] text-accent transition-colors group-hover:text-foreground">
          Visit ↗
        </span>
      </div>
    </a>
  );
}
