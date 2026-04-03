import { NextResponse } from "next/server";
import { getLearningPath } from "@/data/tracks";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    trackSlug?: string;
    level?: "beginner" | "intermediate" | "advanced";
  };

  if (!body.trackSlug || !body.level) {
    return NextResponse.json({ message: "Track and level are required." }, { status: 400 });
  }

  const path = getLearningPath(body.trackSlug, body.level);

  return NextResponse.json({
    success: true,
    deadlineAt: new Date(
      Date.now() + path.mainProject.timeLimitDays * 24 * 60 * 60 * 1000
    ).toISOString()
  });
}
