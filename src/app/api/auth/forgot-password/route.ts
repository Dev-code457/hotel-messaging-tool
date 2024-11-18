import { connectToDatabase } from "@/lib/mongodb";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";
import { validateForgot } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import { JwtPayload } from "jsonwebtoken";
import { createUserModel } from "@/models/user";
import jwt from "jsonwebtoken"
import HotelModel from "@/models/hotel";

export async function PUT(req: Request) {


  await connectToDatabase()
  const body = await req.json();
  const { email } = body;
  const hotelMetadata = await HotelModel.findOne({ email });

  if (!hotelMetadata) {
    throw new AppError(404, "User not found.");
  }
  const dbName = hotelMetadata?.dbName;
  const User = createUserModel(dbName)

  const validationError = validateForgot({ email });
  if (validationError.length > 0) {
    throw new AppError(400, validationError.join(", "));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email && !emailRegex.test(email)) {
    throw new AppError(400, "Invalid email format");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await user.save();

    const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
    const protocol = req.headers.get("x-forwarded-proto") || "http";
    const resetUrl = `${protocol}://${host}/ResetPassword/${resetToken}`;

    const message = ` <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6; border-radius: 8px;">
        <h2 style="color: #333;">Password Reset Request</h2>
        <p style="color: #555;">
          You are receiving this email because you (or someone else) have requested the reset of your password.
        </p>
        <p style="color: #555;">
          Please click the link below to reset your password:
        </p>
        <p>
          <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #3483BC; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </p>
        <p style="color: #555;">
          If you did not request this, please ignore this email. Your password will remain unchanged.
        </p>
        <p style="color: #999; font-size: 12px;">
          This link will expire in 10 minutes.
        </p>
      </div>
    ;`

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
      });

      return sendSuccessResponse(200, {
        message: "Password Reset Link Sent Successfully",
      });
    } catch (emailError: any) {
      console.error("Error sending email:", emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return sendErrorResponse(500, emailError);
    }
  } catch (error: any) {
    console.error("Error during password reset:", error.message, error.stack);
    return sendErrorResponse(500, error);
  }
}