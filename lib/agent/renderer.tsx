// lib/agent/renderer.tsx

import React from "react";
import { UIPlan, UIPlanNode } from "./schema";
import { componentMap } from "./componentMap";

export function renderPlan(plan: UIPlan) {
  return plan.root.map((node) => renderNode(node));
}

function renderNode(node: UIPlanNode): React.ReactNode {
  const Component = componentMap[node.type as keyof typeof componentMap];

  if (!Component) {
    console.error(`Unknown component type: ${node.type}`);
    return null;
  }

  const children = node.children?.map((child) => renderNode(child));

  return (
    <Component key={node.id} {...node.props}>
      {children}
    </Component>
  );
}
