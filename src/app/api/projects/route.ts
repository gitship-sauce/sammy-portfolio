import { sql } from "@/lib/db";
import { readProjectForm } from "@/lib/projects";

// The admin form sends new projects here.
export async function POST(request: Request) {
  const input = await readProjectForm(request);
  if (typeof input === "string") return Response.json({ error: input }, { status: 400 });

  const rows = await sql`
    insert into projects (title, what_it_does, what_i_did, link, picture, picture_type)
    values (${input.title}, ${input.whatItDoes}, ${input.whatIDid}, ${input.link},
            decode(${input.picture?.base64 ?? null}, 'base64'), ${input.picture?.type ?? null})
    returning id, title`;
  return Response.json(rows[0], { status: 201 });
}
