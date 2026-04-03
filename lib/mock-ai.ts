const scoringKeywords = [
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

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function scoreSubmission(input: {
  code?: string;
  githubUrl?: string;
  level?: string;
  track?: string;
}) {
  const text = `${input.githubUrl ?? ""} ${input.code ?? ""} ${input.level ?? ""} ${
    input.track ?? ""
  }`.toLowerCase();

  if (!text.trim()) {
    return {
      score: 12,
      verdict: "retry" as const,
      feedback:
        "No project details were detected. Add a GitHub link or paste code so the learner can be evaluated.",
      matchedKeywords: [] as string[]
    };
  }

  const matchedKeywords = scoringKeywords.filter((keyword) => text.includes(keyword));
  const randomBase = randomBetween(28, 78);
  const keywordBonus = Math.min(matchedKeywords.length * 4, 18);
  const lengthBonus = Math.min(Math.floor(text.trim().length / 80), 10);
  const score = Math.min(randomBase + keywordBonus + lengthBonus, 100);

  return {
    score,
    verdict: score >= 50 ? ("pass" as const) : ("retry" as const),
    feedback:
      score >= 50
        ? "Strong enough for the MVP flow. The learner can unlock materials and continue to the next timed project."
        : "This submission needs more implementation detail. Review the resources, improve the project, and retry the skill check.",
    matchedKeywords
  };
}
