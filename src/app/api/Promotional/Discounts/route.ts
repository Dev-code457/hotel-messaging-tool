import { NextResponse } from "next/server";
import { createCustomersModel } from "@/models/customers";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { validateCustomerInput } from "@/validators/index";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  console.log("POST request started");

  try {

    await connectToDatabase();
    console.log("Database connected");

    const body = await req.json();
    console.log("Request body:", body);

    const { ownerHotelName, discount, phoneNumber, address, sliderValue } = body;
    const validationErrors = validateCustomerInput({ ownerHotelName, discount, phoneNumber, address, sliderValue });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }


    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    console.log("Authorization token:", token);

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT Secret is not defined");
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }

    let params;
    if (token) {
      console.log("Verifying JWT token...");
      params = jwt.verify(token, secret) as JwtPayload;
      console.log("Decoded JWT params:", params);
    } else {
      console.warn("No token provided, skipping JWT verification");
    }

    const hotelName = params?.params?.dbName;
    console.log("Hotel name from token:", hotelName);

    console.log("Validating customer input...");




    console.log("Creating customer model for hotel:", hotelName);
    const Customer = createCustomersModel(hotelName);

    console.log("Fetching customers...");
    const customers = await Customer.find({});
    console.log("Customers fetched:", customers.length, "customers found");

    if (!customers || customers.length === 0) {
      console.error("No customers found");
      throw new AppError(404, "No customers found");
    }

    console.log("Shuffling customers...");
    const shuffledCustomers = customers.sort(() => 0.5 - Math.random());
    console.log("Shuffled customers:", shuffledCustomers.length);

    console.log(`Selecting ${sliderValue} customers...`);
    const selectedCustomers = shuffledCustomers.slice(0, sliderValue);
    console.log("Selected customers:", selectedCustomers.map(c => c.phoneNumber));

    const sendPromises = selectedCustomers.map(async (customer) => {
      console.log(`Preparing message for customer: ${customer.phoneNumber}`);

      const parameters = [
        { type: "TEXT", text: discount },
        { type: "TEXT", text: hotelName },
        { type: "TEXT", text: phoneNumber },
        { type: "TEXT", text: address },
      ];

      try {
        console.log(`Sending WhatsApp message to ${customer.phoneNumber}...`);
        await sendWhatsAppMessage(customer.phoneNumber, "event_rsvp_reminder_2", parameters);
        console.log(`Message sent successfully to ${customer.phoneNumber}`);
        return { success: true, phoneNumber: customer.phoneNumber };
      } catch (error) {
        console.error(`Error sending message to ${customer.phoneNumber}:`, error);
        throw new AppError(500, `Failed to send message to ${customer.phoneNumber}`);
      }
    });

    console.log("Waiting for all send promises to resolve...");
    await Promise.all(sendPromises);

    console.log("Messages sent successfully to all selected users");
    return sendSuccessResponse(200, {
      message: `Message is sent successfully to ${sliderValue} users`,
    });

  } catch (error: any) {
    console.error("Error occurred:", error);
    return handleAppError(error);
  }
}
