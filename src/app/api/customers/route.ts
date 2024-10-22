import { validateCustomerPhoneNumber } from "@/validators/index";
import { AppError } from "@/utils/errorHandler";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import { createCustomersModel } from "@/models/customers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { phoneNumber, name, email } = body;
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("no token found")}

        const secret = process.env.JWT_SECRET;
        let params;

        if (token) {
            params = jwt.verify(token, secret) as JwtPayload
        }

        const hotelName = params?.params?.hotelName
        connectToDatabase(hotelName)
        const Customer = createCustomersModel(hotelName)



        const validationErrors = validateCustomerPhoneNumber({ phoneNumber });
        if (validationErrors.length > 0) {
            throw new AppError(400, validationErrors.join(", "));
        }
        const existingNumber = await Customer.findOne({ phoneNumber: phoneNumber });

        if (existingNumber) {
            throw new AppError(400, "This number is already exist");
        }
        try {

            const newCustomer = new Customer({ phoneNumber, name, email });
            await newCustomer.save();

            return sendSuccessResponse(200, {
                message: "Customer saved successfully",
            });

        } catch (error) {
            console.error(`Error saving customer`, error);
            throw new AppError(500, `Failed to save customer`);
        }

    } catch (error: unknown) {
        console.error("Error during saving customer:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }

        return sendErrorResponse(500, "An unknown error occurred");
    }
}
