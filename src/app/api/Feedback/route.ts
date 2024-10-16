// app/api/feedback/route.ts
import { connectToDatabase } from "@/lib/mongodb";
import Feedback from "@/models/feedback";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";
import rateLimit from "@/utils/rateLimiter";
import { validateFeedbackInput } from "@/validators";

const limiter = rateLimit(5, 15 * 60 * 1000);

export async function POST(req: Request) {
    try {
      
        limiter(req);

        await connectToDatabase();


        const feedbackData = await req.json();

        


        const errors = validateFeedbackInput(feedbackData?.feedback);
        if (errors) {
          throw new  AppError(400, errors)
        }

   
        const userFeedback = new Feedback({ feedback: feedbackData.feedback });
        await userFeedback.save();


        return sendSuccessResponse(201, { message: "Thank you for your feedback 🙏" });

    } catch (error) {
        return handleAppError(error);
    }
}
