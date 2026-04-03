import Link from "next/link";
import { Hero } from "@/components/home/hero";
import { HomeStepper } from "@/components/home/stepper";
import { NotificationPreview } from "@/components/notification-preview";
import { tracks } from "@/data/tracks";

export default function HomePage() {
  return (
    <div className="space-y-16 pb-10 md:space-y-24">
      <Hero />

      <section className="page-shell">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <span className="pill">Track selection</span>
            <h2 className="section-title">Welcome to Learn Craft AI</h2>
            <p className="section-copy">
              Choose a track, match your current level, and move through an adaptive
              learning flow with resources, projects, reminders, and AI-style scoring.
            </p>
          </div>
          <Link href="/tracks" className="btn-primary">
            View tracks
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.slug}
              href={`/tracks/${track.slug}`}
              className="card group p-6 transition hover:-translate-y-1"
            >
              <div
                className="mb-5 h-2 w-24 rounded-full"
                style={{ backgroundColor: track.color }}
              />
              <h3 className="text-2xl font-semibold text-slate-950">{track.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{track.summary}</p>
              <p className="mt-5 text-sm font-semibold text-slate-900">
                Levels: Beginner, Intermediate, Advanced
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="page-shell">
        <HomeStepper />
      </section>

      <section className="page-shell grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="card p-8">
          <span className="pill">Project system</span>
          <h2 className="mt-4 section-title">Timed projects, mock scoring, visible progress</h2>
          <p className="mt-4 section-copy">
            Learners can submit GitHub links or pasted code, receive a mock AI score,
            and see project unlocks reflected in their dashboard. This front-end is
            structured so real backend auth, storage, and evaluation services can be
            connected later.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/tracks/ai-development/intermediate" className="btn-primary">
              Try a skill check
            </Link>
            <Link href="/dashboard" className="btn-secondary">
              Open dashboard
            </Link>
          </div>
        </div>

        <NotificationPreview />
      </section>
    </div>
  );
}
