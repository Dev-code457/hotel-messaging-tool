import { validateCustomerPhoneNumber } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import { createCustomersModel } from "@/models/customers";
import { connectToDatabase } from "@/lib/mongodb";
import { JwtPayload } from "jsonwebtoken";
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, messageType, isPromotionalList } = body;
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    
    if (!token) {
      console.log("No token found");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }
    
    let params;
    if (token) {
      params = jwt.verify(token, secret) as JwtPayload;
    }

    const hotelName = params?.params?.hotelName;
    await connectToDatabase(hotelName);
    const Customer = createCustomersModel(hotelName);

    const validationErrors = validateCustomerPhoneNumber({ phoneNumber });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }

    // Send the WhatsApp message regardless of whether the phone number exists
    await sendWhatsAppMessage(phoneNumber, messageType);

    // Check if the phone number exists in the database
    const phoneNumberExists = await Customer.findOne({ phoneNumber });

    if (isPromotionalList) {
      if (phoneNumberExists) {
        // If the phone number exists, return a specific response
        return sendSuccessResponse(200, {
          message: `Message is sent to ${phoneNumber}, but the number already exists in the promotional list.`,
        });
      } else {
        // If the phone number does not exist, save it as a new customer
        const newCustomer = new Customer({ phoneNumber });
        await newCustomer.save();
        return sendSuccessResponse(200, {
          message: `Message is sent and ${phoneNumber} has been added to the promotional list.`,
        });
      }
    }

    // If the promotional list option is not selected, just return a success message
    return sendSuccessResponse(200, {
      message: `Message is sent successfully to ${phoneNumber}.`,
    });

  } catch (error: unknown) {
    console.error("Error during bulk messaging:", error);
    if (error instanceof AppError) {
      return sendErrorResponse(error.statusCode, error.message);
    }

    return sendErrorResponse(500, "An unknown error occurred");
  }
}
