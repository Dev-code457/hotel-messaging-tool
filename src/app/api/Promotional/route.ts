import { connectToDatabase } from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Customer from "@/models/customers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { hotelName, discount, phoneNumber, address, sliderValue } = body;

    if (!hotelName || !discount || !phoneNumber || !address || !sliderValue) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Connect to the database
    await connectToDatabase();

    // Fetch all customers from the database
    const customers = await Customer.find({});

    if (!customers || customers.length === 0) {
      return NextResponse.json(
        { error: "No customers found" },
        { status: 404 }
      );
    }

    // Shuffle customers array to randomize
    const shuffledCustomers = customers.sort(() => 0.5 - Math.random());

    // Limit the number of customers based on sliderValue
    const selectedCustomers = shuffledCustomers.slice(0, sliderValue);

    const sendPromises = selectedCustomers.map(async (customer: any) => {
      const requestBody = {
        messaging_product: "whatsapp",
        to: `91${customer.phoneNumber}`,
        type: "template",
        template: {
          name: "event_rsvp_reminder_2", // Replace with actual template name
          language: {
            code: "en",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "TEXT",
                  text: discount, // Add your dynamic message here
                },
                {
                  type: "TEXT",
                  text: hotelName, // Add your dynamic message here
                },
                {
                  type: "TEXT",
                  text: phoneNumber, // Add your dynamic message here
                },
                {
                  type: "TEXT",
                  text: address, // Add your dynamic message here
                },
              ],
            },
          ],
        },
      };

      try {
        // Send the request to WhatsApp Business API
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

    // Wait for all messages to be sent
    await Promise.all(sendPromises);

    return NextResponse.json(
      {
        message: `Messages sent successfully to ${sliderValue} users`,
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
