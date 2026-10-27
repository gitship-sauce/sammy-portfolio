import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProjects } from "@/lib/projects";

export default function ProjectPage({ params }: PageProps<"/projects/[id]">) {
  return (
    <main className="mx-auto max-w-6xl px-6 pt-12">
      <Link href="/#projects" className="text-sm font-medium text-muted hover:text-ink">
        ← All projects
      </Link>
      <Suspense fallback={<p className="mt-10 text-muted">Loading…</p>}>
        <ProjectDetails params={params} />
      </Suspense>
    </main>
  );
}

async function ProjectDetails({ params }: { params: PageProps<"/projects/[id]">["params"] }) {
  const { id } = await params;
  const projects = await getProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index === -1) notFound();
  const project = projects[index];
  const next = projects.length > 1 ? projects[(index + 1) % projects.length] : null;

  return (
    <>
      <p className="mt-10 font-mono text-sm text-muted">
        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
      </p>
      <h1 className="mt-3 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">{project.title}</h1>

      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="overflow-hidden rounded-[2rem] bg-white ring-1 ring-line md:col-span-8">
          {project.picture ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={project.picture} alt={`Screenshot of ${project.title}`} className="aspect-[8/5] w-full object-cover" />
          ) : (
            <div className="aspect-[8/5] w-full bg-line" />
          )}
        </div>
        <aside className="flex flex-col gap-8 md:col-span-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">What it does</p>
            <p className="mt-2 text-lg leading-relaxed">{project.whatItDoes}</p>
          </div>
          <div className="rounded-3xl bg-lime p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">My part</p>
            <p className="mt-2 text-lg font-medium leading-relaxed">{project.whatIDid}</p>
          </div>
          {project.link && (
            <a href={project.link} className="button self-start">
              See it live ↗
            </a>
          )}
        </aside>
      </div>

      {next && (
        <Link
          href={`/projects/${next.id}`}
          className="group mt-24 flex items-center justify-between border-t border-line pt-8"
        >
          <span>
            <span className="text-sm text-muted">Next project</span>
            <span className="mt-1 block text-3xl font-semibold tracking-tight">{next.title}</span>
          </span>
          <span className="text-3xl transition group-hover:translate-x-2">→</span>
        </Link>
      )}
    </>
  );
}
