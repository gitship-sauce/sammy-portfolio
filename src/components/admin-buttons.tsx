"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";

export function AdminBar() {
  const router = useRouter();

  async function logOut() {
    await fetch("/api/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <p className="flex items-center gap-2">
          <Logo />
          <span className="rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-white">admin</span>
        </p>
        <div className="flex items-center gap-5 text-sm font-medium">
          <Link href="/" className="text-muted hover:text-ink">
            View site ↗
          </Link>
          <button onClick={logOut} className="text-muted hover:text-ink">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}

export function DeleteButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();

  async function remove() {
    if (!confirm(`Delete "${title}"?`)) return;
    const response = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (!response.ok) {
      alert(`Deleting failed (${response.status}).`);
      return;
    }
    router.refresh();
  }

  return (
    <button onClick={remove} className="rounded-full px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50">
      Delete
    </button>
  );
}
