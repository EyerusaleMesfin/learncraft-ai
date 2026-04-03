import { notFound } from "next/navigation";
import { LearningPathClient } from "@/components/path/learning-path-client";
import { getTrackBySlug, isValidLevel } from "@/data/tracks";

type LearningPathPageProps = {
  params: Promise<{ track: string; level: string }>;
};

export default async function LearningPathPage({
  params
}: LearningPathPageProps) {
  const { track, level } = await params;
  const trackData = getTrackBySlug(track);

  if (!trackData || !isValidLevel(level)) {
    notFound();
  }

  return (
    <div className="page-shell py-12">
      <LearningPathClient track={trackData} level={level} />
    </div>
  );
}
