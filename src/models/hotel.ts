
import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema({
    hotelName: { type: String, required: true },
 
});

const Hotel = mongoose.models.Hotel || mongoose.model("Hotel", hotelSchema);

export default Hotel;
