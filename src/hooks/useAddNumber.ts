import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";
import * as Yup from "yup"; // Import Yup

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
    const [progress, setProgress] = useState(0);
    const [bulkErrors, setBulkErrors] = useState<string[]>([]);

    // Define Yup validation schema
    const validationSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .required("Phone number is required")
            .matches(/^\d{10}$/, "Phone number must be a 10-digit number"),
        email: Yup.string().email("Invalid email format"),
        name: Yup.string().min(5, "Name Must Be 5 Characters Long"),
    });

    // Single customer submit
    const handleSubmitFeedback = async (phoneNumber: string, email: string, name: string) => {
        const input = { phoneNumber, email, name };

        try {
            // Validate the input using Yup
            await validationSchema.validate(input, { abortEarly: false });

            setLoading(true);
            await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", input);
            toast.success("Customer added successfully!");
            return true;
        } catch (error: any) {
            if (error.name === "ValidationError") {
                error.inner.forEach((err: Yup.ValidationError) => {
                    toast.error(err.message);
                });
            } else {
                toast.error(`Failed to add customer: ${error?.message || "An unexpected error occurred."}`);
            }
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
        setProgress(0);
        setBulkErrors([]);

        const invalidEntries: string[] = [];
        const successfulEntries: number[] = [];
        const processedNumbers = new Set<string>();
        const totalEntries = csvData.length;

        try {
            for (let i = 0; i < totalEntries; i++) {
                const entry = csvData[i];
                const { phoneNumber, email, name } = entry;
                const serialNumber = i + 1;
                const input = { phoneNumber, email, name };

                // Validate fields using Yup
                try {
                    await validationSchema.validate(input, { abortEarly: false });
                } catch (error: any) {
                    if (error.name === "ValidationError") {
                        invalidEntries.push(
                            `Row ${serialNumber}: ${error.inner.map((err: Yup.ValidationError) => err.message).join(", ")}`
                        );
                    }
                    continue;
                }

                // Avoid duplicate phone numbers within the same CSV
                if (processedNumbers.has(phoneNumber)) {
                    invalidEntries.push(`Row ${serialNumber}: Duplicate phone number (${phoneNumber})`);
                    continue;
                }

                try {
                    await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", input);
                    processedNumbers.add(phoneNumber);
                    successfulEntries.push(serialNumber);
                } catch (error: any) {
                    const errorMessage = error?.message || "Failed to add entry.";
                    invalidEntries.push(`Row ${serialNumber}: ${errorMessage}`);
                }

                // Update progress
                setProgress(Math.round(((i + 1) / totalEntries) * 100));
            }

            // Update error state for UI display
            setBulkErrors(invalidEntries);

            // Summary Notifications
            if (successfulEntries.length > 0) {
                toast.success(`${successfulEntries.length} entries saved successfully!`);
            }
            if (invalidEntries.length > 0) {
                toast.error(
                    `${invalidEntries.length} entries encountered errors. Please review the error details below.`,
                    { duration: 5000 }
                );
            }

        } catch (error: any) {
            toast.error(`Error processing CSV: ${error.message}`);
        } finally {
            setBulkLoading(false);
            setProgress(0); // Reset progress after completion
        }
    };

    const resetBulkErrors = () => {
        setBulkErrors([]);
    };

    return {
        loading,
        bulkLoading,
        progress,
        bulkErrors,
        handleSubmitFeedback,
        handleSubmitCsvFeedback,
        resetBulkErrors,
    };
};

export default useAddNumber;
