import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb"; // Adjust path as necessary
import User from "@/models/user"; // Adjust path as necessary

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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 422 }
            );
        }

        const user = new User({ email, password });
        await user.save(); 

        return NextResponse.json({ user }, { status: 201 });
    } catch (error) {
        console.error("Error during user creation:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
