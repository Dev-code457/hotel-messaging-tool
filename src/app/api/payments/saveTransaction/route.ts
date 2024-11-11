import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import { AppError } from "@/utils/errorHandler";
import { sendErrorResponse, sendSuccessResponse } from "@/utils/responseHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function PUT(req: Request) {
    try {

        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("no token found")
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
        }
        let params;

        if (token) {
            params = jwt.verify(token, secret) as JwtPayload
        }

        const id = params?.params?.id
        console.log(id)
        const hotelID = params?.params?.hotelID
        connectToDatabase(hotelID)

        const body = await req.json();
        const { paymentData } = body;

        const User = createUserModel(hotelID)
        const user = await User.findOne({ _id: id });
        console.log(user, "knsadjnfjpjnasdkojfjnasdjklfjsdklja");

        if (!user) {
            return sendErrorResponse(404, "User not found");
        }
        user.transaction = paymentData; // Update the transaction in memory
        console.log(user);

        await user.save(); // Save the updated user
        return sendSuccessResponse(200, user);

    } catch (error: unknown) {
        console.error("Error during fecthing Hotel Details:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred");
    }
}
