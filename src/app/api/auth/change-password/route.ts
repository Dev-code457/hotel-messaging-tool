import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validatePasswordInput } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";

export async function PUT(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");
    console.log("Cookie header:", cookieHeader);

    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("_session="))
      ?.split("=")[1];

    await connectToDatabase();
    const body = await req.json();
    const {  password, newPassword } = body;

    const validationErrors = validatePasswordInput({ password, newPassword });

    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "))
    }

    if (!token) {
      throw new AppError(401, "Authentication failed, try forgot password instead of change password.")
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError(401, "Internal Server Error: JWT Secret is not defined")
    }

    let userId;
    try {
      const decodedToken = jwt.verify(token, secret) as JwtPayload;
      userId = decodedToken.id;
    } catch (error: any) {
      throw new AppError(500, error)
    }

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError(404, "User Not Found")
    }

    // Update the user's password
    user.password = newPassword;
    await user.save();

    return sendSuccessResponse(200, {
      message: "Password reset successfully!"
    })
  } catch (error: any) {
    console.error("Error during password reset:", error);
    return sendErrorResponse(500, error)

  }
}
