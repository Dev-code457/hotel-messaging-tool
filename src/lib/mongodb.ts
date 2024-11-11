import mongoose from "mongoose";

const uri = process.env.MONGODB_URI || "";

if (!uri) {
  throw new Error("Please add your MongoDB URI to .env.local");
}


let isConnected: Record<string, boolean> = {};


export const connectToDatabase = async (): Promise<void> => {


  try {

    await mongoose.connect(uri, {
      dbName: "GoodPeggTouch",
    });


    isConnected["GoodPeggTouch"] = true;
    console.log(`MongoDB connected to database: GoodPeggTouch`);
  } catch (error) {
    console.error(`Error connecting to MongoDB database: GoodPeggTouch`, error);
    throw new Error("Could not connect to MongoDB");
  }
};
