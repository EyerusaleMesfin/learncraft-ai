import type { Resource } from "@/types";

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-white"
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          {resource.type}
        </p>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700">
          {resource.rating}
        </span>
      </div>
      <h3 className="mt-3 text-lg font-semibold text-slate-900">{resource.title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{resource.description}</p>
    </a>
  );
}
