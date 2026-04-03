import { notFound } from "next/navigation";
import { LearningPathClient } from "@/components/path/learning-path-client";
import { getTrackBySlug, isValidLevel } from "@/data/tracks";
import { requireSupabaseUser } from "@/lib/supabase/auth";

type LearningPathPageProps = {
  params: Promise<{ track: string; level: string }>;
};

export default async function LearningPathPage({
  params
}: LearningPathPageProps) {
  await requireSupabaseUser();

  const { track, level } = await params;
  const trackData = getTrackBySlug(track);

  if (!trackData || !isValidLevel(level)) {
    notFound();
  }

  return (
    <div className="page-shell py-12">
      <LearningPathClient track={trackData} level={level} initialProgress={null} />
    </div>
  );
}
