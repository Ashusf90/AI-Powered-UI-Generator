This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


AI UI Generator – Deterministic Agent System
Overview

This project implements a deterministic AI-powered UI generator that converts natural language intent into structured UI plans and renders them using a fixed component library.

The system is designed around:

Deterministic component rendering

Multi-step agent orchestration

Incremental modification enforcement

Version control & rollback

Explainability layer

Strict safety constraints

The architecture intentionally separates planning, validation, rendering, and explanation into isolated layers to ensure correctness and reproducibility.

🧠 Architecture Overview
High-Level Flow

User Input
→ Planner Agent
→ Plan Validation
→ Rewrite Enforcement
→ Renderer
→ Explainer Agent
→ Version Store

🔁 Agent Design

The system is structured as a multi-step agent pipeline:

1️⃣ Planner Agent

Responsibility:

Interprets user intent

Produces structured JSON UI plan

Preserves existing structure when modifying

Enforces deterministic component usage

Output format:

{
  "root": [
    {
      "id": "unique-id",
      "type": "Card",
      "props": {},
      "children": []
    }
  ]
}

2️⃣ Validator Layer

Before rendering, every plan is validated:

Component whitelist enforcement

Recursive structure validation

Prop-level safety

Invalid plan rejection

This guarantees determinism.

3️⃣ Incremental Rewrite Enforcement

To comply with the requirement:

No full rewrites unless explicitly requested

The system detects structural changes using a plan diff utility.

If a full rewrite is detected:

The request is rejected

The user must explicitly say "regenerate" or "rewrite"

This ensures incremental reasoning and edit awareness.

4️⃣ Renderer (Deterministic)

The renderer does NOT evaluate arbitrary JSX.

Instead, it maps structured JSON to a fixed component registry:

const componentMap = {
  Button,
  Card,
  Input,
  ...
};


This prevents:

Arbitrary code execution

Style injection

Unauthorized component creation

5️⃣ Explainer Agent

After generation, the system produces a human-readable explanation:

What components were selected

Why they were chosen

What changed from previous version

This makes the system transparent and debuggable.

🧱 Deterministic Component System

The component library is fixed and immutable:

Button

Card

Input

Modal

Table

Sidebar

Navbar

Chart

Constraints:

No inline styles from planner

No dynamic CSS generation

No arbitrary Tailwind classes

No external UI libraries

No AI-created components

All styling is static and predefined.

🔒 Safety & Validation

The system includes:

Component whitelist enforcement

Recursive structure validation

Rewrite detection

Explicit regeneration override

Client-side error handling

Controlled renderer (no eval)

🗂 Versioning & Rollback

Each successful generation is stored.

Users can:

Roll back to previous versions

Restore full plan state

Restore explanation state

This ensures reproducibility.

🧪 Iteration Example

"Create dashboard"

"Add another button"

"Make it minimal"

Attempt full rewrite (blocked)

"Regenerate dashboard" (allowed)

The system preserves structure unless explicitly instructed otherwise.

🛠 Technical Stack

Frontend:

Next.js (App Router)

React

TypeScript

Architecture:

API Routes for agent steps

Deterministic JSON plan schema

Recursive plan rendering

Plan diff enforcement

📌 Mock Planner Note

Due to API quota limitations, the LLM layer was replaced with a deterministic rule-based planner for demonstration purposes.

The architecture remains fully LLM-compatible, and the agent layer can be re-enabled by restoring LLM integration in /api/planner.

The multi-step agent design, validation, rewrite enforcement, and rendering pipeline remain identical.

🧠 Engineering Tradeoffs

Chose deterministic JSON plans over direct JSX generation for safety.

Enforced rewrite detection to satisfy iteration constraints.

Avoided dynamic styling for strict reproducibility.

Implemented controlled rendering instead of code evaluation.

🚀 Future Improvements

With additional time:

Streaming agent responses

Plan diff visualization

JSON schema validation via Zod

Prop-level validation enforcement

Replayable generation history

Model-based planner reactivation

Structured explanation diffs

🎥 Demo Guide

The demo shows:

Initial UI generation

Incremental modification

Rewrite rejection

Explicit regeneration

Version rollback

Explanation updates

🎯 What This Project Demonstrates

Deterministic AI orchestration

Structured agent pipelines

UI system safety

Incremental reasoning

Trustworthy AI design

Engineering judgment under constraints

📎 Setup Instructions
npm install
npm run dev


Open:

http://localhost:3000# AI-Powered-UI-Generator
