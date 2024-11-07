import { connectToDatabase } from "@/lib/mongodb";
import HotelModel from "@/models/hotel";
import { createUserModel } from "@/models/user";
import { AppError, handleAppError } from "@/utils/errorHandler";
import generateTokens from "@/utils/generateTokens";
import { sendSuccessResponse } from "@/utils/responseHandler";
import { v4 as uuidv4 } from 'uuid';
import mongoose from "mongoose";

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

    // Connect to the new database// Modify the database name to replace `.` with `#`
    const dbName = email.replace(/\./g, '#');

    // Connect to the new database for the hotel
    await connectToDatabase(dbName);

    // Dynamically create the User model for this hotel
    const User = createUserModel(dbName);

    // Check if the user already exists in the hotel-specific database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError(400, "User already exists");
    }

    // Create a new user for the hotel
    const newUser = new User({ email, password, hotelName, hotelID });

    // Create the hotel entry in the central hotel database
    const newHotel = new HotelModel({ hotelName: hotelName, hotelID: hotelID, email: email });

    // Save the user and hotel
    await newUser.save();
    await newHotel.save();

    // Generate tokens (if applicable) and send success response
    const token = generateTokens({ id: newUser._id.toString(), hotelID });

    // Send a success response
    return sendSuccessResponse(201, {
      message: "Hotel and owner registered successfully",
      User: newUser,
      token,
    });

  } catch (error) {
    return handleAppError(error);
  } finally {
    // Disconnect from the current hotel database after the operation is complete
    await mongoose.disconnect();
    console.log("Disconnected from the hotel-specific database");
  }
}
