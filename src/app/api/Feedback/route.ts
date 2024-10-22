// app/api/feedback/route.ts
import { connectToDatabase } from "@/lib/mongodb";

import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";
import rateLimit from "@/utils/rateLimiter";
import { validateFeedbackInput } from "@/validators";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import { createFeedbacksModel } from "@/models/feedback";

const limiter = rateLimit(5, 15 * 60 * 1000);

export async function POST(req: Request) {
    try {

        limiter(req);
        const token = req.headers.get("Authorization")?.replace("Bearer ", "");
        if (!token) {
            console.log("no token found");

        }

        console.log("Yes...........");

        const secret = process.env.JWT_SECRET;
        let params;

        if (token) {
            params = jwt.verify(token, secret) as JwtPayload
        }

        const hotelName = params?.params?.hotelName
        connectToDatabase(hotelName)


        const Feedback = createFeedbacksModel(hotelName)
        const feedbackData = await req.json();




        const errors = validateFeedbackInput(feedbackData?.feedback);
        if (errors) {
            throw new AppError(400, errors)
        }


        const userFeedback = new Feedback({ feedback: feedbackData.feedback });
        await userFeedback.save();


        return sendSuccessResponse(201, { message: "Thank you for your feedback 🙏" });

    } catch (error) {
        return handleAppError(error);
    }
}
