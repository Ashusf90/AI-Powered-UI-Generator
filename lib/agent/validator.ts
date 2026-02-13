// lib/agent/validator.ts

import { UIPlan, UIPlanNode, UIComponent } from "./schema";

const allowedComponents: UIComponent[] = [
  "Button",
  "Card",
  "Input",
  "Modal",
  "Table",
  "Sidebar",
  "Navbar",
  "Chart",
];

export function validatePlan(plan: UIPlan): boolean {
  if (!plan || !Array.isArray(plan.root)) {
    return false;
  }

  return plan.root.every(validateNode);
}

function validateNode(node: UIPlanNode): boolean {
  if (!node.id || typeof node.id !== "string") {
    return false;
  }

  if (!node.type || !allowedComponents.includes(node.type)) {
    return false;
  }

  if (node.children) {
    if (!Array.isArray(node.children)) return false;
    return node.children.every(validateNode);
  }

  return true;
}
