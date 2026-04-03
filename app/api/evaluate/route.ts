import { NextResponse } from "next/server";
import { scoreSubmission } from "@/lib/mock-ai";

export async function POST(request: Request) {
  // Backend placeholder: replace this mock evaluator with your real AI scoring service.
  const body = (await request.json()) as {
    code?: string;
    githubUrl?: string;
    level?: string;
    track?: string;
  };

  const evaluation = scoreSubmission(body);

  return NextResponse.json(evaluation);
}
