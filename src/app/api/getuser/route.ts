import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import { AppError, handleAppError } from "@/utils/errorHandler";
import { sendSuccessResponse } from "@/utils/responseHandler";


export async function GET(req: Request) {
  interface HotelSignupRequest {
    hotelName: string;
    email: string;
    password: string;
  }

  try {
    const { hotelName, email, password }: HotelSignupRequest = await req.json();
    await connectToDatabase(hotelName);
    const User = createUserModel(hotelName);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, "User already exists");
    }
    const newUser = new User({ email: email, password: password, hotelName });
    await newUser.save();

    return sendSuccessResponse(201, { message: "Hotel and owner registered successfully" });

  } catch (error) {
    return handleAppError(error);
  }
}
