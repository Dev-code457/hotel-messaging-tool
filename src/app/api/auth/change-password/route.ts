import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import jwt, { JwtPayload } from "jsonwebtoken";
import { validatePasswordInput } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import { createUserModel } from "@/models/user";

export async function PUT(req: Request) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new AppError(401, "No token found. Authentication failed.");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }

    let params: JwtPayload | undefined;
    try {
      params = jwt.verify(token, secret) as JwtPayload;
    } catch (error) {
      throw new AppError(401, "Invalid token. Authentication failed.");
    }

    const hotelName = params?.params?.hotelName;
    const userId = params?.params?.id;
    await connectToDatabase(hotelName); // Connect to database once
    const User = createUserModel(hotelName);

    const body = await req.json();
    const { password, newPassword } = body;

    const validationErrors = validatePasswordInput({ password, newPassword });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
      throw new AppError(401, "Current password is invalid.");
    }

    user.password = newPassword;
    await user.save();

    return sendSuccessResponse(200, {
      message: "Password reset successfully!"
    });
  } catch (error: any) {
    console.error("Error during password reset:", error);
    return sendErrorResponse(error.statusCode || 500, error.message || "An error occurred");
  }
}
