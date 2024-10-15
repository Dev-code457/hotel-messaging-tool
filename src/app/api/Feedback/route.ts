import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Feedback from "@/models/feedback";

export async function POST(req: Request) {
  await connectToDatabase();
  const feedback = await req.json();
console.log(typeof feedback,"knfsjdnflsdfnsdfnls");

  try {
    if (!feedback) {
      return NextResponse.json(
        { message: "Feedback is required" },
        { status: 404 }
      );
    }
    const userFeedback = await new Feedback(feedback)
    await userFeedback.save();
  } catch (error) {
    console.log("error: ", error);

    return NextResponse.json({ error: error }, { status: 500 });
  }
}
