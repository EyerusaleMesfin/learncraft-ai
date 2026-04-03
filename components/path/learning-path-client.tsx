"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProjectCard } from "@/components/path/project-card";
import { ResourceCard } from "@/components/path/resource-card";
import { getLearningPath } from "@/data/tracks";
import type { LevelSlug, ProjectProgress, Track } from "@/types";

type EvaluationResult = {
  score: number;
  verdict: "pass" | "retry";
  feedback: string;
  progress?: ProjectProgress;
};

export function LearningPathClient({
  track,
  level,
  initialProgress
}: {
  track: Track;
  level: LevelSlug;
  initialProgress: ProjectProgress | null;
}) {
  const router = useRouter();
  const path = useMemo(() => getLearningPath(track.slug, level), [track.slug, level]);
  const [progress, setProgress] = useState<ProjectProgress | null>(initialProgress);
  const [skillCheckGithubUrl, setSkillCheckGithubUrl] = useState("");
  const [skillCheckCode, setSkillCheckCode] = useState("");
  const [projectGithubUrl, setProjectGithubUrl] = useState("");
  const [projectCode, setProjectCode] = useState("");
  const [evaluation, setEvaluation] = useState<EvaluationResult | null>(null);
  const [projectEvaluation, setProjectEvaluation] = useState<EvaluationResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const isBeginner = level === "beginner";
  const resourcesUnlocked = isBeginner ? true : progress?.resourcesUnlocked ?? false;
  const mainProjectUnlocked = isBeginner
    ? progress?.mainProjectUnlocked ?? false
    : progress?.mainProjectUnlocked ?? false;
  const deadlineLabel = progress?.deadlineAt
    ? new Date(progress.deadlineAt).toLocaleDateString()
    : "Will start when the project unlocks";

  const syncProgress = (nextProgress?: ProjectProgress) => {
    if (nextProgress) {
      setProgress(nextProgress);
    }

    router.refresh();
  };

  const handleBeginnerUnlock = async () => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/paths/unlock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          trackSlug: track.slug,
          level
        })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { message?: string };
        throw new Error(payload.message ?? "Could not unlock the project.");
      }

      setSubmitMessage("Resources completed. Your timed project is now unlocked.");
      syncProgress({
        trackSlug: track.slug,
        level,
        resourcesCompleted: true,
        resourcesUnlocked: true,
        mainProjectUnlocked: true,
        completed: progress?.completed ?? false,
        mastery: progress?.mastery ?? 0,
        latestScore: progress?.latestScore,
        latestFeedback: progress?.latestFeedback,
        deadlineAt:
          progress?.deadlineAt ??
          new Date(
            Date.now() + path.mainProject.timeLimitDays * 24 * 60 * 60 * 1000
          ).toISOString(),
        attemptCount: progress?.attemptCount ?? 0
      });
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Could not unlock the project.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitEvaluation = async (
    submissionType: "skill-check" | "main-project",
    githubUrl: string,
    code: string
  ) => {
    if (!githubUrl.trim() && !code.trim()) {
      throw new Error("Add a GitHub link or paste code before submitting.");
    }

    const response = await fetch("/api/evaluate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        track: track.slug,
        level,
        githubUrl,
        code,
        submissionType
      })
    });

    const payload = (await response.json()) as EvaluationResult & { message?: string };

    if (!response.ok) {
      throw new Error(payload.message ?? "Project evaluation failed.");
    }

    return payload;
  };

  const handleEvaluate = async () => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await submitEvaluation("skill-check", skillCheckGithubUrl, skillCheckCode);
      setEvaluation(result);
      syncProgress(result.progress);
      setSubmitMessage(
        result.score >= 50
          ? "Pass mark reached. Materials and the next project are unlocked."
          : "Score below 50%. Review the resources and retry."
      );
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Project evaluation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMainProjectSubmit = async () => {
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const result = await submitEvaluation("main-project", projectGithubUrl, projectCode);
      setProjectEvaluation(result);
      syncProgress(result.progress);
      setSubmitMessage(`Unlocked project scored ${result.score}%. Feedback updated below.`);
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "Project evaluation failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="card p-8">
        <span className="pill">Learning Path</span>
        <div
          className="mt-4 h-2 w-28 rounded-full"
          style={{ backgroundColor: track.color }}
        />
        <h1 className="mt-5 text-4xl font-black text-slate-950">
          {track.title} - {path.levelLabel}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{path.intro}</p>
        <p className="mt-4 text-sm text-slate-500">
          Progress and submissions are now tied to your real account and stored in the database.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="card p-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="pill">{isBeginner ? "Beginner flow" : "Skill-check flow"}</span>
            {!isBeginner ? <span className="pill">Pass mark: 50%</span> : null}
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900">
            {isBeginner
              ? "Step 1: Complete the learning resources"
              : "Step 1: Submit your skill-check project"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {isBeginner
              ? "These beginner resources are available immediately. Once the learner finishes them, the timed project unlocks."
              : "Intermediate and advanced learners begin with a real server-side project submission. The score determines what unlocks next."}
          </p>

          {path.skillCheckProject && !isBeginner ? (
            <div className="mt-6">
              <ProjectCard project={path.skillCheckProject} />
            </div>
          ) : null}

          {isBeginner ? (
            <div className="mt-8 space-y-6">
              <div className="grid gap-4">
                {path.resources.map((resource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={handleBeginnerUnlock}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Unlocking..." : "Mark resources complete and unlock project"}
              </button>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  GitHub repository link
                </label>
                <input
                  value={skillCheckGithubUrl}
                  onChange={(event) => setSkillCheckGithubUrl(event.target.value)}
                  placeholder="https://github.com/your-name/project"
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Or paste project code
                </label>
                <textarea
                  value={skillCheckCode}
                  onChange={(event) => setSkillCheckCode(event.target.value)}
                  placeholder="Paste your key code, README summary, or implementation notes here..."
                  rows={9}
                  className="input-field min-h-48"
                />
              </div>
              <button
                type="button"
                className="btn-primary"
                onClick={handleEvaluate}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Evaluating project..." : "Submit for AI evaluation"}
              </button>
            </div>
          )}

          {submitMessage ? (
            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {submitMessage}
            </div>
          ) : null}

          {evaluation ? (
            <div
              className={`mt-8 rounded-3xl border p-6 ${
                evaluation.verdict === "pass"
                  ? "border-teal-200 bg-teal-50"
                  : "border-orange-200 bg-orange-50"
              }`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
                AI Evaluation
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-950">
                Score: {evaluation.score}%
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">{evaluation.feedback}</p>
            </div>
          ) : null}
        </div>

        <div className="space-y-6">
          <div className="card p-8">
            <span className="pill">Path status</span>
            <div className="mt-5 space-y-4 text-sm text-slate-700">
              <div className="rounded-2xl bg-slate-50 p-4">
                Resources: {resourcesUnlocked ? "Unlocked" : "Locked until pass"}
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Main project: {mainProjectUnlocked ? "Unlocked" : "Locked"}
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">Deadline: {deadlineLabel}</div>
              <div className="rounded-2xl bg-slate-50 p-4">
                Latest mastery: {progress?.mastery ?? 0}%
              </div>
            </div>
          </div>

          {resourcesUnlocked ? (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-slate-900">
                {isBeginner ? "Starter resources" : "Unlocked learning materials"}
              </h2>
              <div className="mt-6 grid gap-4">
                {path.resources.map((resource) => (
                  <ResourceCard key={resource.title} resource={resource} />
                ))}
              </div>
            </div>
          ) : (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-slate-900">Resources unlock on pass</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Score 50% or higher on the skill check to unlock these high-rated
                articles and videos. Retry attempts are stored in your progress history.
              </p>
            </div>
          )}
        </div>
      </div>

      {mainProjectUnlocked ? (
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {isBeginner ? "Unlocked project" : "Next project unlocked"}
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            {isBeginner
              ? "This project unlocks after the beginner resources are completed."
              : "Passing the skill check unlocks both supporting materials and the next timed project."}
          </p>
          <div className="mt-6">
            <ProjectCard project={path.mainProject} />
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <input
              value={projectGithubUrl}
              onChange={(event) => setProjectGithubUrl(event.target.value)}
              placeholder="GitHub link for the unlocked project"
              className="input-field"
            />
            <textarea
              value={projectCode}
              onChange={(event) => setProjectCode(event.target.value)}
              rows={6}
              placeholder="Or paste code for the unlocked project here..."
              className="input-field min-h-40"
            />
          </div>
          <button
            type="button"
            className="btn-primary mt-4"
            onClick={handleMainProjectSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting project..." : "Submit unlocked project"}
          </button>
          {projectEvaluation ? (
            <div className="mt-6 rounded-3xl border border-sky-200 bg-sky-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-600">
                Project feedback
              </p>
              <h3 className="mt-3 text-3xl font-black text-slate-950">
                Score: {projectEvaluation.score}%
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {projectEvaluation.feedback}
              </p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
