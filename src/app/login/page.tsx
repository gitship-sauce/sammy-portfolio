"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/logo";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function logIn(formData: FormData) {
    setBusy(true);
    setError("");
    const response = await fetch("/api/login", { method: "POST", body: formData });
    setBusy(false);
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      setError(body.error ?? `Log in failed (${response.status}).`);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-[2rem] bg-white p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] ring-1 ring-line">
        <Logo />
        <h1 className="mt-8 text-3xl font-semibold tracking-tight">Admin log in</h1>
        <p className="mt-2 text-sm text-muted">Only Sammy can edit this site.</p>
        <form action={logIn} className="mt-8 flex flex-col gap-4">
          <input name="email" type="email" required placeholder="Email" className="field" />
          <input name="password" type="password" required placeholder="Password" className="field" />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={busy} className="button mt-2">
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>
      </div>
    </main>
  );
}
