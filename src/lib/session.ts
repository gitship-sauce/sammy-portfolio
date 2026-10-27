import { createHmac, createHash, timingSafeEqual } from "node:crypto";

// One admin: the email and password come from environment variables, never from the code.
// After logging in, the browser keeps a cookie that only this server can sign.

export const SESSION_COOKIE = "admin_session";
const WEEK_SECONDS = 7 * 24 * 60 * 60;

function setting(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is missing from the environment variables.`);
  return value;
}

function sameText(a: string, b: string) {
  // Compare hashes so the check takes the same time whatever was typed.
  return timingSafeEqual(createHash("sha256").update(a).digest(), createHash("sha256").update(b).digest());
}

export function isAdminLogin(email: string, password: string) {
  const emailOk = sameText(email.trim().toLowerCase(), setting("ADMIN_EMAIL").toLowerCase());
  const passwordOk = sameText(password, setting("ADMIN_PASSWORD"));
  return emailOk && passwordOk;
}

function sign(text: string) {
  return createHmac("sha256", setting("SESSION_SECRET")).update(text).digest("base64url");
}

export function newSession() {
  const expires = Math.floor(Date.now() / 1000) + WEEK_SECONDS;
  return { value: `${expires}.${sign(String(expires))}`, maxAge: WEEK_SECONDS };
}

export function isValidSession(value: string | undefined) {
  if (!value) return false;
  const [expires, signature] = value.split(".");
  if (!expires || !signature) return false;
  if (!sameText(signature, sign(expires))) return false;
  return Number(expires) > Date.now() / 1000;
}
