import Link from "next/link";
import { Suspense } from "react";
import { AdminBar, DeleteButton } from "@/components/admin-buttons";
import { ProjectForm } from "@/components/project-form";
import { getProjects } from "@/lib/projects";

export default function AdminPage() {
  return (
    <main className="min-h-screen">
      <AdminBar />
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-2">
        <section className="rounded-[2rem] bg-white p-8 ring-1 ring-line">
          <h1 className="text-2xl font-semibold tracking-tight">Add a project</h1>
          <p className="mt-1 text-sm text-muted">It shows on the home page straight away, newest first.</p>
          <div className="mt-8">
            <ProjectForm />
          </div>
        </section>
        <section>
          <Suspense fallback={<p className="text-muted">Loading…</p>}>
            <ProjectList />
          </Suspense>
        </section>
      </div>
    </main>
  );
}

async function ProjectList() {
  const projects = await getProjects();
  return (
    <>
      <h2 className="text-2xl font-semibold tracking-tight">
        Your projects <span className="font-mono text-base text-muted">({projects.length})</span>
      </h2>
      {projects.length === 0 ? (
        <p className="mt-6 text-muted">No projects yet. Add your first one.</p>
      ) : (
        <ul className="mt-6 flex flex-col gap-3">
          {projects.map((project) => (
            <li key={project.id} className="flex items-center gap-4 rounded-2xl bg-white p-3 ring-1 ring-line">
              {project.picture ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.picture} alt="" className="h-14 w-24 rounded-xl object-cover" />
              ) : (
                <div className="h-14 w-24 rounded-xl bg-line" />
              )}
              <span className="flex-1 font-medium">{project.title}</span>
              <Link
                href={`/admin/projects/${project.id}`}
                className="rounded-full px-3 py-1.5 text-sm font-medium hover:bg-paper"
              >
                Edit
              </Link>
              <DeleteButton id={project.id} title={project.title} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
