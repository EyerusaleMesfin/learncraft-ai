import { starterDashboard } from "@/data/tracks";

const toneStyles = {
  info: "border-sky-200 bg-sky-50",
  success: "border-teal-200 bg-teal-50",
  warning: "border-orange-200 bg-orange-50"
};

export function NotificationPreview() {
  return (
    <aside className="card p-8">
      <span className="pill">Notifications</span>
      <h2 className="mt-4 text-2xl font-bold">In-app reminders</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Authentication is now real with Supabase. These notifications remain demo UI
        until you connect the rest of your backend data flow.
      </p>
      <div className="mt-6 space-y-4">
        {starterDashboard.notifications.map((notification) => (
          <div
            key={notification.id}
            className={`rounded-2xl border p-4 ${toneStyles[notification.tone]}`}
          >
            <p className="text-sm font-semibold text-slate-900">{notification.title}</p>
            <p className="mt-2 text-sm text-slate-600">{notification.message}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}
