import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";

export async function PUT(req: Request) {
    await connectToDatabase();

    const { email, password, confirmPassword } = await req.json();

    if (!(email && password && confirmPassword)) {
        return NextResponse.json(
            { message: "All fields are mandatory." },
            { status: 400 }
        );
    }

    if (password !== confirmPassword) {
        return NextResponse.json(
            { message: "Confirm Password Must Be Same As Password" },
            { status: 400 }
        );
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User Not Found" }, { status: 404 });
        }

        user.password = password;
        await user.save();

        return NextResponse.json(
            { message: "Password Reset Successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error during password reset:", error);
        return NextResponse.json(
            { message: "Internal server error." },
            { status: 500 }
        );
    }
}
