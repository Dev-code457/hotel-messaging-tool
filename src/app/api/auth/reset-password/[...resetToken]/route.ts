import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import crypto from "crypto";

export async function PUT(req: Request, { params }: { params: { resetToken: string[] } }) {
  try {
    await connectToDatabase();

    // Parse the request body
    const { password, confirmPassword } = await req.json();

    // Validate passwords
    if (!password || !confirmPassword) {
      return NextResponse.json(
        { message: "Both password fields are required." },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { message: "Passwords do not match." },
        { status: 400 }
      );
    }

    // Get the token from the URL params
    const token = params.resetToken.join('/'); // Join the array to form the full token if necessary

    // Hash the reset token for comparison
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    // Find the user with matching reset token and valid expiry date
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }, // Ensure token has not expired
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    // Update the user's password and remove the reset token fields
    user.password = password; // Ensure you hash the password before saving
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successful." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during password reset:", error);
    return NextResponse.json(
      { message: "Internal Server Error." },
      { status: 500 }
    );
  }
}
