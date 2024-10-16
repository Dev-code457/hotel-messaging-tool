import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/user";
import generateTokens from "@/utils/generateTokens";
import {validateLoginInput} from "@/validators/index";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";
import rateLimit from "@/utils/rateLimiter";
const limiter = rateLimit(5, 15 * 60 * 1000);
export async function POST(req: Request) {

  try {
    limiter(req)
    await connectToDatabase();
    const { email, password } = await req.json();
    console.log(email);
    
    const validateError = validateLoginInput({ email, password });
    if (validateError) {
      throw new AppError(400, validateError)
    }
    const user = await User.findOne({ email })
    if (!user) {
      throw new AppError(404, "User Not Found")
    }
    const isValidPassword = await user.matchPassword(password);
    if (!isValidPassword) {
      throw new AppError(401, "Invalid Password")
    }

    const token = generateTokens(user._id.toString());
    return sendSuccessResponse(201, { message: "Login SuccessFull", token })

  } catch (error) {
    return handleAppError(error);
  }
}
