import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // Import bcrypt for hashing passwords
import { AppError } from "@/utils/errorHandler"; // Import your AppError class
import { validatePasswords } from "@/validators/index"; // Import your validator

export async function PUT(req: Request, { params }: { params: { resetToken: string[] } }) {
  try {


    const { password, confirmPassword, hotelName, email } = await req.json();
    await connectToDatabase(hotelName);
    const User = createUserModel(hotelName)

    const validationErrors = validatePasswords(password, confirmPassword);
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }

    // Construct reset token
    const token = params.resetToken.join('/');
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");


    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError(400, "Invalid or expired token.");
    }

    // Hash the new password before saving
    user.password = password; // Use a salt round of 12
    console.log("New hashed password:", user.password);

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful." },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error during password reset:", error);
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = error instanceof AppError ? error.message : "Internal Server Error.";
    return NextResponse.json({ message }, { status: statusCode });
  }
}
