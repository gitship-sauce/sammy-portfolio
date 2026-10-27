// Checks the site the way chapter 6's attack did: logged out, straight at the save address.
// Local: pnpm build && pnpm start, then pnpm test
// Live:  BASE_URL=https://sammy-gitship.vercel.app pnpm test
import assert from "node:assert/strict";
import { test } from "node:test";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const someId = "00000000-0000-0000-0000-000000000000";

function attackForm() {
  const form = new FormData();
  form.set("title", "Hacked by Gitsy");
  form.set("what_it_does", "Anyone can add projects to this site.");
  form.set("what_i_did", "Nothing. I was never logged in.");
  return form;
}

test("anyone can see the home page", async () => {
  const response = await fetch(base + "/");
  assert.equal(response.status, 200);
});

test("a logged-out visitor can't add a project", async () => {
  const response = await fetch(base + "/api/projects", { method: "POST", body: attackForm() });
  assert.equal(response.status, 401);
});

test("a logged-out visitor can't edit a project", async () => {
  const response = await fetch(`${base}/api/projects/${someId}`, { method: "PATCH", body: attackForm() });
  assert.equal(response.status, 401);
});

test("a logged-out visitor can't delete a project", async () => {
  const response = await fetch(`${base}/api/projects/${someId}`, { method: "DELETE" });
  assert.equal(response.status, 401);
});

test("a made-up login cookie doesn't work", async () => {
  const response = await fetch(base + "/api/projects", {
    method: "POST",
    body: attackForm(),
    headers: { cookie: "admin_session=9999999999.not-a-real-signature" },
  });
  assert.equal(response.status, 401);
});

test("the admin page sends logged-out visitors to log in", async () => {
  const response = await fetch(base + "/admin", { redirect: "manual" });
  assert.equal(response.status, 307);
  assert.equal(new URL(response.headers.get("location"), base).pathname, "/login");
});
