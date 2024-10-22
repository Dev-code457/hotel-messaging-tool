// app/api/customers/route.ts
import  connectToDatabase  from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Customer from "@/models/customers";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { validateCustomerInput } from "@/validators/index";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendSuccessResponse } from "@/utils/responseHandler";

export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { hotelName, discount, phoneNumber, address, sliderValue } = body;

    const validationErrors = validateCustomerInput({ hotelName, discount, phoneNumber, address, sliderValue });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }

    const customers = await Customer.find({});
    if (!customers || customers.length === 0) {
      throw new AppError(404, "No customers found");
    }

    const shuffledCustomers = customers.sort(() => 0.5 - Math.random());


    const selectedCustomers = shuffledCustomers.slice(0, sliderValue);

    const sendPromises = selectedCustomers.map(async (customer) => {

      const parameters = [
        { type: "TEXT", text: discount },
        { type: "TEXT", text: hotelName },
        { type: "TEXT", text: phoneNumber },
        { type: "TEXT", text: address },
      ];

      try {

        await sendWhatsAppMessage(customer.phoneNumber, "event_rsvp_reminder_2", parameters);
        return { success: true, phoneNumber: customer.phoneNumber };
      } catch (error) {
        console.error(`Error sending message to ${customer.phoneNumber}:`, error);
        throw new AppError(500, `Failed to send message to ${customer.phoneNumber}`);
      }
    });

    await Promise.all(sendPromises);

    return sendSuccessResponse(200, {
      message: `Message is sent successfully to ${sliderValue} users`,
    });

  } catch (error) {
    return handleAppError(error);
  }
}
