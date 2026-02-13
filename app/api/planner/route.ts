import { NextResponse } from "next/server";
import { validatePlan } from "@/lib/agent/validator";
import { isFullRewrite } from "@/lib/agent/diff";

export async function POST(req: Request) {
  try {
    const { userMessage, existingPlan } = await req.json();
    const lower = userMessage.toLowerCase();

    let plan;

    // 🟢 Create dashboard
    if (lower.includes("dashboard")) {
      plan = {
        root: [
          {
            id: "1",
            type: "Card",
            props: { title: "Dashboard" },
            children: [
              {
                id: "2",
                type: "Button",
                props: { label: "Save", variant: "primary" },
              },
            ],
          },
        ],
      };
    }

    // 🟢 Add button incrementally
    else if (lower.includes("add") && lower.includes("button") && existingPlan) {
      const firstNode = existingPlan.root[0];

      plan = {
        root: [
          {
            ...firstNode,
            children: [
              ...(firstNode.children || []),
              {
                id: Date.now().toString(),
                type: "Button",
                props: {
                  label: "New Button",
                  variant: "secondary",
                },
              },
            ],
          },
        ],
      };
    }

    // 🟢 Make minimal
    else if (lower.includes("minimal") && existingPlan) {
      const firstNode = existingPlan.root[0];

      plan = {
        root: [
          {
            ...firstNode,
            children: (firstNode.children || []).slice(0, 1),
          },
        ],
      };
    }

    // 🟢 Default fallback
    else {
      plan = {
        root: [
          {
            id: "1",
            type: "Card",
            props: { title: "Generated Card" },
            children: [],
          },
        ],
      };
    }

    // ✅ VALIDATION
    if (!validatePlan(plan)) {
      return NextResponse.json(
        { error: "Invalid plan generated." },
        { status: 400 }
      );
    }

    // 🔒 FULL REWRITE PROTECTION
    const explicitRewrite =
      lower.includes("regenerate") ||
      lower.includes("rewrite") ||
      lower.includes("start over");

    if (isFullRewrite(existingPlan ?? null, plan) && !explicitRewrite) {
      return NextResponse.json(
        {
          error:
            "Full rewrite detected. Use 'regenerate' to rewrite entire UI.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(plan);
  } catch (error) {
    console.error("Mock planner error:", error);
    return NextResponse.json(
      { error: "Planner failed." },
      { status: 500 }
    );
  }
}
