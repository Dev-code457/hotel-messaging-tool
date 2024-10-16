import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";

interface FeedbackInput {
    feedback: string;
}
interface FeedbackResponse {
    message: string;
}

const useFeedback = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmitFeedback = async (feedback: string) => {

        if (!feedback.trim()) {
            toast.error("Feedback cannot be empty!");
            return false;
        }
        setLoading(true);
        try {
            const data = await axiosPost<FeedbackResponse, FeedbackInput>("/api/Feedback", { feedback });
            toast.success("Thank you for your valuable feedback!");
            return true;
        } catch (error: any) {
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { loading, handleSubmitFeedback };
};

export default useFeedback;
