import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

// Track connection status for each database by name
let isConnected: Record<string, boolean> = {};

// Connect to a database by name
export const connectToDatabase = async (dbName: string): Promise<void> => {
  // Check if already connected to the specified database
  if (isConnected[dbName]) {
    console.log(`Already connected to ${dbName}`);
    return;
  }

  try {
    // Connect to MongoDB using the database name
    await mongoose.connect(uri, {
      dbName: dbName,
    });

    // Mark this database as connected
    isConnected[dbName] = true;
    console.log(`MongoDB connected to database: ${dbName}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB database: ${dbName}`, error);
    throw new Error("Could not connect to MongoDB");
  }
};
