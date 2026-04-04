import { StatCard } from "@/components/dashboard/stat-card";
import { starterDashboard } from "@/data/tracks";
import { requireSupabaseUser } from "@/lib/supabase/auth";

const toneStyles = {
  info: "border-sky-200 bg-sky-50",
  success: "border-teal-200 bg-teal-50",
  warning: "border-orange-200 bg-orange-50"
};

export default async function DashboardPage() {
  const user = await requireSupabaseUser();
  const displayName = user.user_metadata?.full_name ?? user.email ?? "Learner";

  return (
    <div className="page-shell py-12" data-testid="dashboard-page">
      <div className="max-w-3xl space-y-4">
        <span className="pill">Progress Dashboard</span>
        <h1 className="section-title" data-testid="dashboard-heading">
          {displayName}'s dashboard
        </h1>
        <p className="section-copy">
          This page is now protected by Supabase authentication. Only logged-in users
          can access dashboard and track pages.
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <StatCard label="Completed Levels" value={starterDashboard.completedLevels} />
        <StatCard label="Overall Mastery" value={`${starterDashboard.mastery}%`} />
        <StatCard label="Active Projects" value={starterDashboard.activeProjects} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <section className="card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Authenticated session</h2>
            <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm text-slate-600">Signed in as</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{displayName}</p>
              <p className="mt-2 text-sm text-slate-600">{user.email}</p>
            </div>
          </section>

          <section className="card p-8">
            <h2 className="text-2xl font-bold text-slate-900">Next steps</h2>
            <div className="mt-6 space-y-4">
              {starterDashboard.recentAchievements.map((achievement) => (
                <div
                  key={achievement.title}
                  className="rounded-3xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-lg font-semibold text-slate-900">{achievement.title}</p>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {achievement.detail}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <section className="card p-8">
          <h2 className="text-2xl font-bold text-slate-900">Reminders and unlocks</h2>
          <div className="mt-6 space-y-4">
            {starterDashboard.notifications.map((notification) => (
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
        </section>
      </div>
    </div>
  );
}
