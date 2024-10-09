// routes/api/auth/signup.ts
import { NextResponse } from "next/server";
import { createUser } from "@/services/userService";
import { validateUserInput } from "@/utils/validator";
import { BadRequestError, ConflictError } from "@/utils/errors";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    validateUserInput(email, password); 

    const user = await createUser(email, password);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error: any) {
    let status = 500;
    let message = "Internal server error.";

    if (error instanceof BadRequestError) {
      status = 400;
      message = error.message;
    } else if (error instanceof ConflictError) {
      status = 422;
      message = error.message;
    }

    console.error("Error during user creation:", error);
    return NextResponse.json({ message }, { status });
  }
}
