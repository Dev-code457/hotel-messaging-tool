
import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
    phoneNumber: { type: String, required: true, unique: true },
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
