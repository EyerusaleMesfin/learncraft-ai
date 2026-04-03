import Link from "next/link";
import type { Track } from "@/types";

export function TrackCard({ track }: { track: Track }) {
  return (
    <Link
      href={`/tracks/${track.slug}`}
      className="card group p-6 transition hover:-translate-y-1"
    >
      <div
        className="h-2 w-24 rounded-full"
        style={{ backgroundColor: track.color }}
      />
      <h2 className="mt-5 text-2xl font-semibold">{track.title}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{track.summary}</p>
      <p className="mt-5 text-sm font-semibold text-slate-900">Open track</p>
    </Link>
  );
}
