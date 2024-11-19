import { connectToDatabase } from "@/lib/mongodb"; // Utility for connecting to DB
import HotelModel from "@/models/hotel"; // Centralized hotel metadata model
import { createUserModel } from "@/models/user"; // User model for the hotel
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs
import generateTokens from "@/utils/generateTokens"; // For token generation
import { sendSuccessResponse } from "@/utils/responseHandler";
import { handleAppError } from "@/utils/errorHandler";

export async function POST(req: Request) {
  try {
    const { hotelName, email, password } = await req.json();
    const hotelID = uuidv4();
    const dbName = `${"GoodPeggTouch".toLowerCase().replace(/\s+/g, "_")}_${hotelID.slice(0, 3)}`;
    await connectToDatabase();


    const User = createUserModel(dbName);

    const existingHotel = await HotelModel.findOne({ email });
    if (existingHotel) throw new Error("Hotel already exists.");


    const newHotel = new HotelModel({
      hotelName,      // Hotel name
      email,          // Hotel email
      dbName,         // Name of the specific database
      hotelID,        // Unique hotel ID
    });
    await newHotel.save();  // This saves the metadata in the centralized DB

    // Step 5: Create a new user in the hotel-specific database
    const newUser = new User({ email, password, hotelName });
    await newUser.save();  // This saves user data in the hotel-specific DB

    // Step 6: Generate a token for the user (e.g., JWT token for authentication)
    const token = generateTokens({ id: newUser._id.toString(), hotelID });

    // Return success response
    return sendSuccessResponse(201, { message: "Signup successful", token });
  } catch (error) {
    console.log(error);

    return handleAppError(error);  // Error handling in case of failures
  }
}
