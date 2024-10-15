import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(req: Request) {
  try {
    // Log the incoming request for debugging
    console.log("Incoming request:", req);

    // Retrieve cookies from the request
    const cookieHeader = req.headers.get("cookie");
    console.log("Cookie header:", cookieHeader);

    // Extract the token from cookies
    const token = cookieHeader
      ?.split("; ")
      .find((row) => row.startsWith("_session="))
      ?.split("=")[1];

    console.log("Extracted token:", token);

    await connectToDatabase();

    // Parse the request body
    const { password, newPassword } = await req.json();

    // Validate passwords
    if (!password || !newPassword) {
      return NextResponse.json(
        { message: "Password and new password are required." },
        { status: 400 }
      );
    }

    if (!token) {
      return NextResponse.json(
        {
          message:
            "Authentication failed, try forgot password instead of change password.",
        },
        { status: 411 }
      );
    }

    const secret = process.env.JWT_SECRET;

    // Check if the secret is defined
    if (!secret) {
      return NextResponse.json(
        { message: "Internal server error: JWT secret not defined." },
        { status: 500 }
      );
    }

    // Verify the token to extract the user ID
    let userId;
    try {
      const decodedToken = jwt.verify(token, secret) as JwtPayload;
      userId = decodedToken.id; // Extract the ID as a string
      console.log("Decoded user ID:", userId);
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }


    user.password = newPassword; 
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
