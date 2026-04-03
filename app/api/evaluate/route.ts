import { NextResponse } from "next/server";
import { getLearningPath, getTrackBySlug } from "@/data/tracks";
import { createClient } from "@/lib/supabase/server";

function evaluateSubmission(input: {
  track: string;
  level: string;
  githubUrl?: string;
  code?: string;
}) {
  const keywords = [
    "component",
    "api",
    "state",
    "responsive",
    "auth",
    "project",
    "dashboard",
    "github",
    "route",
    "prompt"
  ];

  const text = `${input.githubUrl ?? ""} ${input.code ?? ""} ${input.level} ${input.track}`.toLowerCase();
  const matchedKeywords = keywords.filter((keyword) => text.includes(keyword));
  const score = Math.min(
    28 + matchedKeywords.length * 5 + Math.min(Math.floor(text.trim().length / 90), 20),
    100
  );

  return {
    score,
    verdict: score >= 50 ? "pass" : "retry",
    feedback:
      score >= 50
        ? "Strong enough to unlock the next step in the learning path."
        : "This submission needs more implementation detail before retrying.",
    matchedKeywords
  } as const;
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    code?: string;
    githubUrl?: string;
    level?: "beginner" | "intermediate" | "advanced";
    track?: string;
    submissionType?: "skill-check" | "main-project";
  };

  if (!body.track || !body.level) {
    return NextResponse.json({ message: "Track and level are required." }, { status: 400 });
  }

  if (!body.githubUrl?.trim() && !body.code?.trim()) {
    return NextResponse.json(
      { message: "Add a GitHub link or paste code before submitting." },
      { status: 400 }
    );
  }

  const track = getTrackBySlug(body.track);

  if (!track) {
    return NextResponse.json({ message: "Unknown track." }, { status: 404 });
  }

  const path = getLearningPath(body.track, body.level);
  const evaluation = await evaluateSubmission({
    track: body.track,
    level: body.level,
    githubUrl: body.githubUrl,
    code: body.code
  });
  const deadlineDays =
    body.submissionType === "main-project"
      ? path.mainProject.timeLimitDays
      : (path.skillCheckProject ?? path.mainProject).timeLimitDays;

  return NextResponse.json({
    ...evaluation,
    progress: {
      resourcesCompleted: body.level === "beginner",
      resourcesUnlocked: body.level === "beginner" || evaluation.score >= 50,
      mainProjectUnlocked: body.level === "beginner" || evaluation.score >= 50,
      completed: body.submissionType === "main-project" ? evaluation.score >= 50 : evaluation.score >= 50,
      mastery: evaluation.score,
      latestScore: evaluation.score,
      latestFeedback: evaluation.feedback,
      deadlineAt: new Date(Date.now() + deadlineDays * 24 * 60 * 60 * 1000).toISOString(),
      attemptCount: 1
    }
  });
}
