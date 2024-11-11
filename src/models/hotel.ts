// HotelModel - Centralized database schema for hotel metadata
import mongoose, { Schema, Document } from "mongoose";

interface IHotel extends Document {
  hotelName: string;
  email: string;
  dbName: string;  // This is the unique database for each hotel
  hotelID: string;  // Unique ID for each hotel
}

const hotelSchema = new Schema<IHotel>({
  hotelName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dbName: { type: String, required: true, unique: true },
  hotelID: { type: String, required: true, unique: true },
});

const HotelModel = mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", hotelSchema);

export default HotelModel;
