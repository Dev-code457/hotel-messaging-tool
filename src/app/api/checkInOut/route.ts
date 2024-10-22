import { validateCustomerPhoneNumber } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendWhatsAppMessage } from "@/utils/whatsappApi";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import Customer from "@/models/customers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { phoneNumber, messageType,wantToSave } = body;

    const validationErrors = validateCustomerPhoneNumber({ phoneNumber });
    if (validationErrors.length > 0) {
      throw new AppError(400, validationErrors.join(", "));
    }
    try {
      await sendWhatsAppMessage(phoneNumber, messageType);
      if(wantToSave){
        const newCustomer = new Customer({ phoneNumber});
        await newCustomer.save();
      }
      return sendSuccessResponse(200, {
        message: `Message is sent successfully to this ${phoneNumber} Number `,
      });
    } catch (error) {
      console.error(`Error sending message to ${phoneNumber}:`, error);
      throw new AppError(500, `Failed to send message to ${phoneNumber}`);
    }

  } catch (error: unknown) {
    console.error("Error during bulk messaging:", error);
    if (error instanceof AppError) {
      return sendErrorResponse(error.statusCode, error.message);
    }

    return sendErrorResponse(500, "An unknown error occurred");
  }
}
