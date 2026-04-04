import { NextResponse } from "next/server";
import { getOpenAIRecommendations } from "@/lib/openai/recommendations";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const track = requestUrl.searchParams.get("track");
  const subcategory = requestUrl.searchParams.get("subcategory");

  if (!track || !subcategory) {
    return NextResponse.json(
      { error: "Track and subcategory are required." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resources = await getOpenAIRecommendations(track, subcategory);

  return NextResponse.json({ resources });
}
