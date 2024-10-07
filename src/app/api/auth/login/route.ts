import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user"; 
import generateTokens from "@/utils/generateTokens";

export async function POST(req: Request) {
  await connectToDatabase(); 

  const { email, password } = await req.json();

  if (!(email && password)) {
    return NextResponse.json(
      { message: "All fields are mandatory." },
      { status: 400 }
    );
  }

  try {
    const user = await User.findOne({ email });
    const isValidPassword = await user.matchPassword(password);
    console.log(user, "This is my user");

    if (!user) {
      return NextResponse.json({ message: "User Not Found" }, { status: 404 });
    }
    if (!isValidPassword) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 401 }
      );
    }
    const token = generateTokens(user._id);
    await user.save();
    return NextResponse.json(
      { message: "Login Successfull", token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during user creation:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
