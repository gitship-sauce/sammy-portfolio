import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AdminBar } from "@/components/admin-buttons";
import { ProjectForm } from "@/components/project-form";
import { getProject } from "@/lib/projects";

export default function EditProjectPage({ params }: PageProps<"/admin/projects/[id]">) {
  return (
    <main className="min-h-screen">
      <AdminBar />
      <div className="mx-auto max-w-2xl px-6 py-12">
        <Link href="/admin" className="text-sm font-medium text-muted hover:text-ink">
          ← All projects
        </Link>
        <section className="mt-6 rounded-[2rem] bg-white p-8 ring-1 ring-line">
          <h1 className="text-2xl font-semibold tracking-tight">Edit project</h1>
          <div className="mt-8">
            <Suspense fallback={<p className="text-muted">Loading…</p>}>
              <EditForm params={params} />
            </Suspense>
          </div>
        </section>
      </div>
    </main>
  );
}

async function EditForm({ params }: { params: PageProps<"/admin/projects/[id]">["params"] }) {
  const { id } = await params;
  const project = await getProject(id);
  if (!project) notFound();
  return (
    <>
      {project.picture && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.picture} alt="" className="mb-6 aspect-[8/5] w-full rounded-2xl object-cover ring-1 ring-line" />
      )}
      <ProjectForm project={project} />
    </>
  );
}
