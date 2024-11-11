import { connectToDatabase } from "@/lib/mongodb"; // Utility function for connecting to DB
import HotelModel from "@/models/hotel"; // Centralized hotel metadata model
import { createUserModel } from "@/models/user"; // User model for the hotel
import bcrypt from "bcryptjs"; // To compare password hashes
import generateTokens from "@/utils/generateTokens"; // For token generation
import { sendSuccessResponse } from "@/utils/responseHandler";
import { AppError, handleAppError } from "@/utils/errorHandler";

export async function POST(req: Request) {
  try {
    await connectToDatabase(); 
    const { email, password } = await req.json();

    const hotelMetadata = await HotelModel.findOne({ email });

    if (!hotelMetadata) {
      throw new AppError(404, "Hotel not found.");
    }

    // Step 2: Get the dbName of the hotel from metadata
    const { dbName } = hotelMetadata;

    // Step 3: Connect to the hotel-specific database dynamically
 // Connect to the hotel-specific DB

    // Step 4: Create a dynamic user model for the hotel-specific database
    const User = createUserModel(dbName);

    // Step 5: Find the user in the hotel-specific database
    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(404, "User not found.");
    }

    // Step 6: Check if the provided password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, "Invalid Credentials");
    }

    // Step 7: Generate a token for the user
    const token = generateTokens({ id: user._id.toString(), email, dbName });

    // Return success response with the token
    return sendSuccessResponse(200, { message: "Login successful", token });

  } catch (error) {
    return handleAppError(error); // Error handling
  }
}
