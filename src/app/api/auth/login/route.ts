import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import generateTokens from "@/utils/generateTokens";
import { validateLoginInput } from "@/validators/index";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";
import rateLimit from "@/utils/rateLimiter";
import jwt, { JwtPayload } from "jsonwebtoken";


const limiter = rateLimit(5, 15 * 60 * 1000);

export async function POST(req: Request) {
  try {
    limiter(req);
    const { email, password, hotelName } = await req.json();

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


    const hotelID = params?.params?.hotelID
    connectToDatabase(hotelName)
    const User = createUserModel(hotelID)

    const validateError = validateLoginInput({ email, password });
    if (validateError) {
      throw new AppError(400, validateError);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(404, "User Not Found");
    }

    const isValidPassword = await user.matchPassword(password);
    console.log("Entered password:", password);
    console.log("Stored hashed password:", user.password);
    console.log("Is valid password:", isValidPassword);


    if (!isValidPassword) {
      throw new AppError(401, "Invalid Password");
    }


    const accessToken = generateTokens({ id: user._id.toString(), hotelID: hotelID });

    return sendSuccessResponse(200, { message: "Login Successful", token: accessToken });
  } catch (error) {
    return handleAppError(error);
  }
}
