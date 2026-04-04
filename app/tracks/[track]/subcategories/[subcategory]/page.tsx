import { notFound } from "next/navigation";
import { RecommendationResults } from "@/components/tracks/recommendation-results";
import { getSubcategoryBySlug, getTrackBySlug } from "@/data/tracks";
import { requireSupabaseUser } from "@/lib/supabase/auth";

type SubcategoryPageProps = {
  params: Promise<{ track: string; subcategory: string }>;
};

export default async function TrackSubcategoryPage({
  params
}: SubcategoryPageProps) {
  await requireSupabaseUser();

  const { track, subcategory } = await params;
  const trackData = getTrackBySlug(track);
  const subcategoryData = getSubcategoryBySlug(track, subcategory);

  if (!trackData || !subcategoryData) {
    notFound();
  }

  return (
    <div className="page-shell py-12">
      <RecommendationResults track={trackData} subcategory={subcategoryData} />
    </div>
  );
}
