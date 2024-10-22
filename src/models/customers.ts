
import mongoose from "mongoose";

export const createCustomersModel = (hotelName: string) => {
    const customerSchema = new mongoose.Schema(
        {
            email: {
                type: String,
                lowercase: true,
                trim: true,
                match: [/.+\@.+\..+/, "Please fill a valid email address"],
            },
            phoneNumber: {
                type: String,
                unique: true,
            },
            name: {
                type: String,
            },
        },
        {
            timestamps: true,
        }
    );
    const modelName = `Customers_${hotelName.replace(/\s+/g, '_')}`;

    const Customer =
        mongoose.models[modelName] || mongoose.model(modelName, customerSchema);

    return Customer;
};
