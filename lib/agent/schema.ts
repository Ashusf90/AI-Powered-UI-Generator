// lib/agent/schema.ts

export type UIComponent =
  | "Button"
  | "Card"
  | "Input"
  | "Modal"
  | "Table"
  | "Sidebar"
  | "Navbar"
  | "Chart";

export interface UIPlanNode {
  id: string;
  type: UIComponent;
  props?: Record<string, any>;
  children?: UIPlanNode[];
}

export interface UIPlan {
  root: UIPlanNode[];
}
