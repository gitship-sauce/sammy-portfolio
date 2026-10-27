import Link from "next/link";
import { Logo } from "@/components/logo";

const email = "sammy@example.com";

// The public site: the top bar and the contact section around every page.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="sticky top-0 z-10 border-b border-line/70 bg-paper/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-6 text-sm font-medium">
            <Link href="/#projects" className="hidden text-muted hover:text-ink sm:block">
              Projects
            </Link>
            <Link href="/#contact" className="hidden text-muted hover:text-ink sm:block">
              Contact
            </Link>
            <a href={`mailto:${email}`} className="rounded-full bg-ink px-4 py-2 text-white">
              Email me
            </a>
          </div>
        </nav>
      </header>

      <div className="flex-1">{children}</div>

      <section id="contact" className="px-4 pb-4 pt-24">
        <div className="mx-auto max-w-6xl rounded-[2.5rem] bg-ink px-8 py-16 text-white sm:px-14 sm:py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/50">Contact</p>
          <h2 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">
            Got an internship <br className="hidden sm:block" />
            that fits? <span className="font-serif font-normal italic text-lime">Let&apos;s talk.</span>
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:${email}`}
              className="rounded-full bg-lime px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5"
            >
              {email}
            </a>
            <a
              href="https://github.com/gitship-sauce"
              className="rounded-full border border-white/20 px-6 py-3 font-medium transition hover:border-white"
            >
              GitHub ↗
            </a>
          </div>
        </div>
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-muted">© 2026 Sammy · Built with Next.js</p>
      </section>
    </>
  );
}
