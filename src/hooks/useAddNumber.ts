import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";

interface FeedbackInput {
    phoneNumber: string,
    email: string,
    name: string
}
interface FeedbackResponse {
    message: string;
}

const useAddNumber = () => {
    const [loading, setLoading] = useState(false);

    const handleSubmitFeedback = async (phoneNumber: string, email: string, name: string) => {
        if (!phoneNumber) {
            toast.error("Phone Number can not be empty!");
            return false;
        }

        const phoneRegex = /^\d{10}$/; // Example regex for 10-digit phone numbers
        if (!phoneRegex.test(phoneNumber)) {
            toast.error("Phone number must be a 10-digit number.");
            return false;
        }

        setLoading(true);
        try {
            const data = await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", { phoneNumber, name, email });
            console.log('Ybjsdnjksdnjkfnjksdjkmdfnkdsjn');

            toast.success("Customer is added successfully!");
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

export default useAddNumber;
