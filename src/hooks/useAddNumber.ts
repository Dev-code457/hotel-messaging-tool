import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";

interface FeedbackInput {
    phoneNumber: string;
    email: string;
    name: string;
}

interface FeedbackResponse {
    message: string;
}

const useAddNumber = () => {
    const [loading, setLoading] = useState(false);
    const [bulkLoading, setBulkLoading] = useState(false);

    // Helper function to validate phone number
    const isValidPhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    // Single customer submit
    const handleSubmitFeedback = async (phoneNumber: string, email: string, name: string) => {
        if (!phoneNumber) {
            toast.error("Phone Number cannot be empty!");
            return false;
        }

        if (!isValidPhoneNumber(phoneNumber)) {
            toast.error("Phone number must be a 10-digit number.");
            return false;
        }

        setLoading(true);
        try {
            const data = await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", { phoneNumber, name, email });
            toast.success("Customer added successfully!");
            return true;
        } catch (error: any) {
            toast.error(error.message);
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Bulk customer submit from CSV
    const handleSubmitCsvFeedback = async (csvData: FeedbackInput[]) => {
        if (!csvData || csvData.length === 0) {
            toast.error("CSV data is empty or invalid!");
            return;
        }

        setBulkLoading(true);
        const invalidEntries: string[] = [];
        const existingNumbers: string[] = [];

        try {
            for (const entry of csvData) {
                const { phoneNumber, email, name } = entry;

                if (!isValidPhoneNumber(phoneNumber)) {
                    invalidEntries.push(`Invalid phone number for ${name}: ${phoneNumber}`);
                    continue;
                }
                await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", { phoneNumber, name, email });
            }

            // Show feedback for invalid and existing numbers
            if (invalidEntries.length > 0) {
                toast.error(`Some entries were invalid:\n${invalidEntries.join("\n")}`);
            }
            if (existingNumbers.length > 0) {
                toast.error(`The following numbers already exist:\n${existingNumbers.join("\n")}`);
            } else {
                toast.success("All valid CSV entries processed successfully!");
            }
        } catch (error: any) {
            toast.error(`Error processing CSV: ${error.message}`);
        } finally {
            setBulkLoading(false);
        }
    };

    return {
        loading,
        bulkLoading,
        handleSubmitFeedback,
        handleSubmitCsvFeedback,
    };
};

export default useAddNumber;
