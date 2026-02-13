"use client";

import { useState } from "react";
import { runPlanner } from "@/lib/agent/planner";
import { runExplainer } from "@/lib/agent/explainer";
import { renderPlan } from "@/lib/agent/renderer";
import { UIPlan } from "@/lib/agent/schema";

export default function Home() {
  const [input, setInput] = useState("");
  const [plan, setPlan] = useState<UIPlan | null>(null);
  const [versions, setVersions] = useState<UIPlan[]>([]);
  const [explanation, setExplanation] = useState<string>("");

  async function handleGenerate() {
  try {
    const previousPlan = plan;

    const newPlan = await runPlanner(input, plan ?? undefined);
    const explain = await runExplainer(input, previousPlan, newPlan);

    setPlan(newPlan);
    setExplanation(explain);
    setVersions((prev) => [...prev, newPlan]);

    setInput(""); // 👈 Clear textarea
  } catch (error: any) {
    setExplanation(error.message || "Something went wrong.");
  }

}
  function handleRollback(index: number) {
    const selected = versions[index];
    setPlan(selected);
  }

  return (
  <div
    style={{
      display: "flex",
      height: "100vh",
      fontFamily: "Inter, system-ui, sans-serif",
      backgroundColor: "#f9fafb",
    }}
  >
    {/* LEFT PANEL */}
    <div
      style={{
        width: "30%",
        borderRight: "1px solid #e5e7eb",
        padding: "24px",
        backgroundColor: "#ffffff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "16px" }}>AI Chat</h2>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Describe your UI..."
        style={{
          height: "120px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          marginBottom: "12px",
          resize: "none",
          fontSize: "14px",
        }}
      />

      <button
        onClick={handleGenerate}
        style={{
          padding: "10px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#111827",
          color: "white",
          fontWeight: 500,
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Generate
      </button>

      <h3 style={{ marginBottom: "8px" }}>Versions</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {versions.map((_, index) => (
          <button
            key={index}
            onClick={() => handleRollback(index)}
            style={{
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              backgroundColor: "#f3f4f6",
              cursor: "pointer",
            }}
          >
            Version {index + 1}
          </button>
        ))}
      </div>
    </div>

    {/* RIGHT PANEL */}
    <div
      style={{
        width: "70%",
        padding: "32px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ marginBottom: "12px" }}>Generated Plan (JSON)</h2>

      <pre
        style={{
          background: "#111827",
          color: "#f9fafb",
          padding: "16px",
          borderRadius: "8px",
          height: "200px",
          overflow: "auto",
          fontSize: "12px",
          marginBottom: "24px",
        }}
      >
        {plan ? JSON.stringify(plan, null, 2) : "No plan yet"}
      </pre>

      <h2 style={{ marginBottom: "12px" }}>Explanation</h2>

      <div
        style={{
          background: "#eef2ff",
          padding: "16px",
          borderRadius: "8px",
          marginBottom: "32px",
          fontSize: "14px",
        }}
      >
        {explanation || "No explanation yet"}
      </div>

      <h2 style={{ marginBottom: "16px" }}>Live Preview</h2>

      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "24px",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          minHeight: "200px",
        }}
      >
        {plan && renderPlan(plan)}
      </div>
    </div>
  </div>
);

}
