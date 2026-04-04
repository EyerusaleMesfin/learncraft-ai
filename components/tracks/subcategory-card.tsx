import Link from "next/link";
import type { Track, TrackSubcategory } from "@/types";

export function SubcategoryCard({
  track,
  subcategory
}: {
  track: Track;
  subcategory: TrackSubcategory;
}) {
  return (
    <Link
      href={`/tracks/${track.slug}/subcategories/${subcategory.slug}`}
      className="card group p-6 transition hover:-translate-y-1"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="pill">Subcategory</span>
        <div
          className="h-2 w-20 rounded-full"
          style={{ backgroundColor: track.color }}
        />
      </div>
      <h2 className="mt-5 text-2xl font-semibold text-slate-950">{subcategory.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{subcategory.overview}</p>
      <p className="mt-5 text-sm font-semibold text-slate-900">
        View AI-curated resources
      </p>
    </Link>
  );
}
