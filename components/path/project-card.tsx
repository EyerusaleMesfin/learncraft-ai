import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-xl font-semibold text-slate-900">{project.title}</h3>
        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-900">
          Time limit: {project.timeLimitDays} days
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{project.description}</p>
      <p className="mt-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
        Submission: {project.submissionHint}
      </p>
      <ul className="mt-5 space-y-2 text-sm text-slate-700">
        {project.goals.map((goal) => (
          <li key={goal} className="rounded-2xl bg-slate-50 px-4 py-3">
            {goal}
          </li>
        ))}
      </ul>
    </div>
  );
}
