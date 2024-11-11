
import { NextResponse } from "next/server";
import { createCustomersModel } from "@/models/customers";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { validateCustomerInput } from "@/validators/index";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendSuccessResponse } from "@/utils/responseHandler";
import jwt, { JwtPayload } from 'jsonwebtoken'
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {


    const body = await req.json();
    const { ownerHotelName, discount, phoneNumber, address, sliderValue } = body;
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }
   
    let params;

    if (token) {
      params = jwt.verify(token, secret) as JwtPayload
    }

    const hotelName = params?.params?.hotelName
    connectToDatabase(hotelName)

    const validationErrors = validateCustomerInput({ ownerHotelName, discount, phoneNumber, address, sliderValue });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }
    const Customer = createCustomersModel(hotelName)
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
