import { ProjectRow } from "@/components/project-row";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <main>
      <section className="mx-auto max-w-6xl px-6 pb-24 pt-20 sm:pt-28">
        <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-sm font-medium">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          Open to summer internships
        </p>
        <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[0.95] tracking-[-0.045em] sm:text-8xl">
          I build small tools that fix{" "}
          <span className="font-serif font-normal italic">
            <span className="bg-[linear-gradient(transparent_62%,var(--color-lime)_62%)]">everyday problems.</span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl text-xl leading-relaxed text-muted">
          I&apos;m Sammy, a second-year computer science student. Here&apos;s what I&apos;ve built, and what I did on each
          one.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <a href="#projects" className="button">
            See my projects ↓
          </a>
          <a href="https://github.com/gitship-sauce" className="button-outline">
            GitHub ↗
          </a>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-6xl scroll-mt-24 px-6">
        <Projects />
      </section>
    </main>
  );
}

function Projects() {
  return (
    <>
      <div className="flex items-end justify-between border-b border-line pb-6">
        <h2 className="text-4xl font-semibold tracking-tight">Selected projects</h2>
        <p className="font-mono text-sm text-muted">({String(projects.length).padStart(2, "0")})</p>
      </div>
      {projects.length === 0 ? (
        <p className="mt-10 text-muted">No projects yet.</p>
      ) : (
        <div className="mt-14 flex flex-col gap-24">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>
      )}
    </>
  );
}
