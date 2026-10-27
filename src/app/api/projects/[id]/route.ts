import { sql } from "@/lib/db";
import { projectIdPattern, readProjectForm } from "@/lib/projects";

// The admin page edits a project here. An empty picture keeps the current one.
export async function PATCH(request: Request, { params }: RouteContext<"/api/projects/[id]">) {
  const { id } = await params;
  if (!projectIdPattern.test(id)) return Response.json({ error: "No project with that id." }, { status: 404 });
  const input = await readProjectForm(request);
  if (typeof input === "string") return Response.json({ error: input }, { status: 400 });

  const rows = await sql`
    update projects set
      title = ${input.title}, what_it_does = ${input.whatItDoes}, what_i_did = ${input.whatIDid},
      link = ${input.link},
      picture = coalesce(decode(${input.picture?.base64 ?? null}, 'base64'), picture),
      picture_type = coalesce(${input.picture?.type ?? null}, picture_type)
    where id = ${id}
    returning id, title`;
  if (rows.length === 0) return Response.json({ error: "No project with that id." }, { status: 404 });
  return Response.json(rows[0]);
}

// The admin page deletes a project here.
export async function DELETE(_request: Request, { params }: RouteContext<"/api/projects/[id]">) {
  const { id } = await params;
  if (!projectIdPattern.test(id)) return Response.json({ error: "No project with that id." }, { status: 404 });
  const rows = await sql`delete from projects where id = ${id} returning id`;
  if (rows.length === 0) return Response.json({ error: "No project with that id." }, { status: 404 });
  return new Response(null, { status: 204 });
}
