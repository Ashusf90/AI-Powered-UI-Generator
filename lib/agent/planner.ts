// lib/agent/planner.ts

import { UIPlan } from "./schema";

export async function runPlanner(
  userMessage: string,
  existingPlan?: UIPlan
): Promise<UIPlan> {
  const response = await fetch("/api/planner", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userMessage, existingPlan }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Planner API failed: ${errorText}`);
  }

  const data = await response.json();
  return data;
}
