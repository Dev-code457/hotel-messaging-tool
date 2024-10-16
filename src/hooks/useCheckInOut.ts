import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";

const phoneNumberRegex = /^\d{10}$/;

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
    const [loadingCheckIn, setIsLoadingCheckIn] = useState<boolean>(false); // Loading state for check-in
    const [loadingCheckOut, setIsLoadingCheckOut] = useState<boolean>(false); // Loading state for check-out
    const dispatch = useDispatch();

    const validatePhoneNumber = (phone: string): string | null => {
        if (!phone) return "Phone number is required.";
        if (!phoneNumberRegex.test(phone)) return "Please enter a valid 10-digit phone number.";
        return null;
    };

    const handleSubmit = async (messageType: "checkIn" | "checkOut") => {
        const validationError = validatePhoneNumber(phoneNumber);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        // Set loading state based on the message type
        if (messageType === "checkIn") {
            setIsLoadingCheckIn(true);
        } else {
            setIsLoadingCheckOut(true);
        }

        try {
            const response = await axios.post("/api/checkInOut", { phoneNumber, messageType });
            const data = response.data;
            dispatch(MessagesUsed());

            toast.success(data.message || "Message sent successfully!");
        } catch (error) {
            console.error(error);
            if (axios.isAxiosError(error) && error.response) {
                toast.error(error.response.data.error || "Something went wrong!");
            } else {
                toast.error("An unknown error occurred.");
            }
        } finally {
            // Reset loading state based on the message type
            if (messageType === "checkIn") {
                setIsLoadingCheckIn(false);
            } else {
                setIsLoadingCheckOut(false);
            }
            setPhoneNumber(""); // Clear input after submission
        }
    };

    const handleCheckIn = async (): Promise<void> => handleSubmit("checkIn");
    const handleCheckOut = async (): Promise<void> => handleSubmit("checkOut");

    return {
        phoneNumber,
        setPhoneNumber,
        loadingCheckIn,
        loadingCheckOut,
        handleCheckIn,
        handleCheckOut,
    };
};
