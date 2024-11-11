import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";
import { axiosPost } from "@/utils/axiosUtility";
import { ApiResponse } from "@/types";

const usePromotionalMessage = (initialHotelName: string) => {
    const [discount, setDiscount] = useState<number | null>(null);
    const [date, setDate] = useState<string | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const [ownerHotelName, setHotelName] = useState<string>(initialHotelName);
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [sliderValue, setSliderValue] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setHotelName(initialHotelName);
    }, [initialHotelName]);

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numberValue = parseFloat(e.target.value);
        setDiscount(isNaN(numberValue) ? null : numberValue);
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const [hour, minute] = e.target.value.split(":");
        const hourNumber = parseInt(hour, 10);
        const ampm = hourNumber >= 12 ? "PM" : "AM";
        const formattedHour = hourNumber % 12 || 12;
        const formattedTime = `${formattedHour}:${minute} ${ampm}`;
        setTime(formattedTime);
    };


    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value.replace(/  /g, ","));
    };

    const handleSliderValueChange = (value: number) => {
        setSliderValue(value);
    };

    const sendBulkMessage = async () => {
        setLoading(true);
        try {
            const formattedDiscount = discount !== null ? `${discount}% Off` : undefined;

            const response = await axiosPost<ApiResponse, {
                discount?: string,
                ownerHotelName: string,
                phoneNumber: string,
                address: string,
                sliderValue: number,
                date?: string | null,
                time?: string | null
            }>("/api/Promotional", {
                discount: formattedDiscount,
                ownerHotelName,
                phoneNumber,
                address,
                sliderValue,
                date,
                time
            });

            dispatch(MessagesUsed());
            // Reset fields
            setDiscount(null);
            setDate(null);
            // setTime(null);
            setPhoneNumber("");
            setAddress("");
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
        ownerHotelName,
        phoneNumber,
        address,
        sliderValue,
        date,
        time,
        loading,
        setDiscount,
        setHotelName,
        setPhoneNumber,
        setDate,
        setTime,
        setAddress,
        handleDiscountChange,
        handleSliderValueChange,
        handleAddressChange,
        handleDateChange,
        handleTimeChange,
        handlePhoneNumberChange,
        sendBulkMessage,
    };
};

export default usePromotionalMessage;
