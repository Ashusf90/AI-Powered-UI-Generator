// lib/agent/explainer.ts

import { UIPlan } from "./schema";

export async function runExplainer(
  userMessage: string,
  previousPlan: UIPlan | null,
  newPlan: UIPlan
): Promise<string> {
  const response = await fetch("/api/explainer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userMessage,
      previousPlan,
      newPlan,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Explainer API failed: ${errorText}`);
  }

  const data = await response.json();

  if (!data?.explanation) {
    return "No explanation generated.";
  }

  return data.explanation;
}
