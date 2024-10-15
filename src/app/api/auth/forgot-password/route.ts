import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import sendEmail from "@/utils/sendEmail";
import crypto from "crypto";

export async function PUT(req: Request) {
  await connectToDatabase();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "All fields are mandatory." },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
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

    const message = `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f6f6f6; border-radius: 8px;">
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
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: "Password Reset Request",
        message,
        
      });

      return NextResponse.json(
        { message: "Password reset email sent successfully." },
        { status: 200 }
      );
    } catch (emailError) {
      console.error("Error sending email:", emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      return NextResponse.json(
        { message: "Failed to send reset email." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
