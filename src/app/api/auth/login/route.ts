import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import generateTokens from "@/utils/generateTokens";
import { validateLoginInput } from "@/validators/index";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";
import rateLimit from "@/utils/rateLimiter";

const limiter = rateLimit(5, 15 * 60 * 1000);

export async function POST(req: Request) {
  try {
    limiter(req);
    const { email, password, hotelName="dev's" } = await req.json();
    await connectToDatabase(hotelName);
    const User = createUserModel(hotelName);

    const validateError = validateLoginInput({ email, password });
    if (validateError) {
      throw new AppError(400, validateError);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
      throw new AppError(401, "Invalid Password");
    }

    const token = generateTokens({ id: user._id.toString(), hotelName: hotelName });

    return sendSuccessResponse(200, { message: "Login Successful", token });
  } catch (error) {
    return handleAppError(error);
  }
}
