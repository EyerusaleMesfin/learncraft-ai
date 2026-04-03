import Link from "next/link";

export function Hero() {
  return (
    <section className="page-shell pt-8">
      <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-6">
          <span className="pill">Welcome to Learn Craft AI</span>
          <h1 className="text-5xl font-black tracking-tight text-slate-950 md:text-6xl">
            Learn faster with guided tracks, AI scoring, and timed build challenges.
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-600">
            Learn Craft AI helps students choose a development track, match the right
            skill level, study recommended material, and unlock projects with
            server-backed AI evaluation, real auth, and persistent progress tracking.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/register" className="btn-primary">
              Create account
            </Link>
            <Link href="/tracks" className="btn-secondary">
              Explore tracks
            </Link>
          </div>
        </div>

        <div className="card overflow-hidden p-6">
          <div className="rounded-[32px] bg-slate-950 p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-300">Platform snapshot</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-100">
                Full-stack base
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Track options</p>
                <p className="mt-1 text-xl font-semibold">AI, App, Web Development</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-sm text-slate-300">Levels</p>
                  <p className="mt-1 font-semibold">Beginner to Advanced</p>
                </div>
                <div className="rounded-2xl bg-orange-400/20 p-4">
                  <p className="text-sm text-orange-100">Project timers</p>
                  <p className="mt-1 font-semibold text-white">3 or 7 days</p>
                </div>
              </div>
              <div className="rounded-2xl bg-teal-400/20 p-4">
                <p className="text-sm text-teal-100">Unlock rule</p>
                <p className="mt-1 text-2xl font-black">50%+ opens next step</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
