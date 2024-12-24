import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";
import * as Yup from "yup";

interface FeedbackInput {
    feedback: string;
}
interface FeedbackResponse {
    message: string;
}

// Define Yup validation schema
const feedbackSchema = Yup.object().shape({
    feedback: Yup.string()
        .trim()
        .required("Feedback is required!")
        .min(5, "Feedback must be at least 5 characters long!")
        .max(500, "Feedback cannot exceed 500 characters!"),
});

const useFeedback = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmitFeedback = async (feedback: string) => {
        try {
            // Validate feedback using Yup
            await feedbackSchema.validate({ feedback });

            setLoading(true);

            // Submit feedback
            const data = await axiosPost<FeedbackResponse, FeedbackInput>("/api/Feedback", { feedback });
            toast.success("Thank you for your valuable feedback!");

            return true;
        } catch (error: any) {
            if (error.name === "ValidationError") {
                // Handle validation errors
                toast.error(error.message);
            } else {
                // Handle API errors
                toast.error(error.message);
            }
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSubmitFeedback };
};

export default useFeedback;
