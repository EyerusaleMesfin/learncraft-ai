import { notFound } from "next/navigation";
import { LevelCard } from "@/components/tracks/level-card";
import { getTrackBySlug, levels } from "@/data/tracks";

type TrackPageProps = {
  params: Promise<{ track: string }>;
};

export default async function TrackDetailsPage({ params }: TrackPageProps) {
  const { track } = await params;
  const trackData = getTrackBySlug(track);

  if (!trackData) {
    notFound();
  }

  return (
    <div className="page-shell py-12">
      <div className="card p-8">
        <span className="pill">Level selection</span>
        <div
          className="mt-4 h-2 w-28 rounded-full"
          style={{ backgroundColor: trackData.color }}
        />
        <h1 className="mt-5 text-4xl font-black text-slate-950">{trackData.title}</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
          {trackData.summary}
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {levels.map((level) => (
          <LevelCard key={level.slug} track={trackData} level={level} />
        ))}
      </div>
    </div>
  );
}
