import { sql } from "@/lib/db";

export type Project = {
  id: string;
  title: string;
  whatItDoes: string;
  whatIDid: string;
  link: string | null;
  // Where the browser loads the picture from, or null if there isn't one.
  picture: string | null;
};

type ProjectRow = {
  id: string;
  title: string;
  what_it_does: string;
  what_i_did: string;
  link: string | null;
  has_picture: boolean;
};

function fromRow(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    whatItDoes: row.what_it_does,
    whatIDid: row.what_i_did,
    link: row.link,
    picture: row.has_picture ? `/api/projects/${row.id}/picture` : null,
  };
}

// Newest first. The pictures themselves are loaded separately, one request each.
export async function getProjects(): Promise<Project[]> {
  const rows = await sql`
    select id, title, what_it_does, what_i_did, link, picture is not null as has_picture
    from projects order by created_at desc`;
  return (rows as ProjectRow[]).map(fromRow);
}

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function getProject(id: string): Promise<Project | null> {
  if (!uuid.test(id)) return null;
  const rows = await sql`
    select id, title, what_it_does, what_i_did, link, picture is not null as has_picture
    from projects where id = ${id}`;
  const row = (rows as ProjectRow[])[0];
  return row ? fromRow(row) : null;
}

export async function getPicture(id: string) {
  if (!uuid.test(id)) return null;
  const rows = await sql`
    select encode(picture, 'base64') as data, picture_type as type
    from projects where id = ${id} and picture is not null`;
  const row = rows[0] as { data: string; type: string } | undefined;
  return row ? { bytes: Buffer.from(row.data, "base64"), type: row.type } : null;
}

// What the admin form sends. Checked here, at the door, before anything is saved.
export type ProjectInput = {
  title: string;
  whatItDoes: string;
  whatIDid: string;
  link: string | null;
  picture: { base64: string; type: string } | null;
};

const MAX_PICTURE_BYTES = 1024 * 1024;
const PICTURE_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function readProjectForm(request: Request): Promise<ProjectInput | string> {
  const form = await request.formData().catch(() => null);
  if (!form) return "Send the project as a form.";

  const text = (name: string, max: number) => {
    const value = form.get(name);
    return typeof value === "string" && value.trim().length > 0 && value.length <= max ? value.trim() : null;
  };
  const title = text("title", 80);
  const whatItDoes = text("what_it_does", 300);
  const whatIDid = text("what_i_did", 300);
  if (!title) return "Title is required (up to 80 characters).";
  if (!whatItDoes) return '"What it does" is required (up to 300 characters).';
  if (!whatIDid) return '"What I did" is required (up to 300 characters).';

  const link = text("link", 300);
  if (link && !/^https?:\/\//.test(link)) return "Link must start with http:// or https://";

  let picture: ProjectInput["picture"] = null;
  const file = form.get("picture");
  if (file instanceof File && file.size > 0) {
    if (!PICTURE_TYPES.includes(file.type)) return "Picture must be a PNG, JPEG or WebP.";
    if (file.size > MAX_PICTURE_BYTES) return "Picture must be 1 MB or smaller.";
    picture = { base64: Buffer.from(await file.arrayBuffer()).toString("base64"), type: file.type };
  }

  return { title, whatItDoes, whatIDid, link, picture };
}

export { uuid as projectIdPattern };
