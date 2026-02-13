import { UIPlan } from "./schema";

export function isFullRewrite(
  previousPlan: UIPlan | null,
  newPlan: UIPlan
): boolean {
  if (!previousPlan) return false;

  const prevRoot = previousPlan.root[0];
  const newRoot = newPlan.root[0];

  // If root component type changed → full rewrite
  if (prevRoot.type !== newRoot.type) {
    return true;
  }

  // If all children were removed and replaced
  if (
    prevRoot.children &&
    newRoot.children &&
    prevRoot.children.length > 0 &&
    newRoot.children.length === 0
  ) {
    return true;
  }

  return false;
}
