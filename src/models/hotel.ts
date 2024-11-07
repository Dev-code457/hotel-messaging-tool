// models/hotel.ts

import mongoose, { Document, Model, Schema } from "mongoose";

interface IHotel extends Document {
  hotelName: string;
  hotelID: string;
  email: string;
}

const hotelSchema: Schema<IHotel> = new Schema({
  hotelName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
});

const HotelModel: Model<IHotel> = mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", hotelSchema);

export default HotelModel;
