import { connectToDatabase } from "@/lib/mongodb"; // Ensure this function uses Mongoose
import Customer from "@/models/customers"; // Adjust path as necessary
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const isValidPhoneNumber = (number: string) => {
        const phoneRegex = /^\d{10}$/; 
        return phoneRegex.test(number);
    };
    
    try {
        const body = await req.json();
        await connectToDatabase(); // Ensure Mongoose connection is established

        const { phoneNumber } = body;

        if (!phoneNumber) {
            return NextResponse.json(
                { message: "Number is not found" },
                { status: 404 }
            );
        }

        // Validate the phone number
        if (!isValidPhoneNumber(phoneNumber)) {
            return NextResponse.json(
                {
                    error: "Invalid phone number format. Please provide a valid 10-digit number.",
                },
                { status: 400 }
            );
        }

        // Check if the phone number already exists
        const existingUser = await Customer.findOne({ phoneNumber });
        if (existingUser) {
            return NextResponse.json(
                {
                    error: "Phone number already exists.",
                },
                { status: 400 }
            );
        }

        // Insert the phone number into the database using Mongoose
        const newCustomer = new Customer({ phoneNumber });
        const result = await newCustomer.save(); // Save the new customer to the database

        return NextResponse.json(
            { message: "User added successfully", result },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error during request:", error); // Log the error for debugging

        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
