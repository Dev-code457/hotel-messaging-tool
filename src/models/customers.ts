
import { unique } from "jquery";
import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema({
    phoneNumber: { type: String, required: true, unique: true },
    name:{type: String, required: false},
    email:{type: String, required: false,unique: true}
});

const Customer = mongoose.models.Customer || mongoose.model("Customer", customerSchema);

export default Customer;
