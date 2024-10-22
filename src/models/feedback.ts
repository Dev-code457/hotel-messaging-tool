
import mongoose from "mongoose";

export const createFeedbacksModel = (hotelName: string) => {
    const FeedbackSchema = new mongoose.Schema(
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
    const modelName = `Feedbacks_${hotelName.replace(/\s+/g, '_')}`;

    const Feedback =
        mongoose.models[modelName] || mongoose.model(modelName, FeedbackSchema);

    return Feedback;
};
