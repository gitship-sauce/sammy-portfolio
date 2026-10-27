import { getPicture } from "@/lib/projects";

// Sends a project's picture to the browser.
export async function GET(_request: Request, { params }: RouteContext<"/api/projects/[id]/picture">) {
  const { id } = await params;
  const picture = await getPicture(id);
  if (!picture) return new Response("No picture", { status: 404 });
  return new Response(new Uint8Array(picture.bytes), {
    headers: {
      "Content-Type": picture.type,
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
