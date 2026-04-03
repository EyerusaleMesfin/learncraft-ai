import Link from "next/link";
import type { LevelInfo, Track } from "@/types";

export function LevelCard({
  track,
  level
}: {
  track: Track;
  level: LevelInfo;
}) {
  return (
    <Link
      href={`/tracks/${track.slug}/${level.slug}`}
      className="card p-6 transition hover:-translate-y-1"
    >
      <span className="pill">{level.title}</span>
      <h2 className="mt-5 text-2xl font-semibold">{level.headline}</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">{level.description}</p>
      <p className="mt-6 text-sm font-semibold text-slate-900">
        {level.slug === "beginner"
          ? "Resources first, then unlock project"
          : "Skill-check project first"}
      </p>
    </Link>
  );
}
