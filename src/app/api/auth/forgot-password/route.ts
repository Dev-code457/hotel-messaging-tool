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

    // Hash token and set to user fields
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
    await user.save();

    // Create reset URL using req headers (since Next.js `Request` does not support req.protocol or req.get directly)
 const host = req.headers.get("x-forwarded-host") || req.headers.get("host");
const protocol = req.headers.get("x-forwarded-proto") || "http";
const resetUrl = `${protocol}://${host}/api/auth/resetpassword/${resetToken}`;

    const message = `You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

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
      await user.save(); // Clean up the reset token if email sending fails
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
