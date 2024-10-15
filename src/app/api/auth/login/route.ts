  import { NextResponse } from "next/server";
  import { connectToDatabase } from "@/lib/mongodb";
  import User from "@/models/user";
  import generateTokens from "@/utils/generateTokens";

  export async function POST(req: Request) {
    await connectToDatabase();

    const { email, password } = await req.json();

    // Validate input fields
    if (!(email && password)) {
      return NextResponse.json(
        { message: "All fields are mandatory." },
        { status: 400 }
      );
    }

    try {
      // Find the user by email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 });
      }

      // Validate the password
      const isValidPassword = await user.matchPassword(password);
      if (!isValidPassword) {
        return NextResponse.json(
          { message: "Invalid Password" },
          { status: 401 }
        );
      }

      const userId = user._id.toString();

      const token = generateTokens(userId);

      return NextResponse.json(
        { message: "Login Successful", token },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error during user login:", error);
      return NextResponse.json(
        { message: "Internal server error." },
        { status: 500 }
      );
    }
  }
