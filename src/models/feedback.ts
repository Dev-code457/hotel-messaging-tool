
import mongoose from "mongoose";

export const createFeedbacksModel = (hotelName: string) => {
    const FeedbackSchema = new mongoose.Schema(
        {
            feedback: String
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
