import Link from "next/link";
import type { Project } from "@/lib/projects";

// One project on the home page: a big picture, and what Sammy did on it. Every other row flips sides.
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  return (
    <Link href={`/projects/${project.id}`} className="group grid items-center gap-8 md:grid-cols-12 md:gap-12">
      <div
        className={`overflow-hidden rounded-[2rem] bg-white ring-1 ring-line md:col-span-7 ${flipped ? "md:order-last" : ""}`}
      >
        {project.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.picture}
            alt={`Screenshot of ${project.title}`}
            className="aspect-[8/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="aspect-[8/5] w-full bg-line" />
        )}
      </div>
      <div className="md:col-span-5">
        <p className="font-mono text-sm text-muted">{String(index + 1).padStart(2, "0")}</p>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{project.title}</h3>
        <p className="mt-4 text-lg leading-relaxed text-muted">{project.whatItDoes}</p>
        <div className="mt-6 border-t border-line pt-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">My part</p>
          <p className="mt-2 text-lg">{project.whatIDid}</p>
        </div>
        <p className="mt-6 inline-flex items-center gap-2 font-medium">
          View project <span className="transition group-hover:translate-x-1">→</span>
        </p>
      </div>
    </Link>
  );
}
