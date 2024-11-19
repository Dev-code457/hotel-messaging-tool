import { createCustomersModel } from "@/models/customers";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { validateCustomerInput } from "@/validators/index";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendSuccessResponse } from "@/utils/responseHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    // Step 1: Connect to Database
    await connectToDatabase();

    // Step 2: Parse the request body
    const body = await req.json();
    const { ownerHotelName, date, phoneNumber, address, sliderValue } = body;

    // Step 3: Extract and verify JWT token
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
    }

    let params: JwtPayload | undefined;
    if (token) {
      try {
        params = jwt.verify(token, secret) as JwtPayload;
      } catch (error) {
        throw new AppError(401, "Invalid or expired token");
      }
    }

    // Step 4: Extract hotel name from token payload
    const hotelName = params?.params?.dbName;
    if (!hotelName) {
      throw new AppError(400, "Hotel name is required in the token");
    }

    // Step 5: Validate customer input
    const validationErrors = validateCustomerInput({ ownerHotelName, date, phoneNumber, address, sliderValue });
    if (validationErrors.length > 0) {
      throw new AppError(400, `${validationErrors.join(", ")}`);
    }

    // Step 6: Fetch customers from the database
    const Customer = createCustomersModel(hotelName);
    const customers = await Customer.find({});
    if (!customers || customers.length === 0) {
      throw new AppError(404, "No customers found");
    }

    // Step 7: Shuffle customers and select the required number based on slider value
    const shuffledCustomers = customers.sort(() => 0.5 - Math.random());
    const selectedCustomers = shuffledCustomers.slice(0, sliderValue);

    // Step 8: Send messages to selected customers
    const sendPromises = selectedCustomers.map(async (customer) => {
      const parameters = [
        { type: "TEXT", text: date },
        { type: "TEXT", text: hotelName },
        { type: "TEXT", text: phoneNumber },
        { type: "TEXT", text: address },
      ];

      try {
        // Send WhatsApp message
        await sendWhatsAppMessage(customer.phoneNumber, "event_rsvp_reminder_2", parameters);
        return { success: true, phoneNumber: customer.phoneNumber };
      } catch (error: any) {
        console.error(`Error sending message to ${customer.phoneNumber}:`, error);
        // Provide more details on why the error occurred
        throw new AppError(500, `Failed to send message to ${customer.phoneNumber}: ${error.message}`);
      }
    });

    // Wait for all message sending promises to complete
    await Promise.all(sendPromises);

    // Step 9: Send success response
    return sendSuccessResponse(200, {
      message: `Message is sent successfully to ${sliderValue} users`,
    });

  } catch (error) {
    // Step 10: Log error and return structured error response
    console.error("An error occurred in the POST handler:", error);

    // If error is an instance of AppError, pass it to handleAppError
    if (error instanceof AppError) {
      return handleAppError(error);
    }

    // For unexpected errors, return a general error response
    return handleAppError(new AppError(500, "An unexpected error occurred"));
  }
}
