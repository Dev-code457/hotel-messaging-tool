import { connectToDatabase } from "@/lib/mongodb";
import { createUserModel } from "@/models/user";
import { AppError, handleAppError } from "@/utils/errorHandler";
import generateTokens from "@/utils/generateTokens";
import { sendSuccessResponse } from "@/utils/responseHandler";
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  interface HotelSignupRequest {
    hotelName: string;
    email: string;
    password: string;
  }

  try {
    const { hotelName, email, password }: HotelSignupRequest = await req.json();

    // Generate a unique hotel ID
    const hotelID = uuidv4(); 

 await connectToDatabase(hotelID); 

    // Create a User model specific to this hotel using the same hotel ID
    const User = createUserModel(hotelID);

    // Check if the user already exists in the specific hotel context
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, "User already exists");
    }

    // Create a new user with the same hotel ID
    const newUser = new User({ email, password, hotelName, hotelID });
    await newUser.save();

    // Generate tokens for the new user, including the hotel ID
    const token = generateTokens({ id: newUser._id.toString(), hotelID });

    // Send a success response with user details and token
    return sendSuccessResponse(201, {
      message: "Hotel and owner registered successfully",
      User: newUser,
      token: token
    });

  } catch (error) {
    return handleAppError(error);
  }
}
