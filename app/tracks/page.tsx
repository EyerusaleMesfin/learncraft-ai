import { TrackCard } from "@/components/tracks/track-card";
import { tracks } from "@/data/tracks";

export default function TracksPage() {
  return (
    <div className="page-shell py-12" data-testid="tracks-page">
      <div className="max-w-3xl space-y-4">
        <span className="pill">Track selection</span>
        <h1 className="section-title" data-testid="tracks-heading">
          Choose a development track
        </h1>
        <p className="section-copy">
          Each track includes beginner, intermediate, and advanced levels. Beginners
          learn first, while intermediate and advanced learners begin with a
          skill-check project.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>
    </div>
  );
}
