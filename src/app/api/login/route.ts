import { cookies } from "next/headers";
import { SESSION_COOKIE, isAdminLogin, newSession } from "@/lib/session";

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  const email = form?.get("email");
  const password = form?.get("password");
  if (typeof email !== "string" || typeof password !== "string" || !isAdminLogin(email, password)) {
    return Response.json({ error: "Wrong email or password." }, { status: 401 });
  }

  const session = newSession();
  (await cookies()).set(SESSION_COOKIE, session.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: session.maxAge,
  });
  return new Response(null, { status: 204 });
}
