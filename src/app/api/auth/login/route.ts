// routes/api/auth/login.ts
import { NextResponse } from "next/server";
import { loginUser } from "@/services/authService";
import { BadRequestError, NotFoundError, UnauthorizedError } from "@/utils/errors";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!(email && password)) {
      throw new BadRequestError("All fields are mandatory.");
    }

    const { user, token } = await loginUser(email, password); // Login user

    return NextResponse.json(
      { message: "Login Successful", token, user: { email: user.email } }, // Optionally return user data
      { status: 200 }
    );
  } catch (error: any) {
    let status = 500;
    let message = "Internal server error.";

    if (error instanceof BadRequestError) {
      status = 400;
      message = error.message;
    } else if (error instanceof NotFoundError) {
      status = 404;
      message = error.message;
    } else if (error instanceof UnauthorizedError) {
      status = 401;
      message = error.message;
    }

    console.error("Error during login:", error);
    return NextResponse.json({ message }, { status });
  }
}
