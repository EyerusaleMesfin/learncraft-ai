import { getFallbackRecommendations, getSubcategoryBySlug, getTrackBySlug } from "@/data/tracks";
import type { RecommendedResource } from "@/types";

type OpenAIRecommendationPayload = {
  resources: Array<{
    title: string;
    description: string;
    url: string;
    type: string;
    rating: string;
  }>;
};

function normalizeResources(resources: OpenAIRecommendationPayload["resources"]) {
  return resources
    .filter((resource) => resource.title && resource.description && resource.url)
    .map<RecommendedResource>((resource) => ({
      title: resource.title.trim(),
      description: resource.description.trim(),
      url: resource.url.trim(),
      type: resource.type?.trim() || "Website",
      rating: resource.rating?.trim() || "Top rated",
      source: "openai"
    }));
}

function extractJsonPayload(text: string) {
  const match = text.match(/\{[\s\S]*\}/);

  if (!match) {
    throw new Error("No JSON object found in OpenAI response.");
  }

  return JSON.parse(match[0]) as OpenAIRecommendationPayload;
}

export async function getOpenAIRecommendations(
  trackSlug: string,
  subcategorySlug: string
): Promise<RecommendedResource[]> {
  const track = getTrackBySlug(trackSlug);
  const subcategory = getSubcategoryBySlug(trackSlug, subcategorySlug);
  const fallback = getFallbackRecommendations(trackSlug, subcategorySlug);

  if (!track || !subcategory) {
    return fallback;
  }

  if (!process.env.OPENAI_API_KEY) {
    return fallback;
  }

  try {
    const prompt = [
      `You are curating top-rated learning resources for ${track.title}.`,
      `The learner selected the ${subcategory.title} subcategory.`,
      `Focus on ${subcategory.promptFocus}.`,
      "Return exactly 4 resources as JSON with this shape:",
      '{"resources":[{"title":"string","description":"string","url":"https://...","type":"Course|Website|Guide|YouTube","rating":"4.9/5"}]}',
      "Choose real, reputable learning resources and websites.",
      "Keep each description under 22 words."
    ].join("\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL ?? "gpt-4.1-mini",
        input: prompt
      }),
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`OpenAI request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { output_text?: string };
    const parsed = extractJsonPayload(payload.output_text ?? "");
    const resources = normalizeResources(parsed.resources);

    return resources.length > 0 ? resources : fallback;
  } catch {
    return fallback;
  }
}
