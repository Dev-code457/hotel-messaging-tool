import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "HotelMessagingTool",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
};
