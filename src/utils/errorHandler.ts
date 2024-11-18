import { NextResponse } from "next/server";

export class AppError extends Error {
  public statusCode: number;
  public isOperational?: boolean;

  constructor(statusCode: number, message: string, isOperational?: true) {
    super(message)
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor)
  }
}

export function handleAppError(error: unknown) {
  if (error instanceof AppError) {
    return NextResponse.json({ message: error.message }, { status: error.statusCode })
  }

  if (process.env.NODE_ENV === "development") {

  }
  return NextResponse.json(
    { message: "Internal server error" }, { status: 500 }
  )
}