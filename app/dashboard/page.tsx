"use client";

import Link from "next/link";
import { StatCard } from "@/components/dashboard/stat-card";
import { useAppState } from "@/components/providers/app-provider";

const toneStyles = {
  info: "border-sky-200 bg-sky-50",
  success: "border-teal-200 bg-teal-50",
  warning: "border-orange-200 bg-orange-50"
};

export default function DashboardPage() {
  const { currentUser, dashboard, progress, submissions } = useAppState();
  const progressItems = Object.values(progress);

  return (
    <div className="page-shell py-12">
      <div className="max-w-3xl space-y-4">
        <span className="pill">Progress Dashboard</span>
        <h1 className="section-title">
          {currentUser ? `${currentUser.name}'s dashboard` : "Your progress dashboard"}
        </h1>
        <p className="section-copy">
          Track completed levels, mastery percentage, active timed projects, recent
          submissions, and reminder notifications from one responsive screen.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <StatCard label="Completed Levels" value={dashboard.completedLevels} />
        <StatCard label="Overall Mastery" value={`${dashboard.mastery}%`} />
        <StatCard label="Active Projects" value={dashboard.activeProjects} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Level progress</h2>
            <div className="mt-6 space-y-4">
              {progressItems.length > 0 ? (
                progressItems.map((item) => (
                  <div
                    key={`${item.trackSlug}-${item.level}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-lg font-semibold text-slate-900">
                          {item.trackSlug.replaceAll("-", " ")} - {item.level}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          Mastery: {item.mastery}% | Attempts: {item.attemptCount}
                        </p>
                      </div>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                        {item.completed ? "Completed" : "In progress"}
                      </span>
                    </div>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                      <div
                        className="h-full rounded-full bg-slate-900"
                        style={{ width: `${Math.max(item.mastery, 8)}%` }}
                      />
                    </div>
                    <p className="mt-3 text-sm text-slate-600">
                      {item.latestFeedback ??
                        "Complete resources or submit a project to generate progress feedback."}
                    </p>
                  </div>
                ))
              ) : (
                <div className="rounded-3xl border border-dashed border-slate-300 p-6 text-sm text-slate-600">
                  No learning progress yet. Visit{" "}
                  <Link href="/tracks" className="font-semibold text-slate-900">
                    Tracks
                  </Link>{" "}
                  to start a path.
                </div>
              )}
            </div>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Recent submissions</h2>
            <div className="mt-6 space-y-4">
              {submissions.length > 0 ? (
                submissions.slice(0, 4).map((submission) => (
                  <div
                    key={submission.id}
                    className="rounded-3xl border border-slate-200 bg-white p-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-lg font-semibold text-slate-900">
                        {submission.trackTitle} - {submission.level}
                      </p>
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-900">
                        {submission.score}%
                      </span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {submission.feedback}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">
                  No submissions yet. When a learner sends a GitHub link or pasted
                  code, the score and feedback will appear here.
                </p>
              )}
            </div>
          </section>
        </div>

        <section className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900">Reminders and unlocks</h2>
          <div className="mt-6 space-y-4">
            {dashboard.notifications.map((notification) => (
              <div
                key={notification.id}
                className={`rounded-3xl border p-4 ${toneStyles[notification.tone]}`}
              >
                <p className="text-sm font-semibold text-slate-900">
                  {notification.title}
                </p>
                <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-300">
              Backend placeholder
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-200">
              Replace local storage progress with real user records, deadlines,
              notification jobs, and project submission history from your backend.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
