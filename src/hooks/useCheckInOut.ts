import { useState } from "react";
import { toast } from "sonner";
import { axiosPost } from "@/utils/axiosUtility";
import { ApiResponse } from "@/types";
import { useHotelData } from "./useHotelUser";
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
    const { data }: any = useHotelData()
    const handleSubmit = async (messageType: "checkin" | "checkout", isPromotionalList: boolean) => {
        if (messageType === "checkin") {
            setIsLoadingCheckIn(true);
        } else {
            setIsLoadingCheckOut(true);
        }


        try {
            const response = await axiosPost<ApiResponse, { phoneNumber: string; messageType: string; isPromotionalList: boolean, userSpending: string, hotelName: string }>(
                "/message/check-in-out",
                { phoneNumber, messageType, isPromotionalList, userSpending: String(userSpending), hotelName: data?.data?.User?.hotelName }
            );

            if (response) {
                console.log(response, "Response from server");
                toast.success(response.data.message || "Message sent successfully!");
            } else {
                toast.error("No response from server.");
            }
        } catch (error: any) {
            console.log("Error details:", error);

            if (error?.response?.data?.errors) {
                error.response.data.errors.forEach((err: string) => {
                    toast.error(err);
                });
            } else {
                toast.error(error?.message || "Something went wrong!");
            }
        } finally {
            setPhoneNumber("");
            setUserSpending("");
            setIsPromotionalList(false);
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