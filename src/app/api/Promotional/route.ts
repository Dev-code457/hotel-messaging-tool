import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {messageType} = body
    console.log(messageType,'nklsafnsdfnsdfn');
    

    const client = await clientPromise;
    const db = client.db("Customers");

    const customers = await db.collection("Customers").find({}).toArray();

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { error: "No customers found" },
        { status: 404 }
      );
    }

    const sendPromises = customers.map(async (customer) => {
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

        if (!response.ok) {
          console.error(
            `Failed to send message to ${customer.phoneNumber}:`,
            responseData.error
          );
          throw new Error(responseData.error?.message || "Unknown error");
        }

        return responseData;
      } catch (error) {
        console.error(
          `Error sending message to ${customer.phoneNumber}:`,
          error
        );
        throw error;
      }
    });

    await Promise.all(sendPromises);

    return NextResponse.json(
      {
        message: `Messages sent successfully`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error during bulk messaging:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
