import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "../utils/axiosUtility";
import { AxiosError } from "axios";

interface FeedbackInput {
  phoneNumber: string;
  email: string;
  name: string;
}

interface BulkInput {
  customers?: FeedbackInput[];
}

interface FeedbackResponse {
  message: string;
  duplicateNumbers?: {
    phoneNumber: string;
    existingCustomer: {
      name: string;
      email: string;
    };
  }[];
}

interface ValidationError {
  statusCode: number;
  errors: string[];
  isOperational: boolean;
}

const useAddNumber = () => {
  const [loading, setLoading] = useState(false);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  // Helper function to validate phone number
  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Reset field errors
  const resetErrors = () => {
    setFieldErrors({});
  };

  const handleSubmitFeedback = async (phoneNumber: string, email: string, name: string) => {


    setLoading(true);
    try {
        await axiosPost<FeedbackResponse, FeedbackInput>("https://dc0uc29zl4vtv.cloudfront.net/api/hotel/add-customer", {
            phoneNumber,
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
    const invalidEntries: string[] = [];
    const invalidEmails: string[] = [];
    const existingNumbers: string[] = [];

    try {
      for (const entry of csvData) {
        const { phoneNumber, email, name } = entry;

        // Frontend validation for CSV entries
        if (!isValidPhoneNumber(phoneNumber)) {
          invalidEntries.push(`Line ${csvData.indexOf(entry) + 1}: Invalid phone number ${phoneNumber}`);
          continue;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
          invalidEmails.push(`Line ${csvData.indexOf(entry) + 1}: Invalid email ${email}`);
          continue;
        }

        try {
          const response = await axiosPost<FeedbackResponse, BulkInput>(
            "https://dc0uc29zl4vtv.cloudfront.net/api/hotel/add-bulk-customer",
            { customers: [entry] }
          );

          const { data } = response;

          // Check if there are any duplicates
          if (data?.data?.duplicateNumbers && data.data.duplicateNumbers.length > 0) {
            data.data.duplicateNumbers.forEach((duplicate) => {
              const { phoneNumber, existingCustomer } = duplicate;
              toast.error(`Duplicate found: Phone number ${phoneNumber} already exists. Existing customer: ${existingCustomer.name} (${existingCustomer.email})`);
              console.log
              (`Duplicate found: Phone number ${phoneNumber} already exists. Existing customer: ${existingCustomer.name} (${existingCustomer.email})`);
              existingNumbers.push(phoneNumber); // Track existing numbers for final report
            });
          }

        } catch (error) {
          if (error instanceof AxiosError && error.response?.status === 400) {
            existingNumbers.push(`Line ${csvData.indexOf(entry) + 1}: Phone number ${phoneNumber} already exists in DB`);
          } else {
            throw error;
          }
        }
      }

      if (invalidEntries.length > 0) {
        toast.error(`Invalid phone numbers:\n${invalidEntries.join("\n")}`);
      }
      if (invalidEmails.length > 0) {
        toast.error(`Invalid emails:\n${invalidEmails.join("\n")}`);
      }
      if (existingNumbers.length > 0) {
        toast.error(`Existing phone numbers found:\n${existingNumbers.join("\n")}`);
        console.log(`Existing phone numbers found:\n${existingNumbers.join("\n")}`);
        
      }
      if (invalidEntries.length === 0 && invalidEmails.length === 0 && existingNumbers.length === 0) {
        toast.success("All valid CSV entries processed successfully!");
      }

    } catch (error: any) {
toast.error(error.data?.message || "An error occurred");
    } finally {
      setBulkLoading(false);
    }
  };

  return {
    loading,
    bulkLoading,
    fieldErrors,
    handleSubmitCsvFeedback,
    resetErrors,
    handleSubmitFeedback
  };
};

export default useAddNumber;
