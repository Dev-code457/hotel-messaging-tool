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
    const [progress, setProgress] = useState(0);
    const [bulkErrors, setBulkErrors] = useState<string[]>([]);

    // Helper function to validate phone number
    const isValidPhoneNumber = (phoneNumber: string): boolean => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    // Normalize phone number input
    const normalizePhoneNumber = (phoneNumber: string): string => {
        return phoneNumber.trim();
    };

    // Validate other fields


    // Single customer submit
    const handleSubmitFeedback = async (phoneNumber: string, email: string, name: string) => {
        const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

        if (!normalizedPhoneNumber) {
            toast.error("Phone Number cannot be empty!");
            return false;
        }

        if (!isValidPhoneNumber(normalizedPhoneNumber)) {
            toast.error("Phone number must be a 10-digit number.");
            return false;
        }

    

        setLoading(true);
        try {
            await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", {
                phoneNumber: normalizedPhoneNumber,
                name,
                email,
            });
            toast.success("Customer added successfully!");
            return true;
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error.message || "An unexpected error occurred.";
            toast.error(`Failed to add customer: ${errorMessage}`);
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
                const normalizedPhoneNumber = normalizePhoneNumber(phoneNumber);

                // Validate fields
                if (!normalizedPhoneNumber || !isValidPhoneNumber(normalizedPhoneNumber)) {
                    invalidEntries.push(
                        `Row ${serialNumber}: Invalid phone number (${phoneNumber || "N/A"})`
                    );
                    continue;
                }

          

                // Avoid duplicate phone numbers within the same CSV
                if (processedNumbers.has(normalizedPhoneNumber)) {
                    invalidEntries.push(`Row ${serialNumber}: Duplicate phone number (${normalizedPhoneNumber})`);
                    continue;
                }

                try {
                    await axiosPost<FeedbackResponse, FeedbackInput>("/api/customers", {
                        phoneNumber: normalizedPhoneNumber,
                        name,
                        email,
                    });
                    processedNumbers.add(normalizedPhoneNumber);
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
