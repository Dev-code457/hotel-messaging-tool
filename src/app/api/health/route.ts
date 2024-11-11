// app/api/health/route.js (or route.ts for TypeScript)
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ status: "OK" }, { status: 200 });

}
