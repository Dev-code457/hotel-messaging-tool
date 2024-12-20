import { useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";
import { axiosPost } from "@/utils/axiosUtility";
import { ApiResponse } from "@/types";

const phoneNumberRegex = /^\d{10}$/;

interface UseCheckInOutResult {
    phoneNumber: string;
    setPhoneNumber: (value: string) => void;
    userSpending: string | number;
    setUserSpending: (value: string | number) => void;
    loadingCheckIn: boolean;
    loadingCheckOut: boolean;
    handleCheckIn: (isPromotionalList: boolean) => Promise<void>;
    handleCheckOut: (isPromotionalList: boolean) => Promise<void>;
    isPromotionalList: boolean;
    setIsPromotionalList: (value: boolean) => void;
}

export const useCheckInOut = (): UseCheckInOutResult => {
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [userSpending, setUserSpending] = useState<string | number>("");
    const [loadingCheckIn, setIsLoadingCheckIn] = useState<boolean>(false);
    const [loadingCheckOut, setIsLoadingCheckOut] = useState<boolean>(false);
    const [isPromotionalList, setIsPromotionalList] = useState<boolean>(false);
    const dispatch = useDispatch();

    const validatePhoneNumber = (phone: string): string | null => {
        if (!phone) return "Phone number is required.";
        if (!phoneNumberRegex.test(phone)) return "Please enter a valid 10-digit phone number.";
        return null;
    };

    const handleSubmit = async (messageType: "checkin" | "checkout", isPromotionalList: boolean) => {
        const validationError = validatePhoneNumber(phoneNumber);
        if (validationError) {
            toast.error(validationError);
            return;
        }

        if (messageType === "checkin") {
            setIsLoadingCheckIn(true);
        } else {
            setIsLoadingCheckOut(true);
        }

        try {
            const response = await axiosPost<ApiResponse, { phoneNumber: string; messageType: string; isPromotionalList: boolean, userSpending: string }>(
                "/api/checkInOut",
                { phoneNumber, messageType, isPromotionalList, userSpending: String(userSpending) }
            );

            dispatch(MessagesUsed());
            if (response) {
                toast.success(response.data.message || "Message sent successfully!");
            } else {
                toast.error("No response from server.");
            }
        } catch (error: any) {
            const errorMessage = error?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            // Reset both phoneNumber and isPromotionalList here
            setPhoneNumber("");
            setUserSpending("");
            setIsPromotionalList(false); // Reset checkbox state
            if (messageType === "checkin") {
                setIsLoadingCheckIn(false);
            } else {
                setIsLoadingCheckOut(false);
            }
        }
    };

    const handleCheckIn = async (isPromotionalList: boolean): Promise<void> => handleSubmit("checkin", isPromotionalList);
    const handleCheckOut = async (isPromotionalList: boolean): Promise<void> => handleSubmit("checkout", isPromotionalList);

    return {
        phoneNumber,
        setPhoneNumber,
        userSpending,
        setUserSpending,
        loadingCheckIn,
        loadingCheckOut,
        handleCheckIn,
        handleCheckOut,
        isPromotionalList,
        setIsPromotionalList,
    };
};
