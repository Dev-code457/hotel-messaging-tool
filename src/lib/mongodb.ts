import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Type definition for connection status
let isConnected: Record<string, boolean> = {}; // Use Record to define the type of isConnected

// Type definition for the connectToDatabase function
export const connectToDatabase = async (dbName: string): Promise<void> => {

  if (isConnected[dbName]) {
    return;
  }

  try {

    await mongoose.connect(uri, {
      dbName: dbName,
    });
    isConnected[dbName] = true;
    console.log(`MongoDB connected to ${dbName}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
};
