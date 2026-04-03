"use client";

import { useAppState } from "@/components/providers/app-provider";

const toneStyles = {
  info: "border-sky-200 bg-sky-50",
  success: "border-teal-200 bg-teal-50",
  warning: "border-orange-200 bg-orange-50"
};

export function NotificationPreview() {
  const { notifications } = useAppState();
  const preview = notifications.slice(0, 3);

  return (
    <aside className="card p-8">
      <span className="pill">Notifications</span>
      <h2 className="mt-4 text-2xl font-bold">In-app reminders</h2>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Learners see project unlocks, retry prompts, and time-based nudges in one
        place.
      </p>
      <div className="mt-6 space-y-4">
        {preview.map((notification) => (
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
