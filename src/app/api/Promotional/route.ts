import { connectToDatabase } from "@/lib/mongodb"; // Ensure this function returns a MongoDB client
import { NextResponse } from "next/server";
import Customer from "@/models/customers"; // Ensure this path is correct

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messageType } = body; // Extracting messageType from the request body

    // Check if messageType is provided
    if (!messageType) {
      return NextResponse.json(
        { error: "messageType is required" },
        { status: 400 }
      );
    }

    await connectToDatabase(); // Establish connection to MongoDB

    // Fetch customers from the database using Mongoose model
    const customers = await Customer.find({}); // Use the Customer model to find customers

    // Handle case when no customers are found
    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { error: "No customers found" },
        { status: 404 }
      );
    }

    // Prepare sending messages
    const sendPromises = customers.map(async (customer: any) => {
      const requestBody = {
        messaging_product: "whatsapp",
        to: `91${customer.phoneNumber}`,
        type: "template",
        template: {
          name: String(messageType),
          language: {
            code: "en",
          },
        },
      };

      try {
        const response = await fetch(
          `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_BUSINESS_ID}/messages`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${process.env.FACEBOOK_ACCESS_TOKEN}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBody),
          }
        );

        const responseData = await response.json();

        // Check if the response is not OK
        if (!response.ok) {
          console.error(
            `Failed to send message to ${customer.phoneNumber}:`,
            responseData.error
          );
          throw new Error(responseData.error?.message || "Unknown error");
        }

        return responseData; // Return the successful response
      } catch (error) {
        console.error(
          `Error sending message to ${customer.phoneNumber}:`,
          error
        );
        throw error; // Re-throw the error to be caught in the outer catch block
      }
    });

    // Wait for all messages to be sent
    await Promise.all(sendPromises);

    return NextResponse.json(
      {
        message: `Messages sent successfully`,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error during bulk messaging:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
