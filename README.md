# AI Powered UI Generator

An intelligent UI generation system that converts natural language prompts into structured and responsive frontend layouts using AI-driven planning, schema validation, and dynamic rendering.

## Live Demo

https://ai-powered-ui-generator.vercel.app/

---

# Features

- AI-based UI generation from text prompts
- Intelligent planner and explainer agents
- Dynamic component rendering
- Reusable UI component system
- Schema validation for generated layouts
- Diff-based UI updates
- Responsive design support
- Type-safe development using TypeScript

---

# Tech Stack

## Frontend
- Next.js 14
- React
- TypeScript
- Tailwind CSS

## Backend / AI Logic
- Next.js API Routes
- AI Planning Engine
- Schema Validation
- Dynamic Rendering System

## Deployment
- Render

---

# Project Structure

```bash
app/
 ├── api/
 │    ├── explainer/
 │    └── planner/
 │
 ├── components/ui/
 │    ├── Button.tsx
 │    ├── Card.tsx
 │    ├── Chart.tsx
 │    ├── Input.tsx
 │    ├── Modal.tsx
 │    ├── Navbar.tsx
 │    ├── Sidebar.tsx
 │    └── Table.tsx
 │
 ├── lib/agent/
 │    ├── componentMap.ts
 │    ├── diff.ts
 │    ├── explainer.ts
 │    ├── planner.ts
 │    ├── renderer.tsx
 │    ├── schema.ts
 │    └── validator.ts
```

---

# Architecture Overview

1. User submits a natural language prompt.
2. Planner agent analyzes UI requirements.
3. Explainer agent structures the component flow.
4. Schema validator verifies generated layouts.
5. Renderer dynamically generates UI components.
6. Responsive frontend is rendered in real time.

---

# API Endpoints

## Generate UI Plan

```http
POST /api/planner
```

### Request Body

```json
{
  "prompt": "Create a dashboard with sidebar and analytics cards"
}
```

---

## Explain Generated Layout

```http
POST /api/explainer
```

### Request Body

```json
{
  "layout": {}
}
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/ai-powered-ui-generator.git
```

## Navigate to Project

```bash
cd ai-powered-ui-generator
```

## Install Dependencies

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# Environment Variables

Create a `.env.local` file:

```env
OPENAI_API_KEY=your_api_key
```

---

# Future Improvements

- Drag and drop editor
- Real-time collaborative editing
- Multi-theme support
- Export generated UI as React code
- Authentication system
- Database persistence
- Figma integration

---

# Learning Outcomes

This project helped me understand:

- AI-assisted frontend engineering
- Dynamic rendering systems
- Schema validation
- Modular architecture
- Component abstraction
- API route handling in Next.js
- Scalable frontend design patterns

---

# Author

Harshit Gupta

- MERN Stack Developer
- Open Source Contributor
- DSA in Java
- GSoC 2026 Aspirant
