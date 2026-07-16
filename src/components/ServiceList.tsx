import { FadeUp } from "@/components/FadeUp";
import type { Service } from "@/content/projects";

/**
 * Services rendered as a clean, numbered list. Each row uses the accent
 * index number as its one deliberate spot of color.
 */
export function ServiceList({ services }: { services: Service[] }) {
  return (
    <div className="border-t border-hairline">
      {services.map((service, i) => (
        <FadeUp
          key={service.title}
          delay={i * 60}
          className="border-b border-hairline"
        >
          <div className="grid gap-3 py-8 md:grid-cols-12 md:gap-8 md:py-10">
            <div className="flex items-baseline gap-4 md:col-span-5">
              <span className="font-serif text-sm font-medium tracking-[0.16em] text-accent">
                {service.index}
              </span>
              <h3 className="font-serif text-2xl leading-tight md:text-[1.75rem]">
                {service.title}
              </h3>
            </div>
            <p className="max-w-xl text-base leading-relaxed text-muted md:col-span-7">
              {service.description}
            </p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
