import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";
import { axiosPost } from "@/utils/axiosUtility";

const phoneNumberRegex = /^\d{10}$/;

interface ApiResponse {
    data?: any; // Adjust this type according to your actual API response structure
    message?: string;
}

interface UseCheckInOutResult {
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    loadingCheckIn: boolean;
    loadingCheckOut: boolean;
    handleCheckIn: () => Promise<void>;
    handleCheckOut: () => Promise<void>;
}

export const useCheckInOut = (): UseCheckInOutResult => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [loadingCheckIn, setIsLoadingCheckIn] = useState<boolean>(false);
    const [loadingCheckOut, setIsLoadingCheckOut] = useState<boolean>(false);
    const dispatch = useDispatch();

    const validatePhoneNumber = (phone: string): string | null => {
        if (!phone) return "Phone number is required.";
        if (!phoneNumberRegex.test(phone)) return "Please enter a valid 10-digit phone number.";
        return null;
    };

    const handleSubmit = async (messageType: "checkin" | "checkout") => {
        const validationError = validatePhoneNumber(phoneNumber);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        // Set loading state based on the message type
        if (messageType === "checkin") {
            setIsLoadingCheckIn(true);
        } else {
            setIsLoadingCheckOut(true);
        }

        try {
            // Use the axiosPost utility function instead of axios directly
            const response: ApiResponse = await axiosPost("/api/checkInOut", { phoneNumber, messageType });
            dispatch(MessagesUsed());

            toast.success(response.message || "Message sent successfully!"); // Accessing message safely
        } catch (error: any) { 
            console.error(error);
            const errorMessage = error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage); // Safely accessing error message
        } finally {
            // Reset loading state based on the message type
            if (messageType === "checkin") {
                setIsLoadingCheckIn(false);
            } else {
                setIsLoadingCheckOut(false);
            }
            setPhoneNumber(""); // Clear input after submission
        }
    };

    const handleCheckIn = async (): Promise<void> => handleSubmit("checkin");
    const handleCheckOut = async (): Promise<void> => handleSubmit("checkout");

    return {
        phoneNumber,
        setPhoneNumber,
        loadingCheckIn,
        loadingCheckOut,
        handleCheckIn,
        handleCheckOut,
    };
};
