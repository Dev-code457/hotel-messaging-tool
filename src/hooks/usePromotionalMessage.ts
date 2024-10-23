import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";
import { axiosPost } from "@/utils/axiosUtility";
import { ApiResponse } from "@/types";

const usePromotionalMessage = (initialHotelName: string) => {
    const [discount, setDiscount] = useState<number | null>(null);
    const [hotelName, setHotelName] = useState<string>(initialHotelName);
    const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
    const [address, setAddress] = useState<string>("");
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setHotelName(initialHotelName);
    }, [initialHotelName]);

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = parseFloat(value);

        if (!isNaN(numberValue)) {
            setDiscount(numberValue);
        } else if (value === "") {
            setDiscount(null);
        }
    };

    const handleSliderValueChange = (value: number) => {
        setSliderValue(value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/  /g, ",");
        setAddress(value);
    };

    const sendBulkMessage = async () => {
        if (!hotelName.trim()) {
            toast.error("Hotel Name is required.");
            return;
        }

        setLoading(true);
        try {
            const formattedDiscount = discount !== null ? `${discount}% Off` : undefined;

            const response = await axiosPost<ApiResponse, { discount?: string, hotelName: string, phoneNumber: number, address: string, sliderValue: number }>("/api/Promotional", {
                discount: formattedDiscount,
                ownerHotelName: hotelName,
                phoneNumber,
                address,
                sliderValue,
            });

            dispatch(MessagesUsed());
            setAddress("");
            setPhoneNumber(null);
            setDiscount(null);
            setSliderValue(0);
            toast.success(response.data.message || "Message sent successfully!");
        } catch (error: any) {
            toast.error(error.response?.data.message || error.message || "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return {
        discount,
        hotelName,
        phoneNumber,
        address,
        sliderValue,
        loading,
        setDiscount,
        setHotelName,
        setPhoneNumber,
        setAddress,
        handleDiscountChange,
        handleSliderValueChange,
        handleAddressChange,
        sendBulkMessage,
    };
};

export default usePromotionalMessage;
