import { notFound } from "next/navigation";
import { LevelCard } from "@/components/tracks/level-card";
import { SubcategoryCard } from "@/components/tracks/subcategory-card";
import { getTrackBySlug, levels } from "@/data/tracks";
import { requireSupabaseUser } from "@/lib/supabase/auth";

type TrackPageProps = {
  params: Promise<{ track: string }>;
};

export default async function TrackDetailsPage({ params }: TrackPageProps) {
  await requireSupabaseUser();

  const { track } = await params;
  const trackData = getTrackBySlug(track);

  if (!trackData) {
    notFound();
  }

  return (
    <div className="page-shell py-12">
      <div className="card p-8">
        <span className="pill">Track overview</span>
        <div
          className="mt-4 h-2 w-28 rounded-full"
          style={{ backgroundColor: trackData.color }}
        />
        <h1 className="mt-5 text-4xl font-black text-slate-950">{trackData.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {trackData.summary}
        </p>
      </div>

      <section className="mt-10">
        <div className="mb-6 max-w-3xl space-y-3">
          <span className="pill">Subcategories</span>
          <h2 className="text-3xl font-black text-slate-950">
            Choose a specialization before browsing resources
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            Each subcategory opens a live recommendation view powered by OpenAI with
            trusted fallback resources when the API key is not configured.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {trackData.subcategories.map((subcategory) => (
            <SubcategoryCard
              key={subcategory.slug}
              track={trackData}
              subcategory={subcategory}
            />
          ))}
        </div>
      </section>

      <section className="mt-12">
        <div className="mb-6 max-w-3xl space-y-3">
          <span className="pill">Skill levels</span>
          <h2 className="text-3xl font-black text-slate-950">
            Continue into the project path when you are ready
          </h2>
          <p className="text-sm leading-6 text-slate-600">
            The original level-based learning flow is still available for project
            unlocks, skill checks, and timed submissions.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.slug} track={trackData} level={level} />
        ))}
        </div>
      </section>
    </div>
  );
}
