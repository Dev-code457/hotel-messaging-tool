import { NextResponse } from "next/server";

export function sendSuccessResponse(statusCode: number, data: object) {
  return NextResponse.json(data, { status: statusCode })
}

export function sendErrorResponse(statusCode: number, message: string) {
  return NextResponse.json({ message }, { status: statusCode })
}