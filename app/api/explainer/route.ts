import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userMessage, previousPlan, newPlan } = await req.json();

    let explanation = "UI generated based on request.";

    if (!previousPlan) {
      explanation = "Initial UI created based on user description.";
    } else {
      explanation =
        "Existing UI was modified while preserving previous structure. " +
        "Only necessary components were added or adjusted.";
    }

    return NextResponse.json({ explanation });
  } catch (error) {
    console.error("Mock explainer error:", error);
    return NextResponse.json(
      { error: "Explainer failed." },
      { status: 500 }
    );
  }
}
