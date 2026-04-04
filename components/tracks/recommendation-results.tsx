"use client";

import { useEffect, useState } from "react";
import type { RecommendedResource, Track, TrackSubcategory } from "@/types";

export function RecommendationResults({
  track,
  subcategory
}: {
  track: Track;
  subcategory: TrackSubcategory;
}) {
  const [resources, setResources] = useState<RecommendedResource[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadRecommendations = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `/api/recommendations?track=${track.slug}&subcategory=${subcategory.slug}`,
          {
            method: "GET",
            cache: "no-store"
          }
        );

        if (!response.ok) {
          throw new Error("Unable to load recommendations right now.");
        }

        const payload = (await response.json()) as { resources: RecommendedResource[] };

        if (isMounted) {
          setResources(payload.resources ?? []);
        }
      } catch (issue) {
        if (isMounted) {
          setError(issue instanceof Error ? issue.message : "Unable to load recommendations.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadRecommendations();

    return () => {
      isMounted = false;
    };
  }, [subcategory.slug, track.slug]);

  if (isLoading) {
    return (
      <div className="card p-8">
        <span className="pill">OpenAI recommendations</span>
        <h2 className="mt-4 text-2xl font-bold text-slate-950">Loading resources</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Learn Craft AI is selecting top-rated websites, guides, and courses for the{" "}
          {subcategory.title} path.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-8">
        <span className="pill">OpenAI recommendations</span>
        <h2 className="mt-4 text-2xl font-bold text-slate-950">Resources unavailable</h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="card p-8">
        <span className="pill">OpenAI recommendations</span>
        <h1 className="mt-4 text-4xl font-black text-slate-950">
          {track.title}: {subcategory.title}
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
          Top-rated resources and learning websites are loaded dynamically after the
          subcategory is selected. If OpenAI is not configured, curated fallback
          resources are shown automatically.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {resources.map((resource) => (
          <a
            key={`${resource.title}-${resource.url}`}
            href={resource.url}
            target="_blank"
            rel="noreferrer"
            className="card p-6 transition hover:-translate-y-1"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="pill">{resource.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {resource.rating}
              </span>
              <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-900">
                {resource.source === "openai" ? "Live AI" : "Curated fallback"}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-slate-950">{resource.title}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{resource.description}</p>
            <p className="mt-5 text-sm font-semibold text-slate-900">Open resource</p>
          </a>
        ))}
      </div>
    </div>
  );
}
