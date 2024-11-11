// /pages/api/activatePlan.js

import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user"; // Adjust import path as necessary
import { AppError } from "@/utils/errorHandler";
import { sendSuccessResponse, sendErrorResponse } from "@/utils/responseHandler";
import jwt, { JwtPayload } from "jsonwebtoken";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { planDetails } = body;
console.log(planDetails);

        if (!planDetails) {
            throw new AppError(400, "Missing required fields: userId or planDetails");
        }

        // Extract and verify JWT token
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            throw new AppError(401, "Authorization token missing");
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new AppError(500, "Internal Server Error: JWT Secret is not defined");
        }

        // Decode token to get hotelID
        const decodedToken = jwt.verify(token, secret) as JwtPayload;
        const hotelID = decodedToken?.params?.hotelID;
        const userId = decodedToken?.params?.id;
        if (!hotelID) {
            throw new AppError(400, "Hotel ID missing in token");
        }

        // Connect to database and create User model based on hotelID
        await connectToDatabase(hotelID);
        const User = createUserModel(hotelID);

        // Find the user and update plan details
        const user = await User.findById(userId);
        if (!user) {
            throw new AppError(404, "User not found");
        }

        // Update user's plan details
        user.planType = planDetails.planType;
        user.messageLimit = planDetails.messageLimit;
        user.customerLimit = planDetails.customerLimit;
        user.templates = planDetails.templates;


        await user.save();

        // Respond with success message
        return sendSuccessResponse(200, { message: "Plan activated successfully" });
    } catch (error) {
        console.error("Error activating plan:", error);
        if (error instanceof AppError) {
            return sendErrorResponse(error.statusCode, error.message);
        }
        return sendErrorResponse(500, "An unknown error occurred while activating the plan");
    }
}
