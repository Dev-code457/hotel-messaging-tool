import { NextResponse } from "next/server";

const isValidPhoneNumber = (number: string) => {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(number);
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      return NextResponse.json(
        {
          error:
            "Invalid phone number format. Please provide a valid 10-digit number.",
        },
        { status: 400 }
      );
    }

    const requestBody = {
      messaging_product: "whatsapp",
      to: `91${phoneNumber}`,
      type: "template",
      template: {
        name: "checkin",
        language: {
          code: "en",
        },
      },
    };

    // Make the API request to Facebook Graph API
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
      return NextResponse.json(
        { error: responseData.error || "Failed to send message." },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully", data: responseData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error during bulk messaging:", error);

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
