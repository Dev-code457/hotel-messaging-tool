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
    await connectToDatabase();
    const body = await req.json();
    const { phoneNumber, messageType, isPromotionalList, userSpending } = body;

    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    if (!token) {
      console.log("No token found");
      throw new AppError(401, "Unauthorized access");
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }

    const params = jwt.verify(token, secret) as JwtPayload;
    const hotelID = params?.params?.dbName;
 
    

 
    const Customer = createCustomersModel(hotelID);

    const validationErrors = validateCustomerPhoneNumber({ phoneNumber });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }

    await sendWhatsAppMessage(phoneNumber, messageType);
    const phoneNumberExists = await Customer.findOne({ phoneNumber });

    if (isPromotionalList) {
      if (phoneNumberExists) {
        return sendSuccessResponse(200, {
          message: `Message is sent to ${phoneNumber}, but the number already exists in the promotional list.`,
        });
      } else {
        // Check if userSpending is provided and valid
        if (userSpending) {
          const newCustomer = new Customer({ phoneNumber, userSpending });
          await newCustomer.save();
          return sendSuccessResponse(200, {
            message: `Message is sent and ${phoneNumber} with spending ${userSpending} has been added to the promotional list.`,
          });
        } else {
          throw new AppError(400, "User spending is required to add to promotional list.");
        }
      }
    }

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
