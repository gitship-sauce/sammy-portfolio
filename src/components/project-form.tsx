"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Project } from "@/lib/projects";

// Used to add a project (no `project`) and to edit one.
export function ProjectForm({ project }: { project?: Project }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function save(formData: FormData) {
    setBusy(true);
    setError("");
    // The picture travels in the same form as the text.
    const response = await fetch(project ? `/api/projects/${project.id}` : "/api/projects", {
      method: project ? "PATCH" : "POST",
      body: formData,
    });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? `Saving failed (${response.status}).`);
      setBusy(false);
      return;
    }
    setBusy(false);
    router.push("/admin");
    router.refresh();
  }

  return (
    <form action={save} className="flex flex-col gap-5">
      <label className="label">
        Title
        <input name="title" required maxLength={80} defaultValue={project?.title} className="field" />
      </label>
      <label className="label">
        What it does
        <textarea name="what_it_does" required maxLength={300} defaultValue={project?.whatItDoes} className="field" />
      </label>
      <label className="label">
        What I did
        <textarea name="what_i_did" required maxLength={300} defaultValue={project?.whatIDid} className="field" />
      </label>
      <label className="label">
        <span>
          Live link <span className="font-normal text-muted">optional</span>
        </span>
        <input name="link" type="url" defaultValue={project?.link ?? ""} className="field" />
      </label>
      <label className="label">
        <span>
          Picture{" "}
          <span className="font-normal text-muted">
            PNG or JPEG, up to 1 MB{project?.picture && ". Leave empty to keep this one"}
          </span>
        </span>
        <input name="picture" type="file" accept="image/png,image/jpeg,image/webp" className="field" />
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={busy} className="button mt-2 self-start">
        {busy ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
