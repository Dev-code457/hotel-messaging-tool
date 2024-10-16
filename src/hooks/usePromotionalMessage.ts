// hooks/usePromotionalMessage.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";

const usePromotionalMessage = () => {
    const [discount, setDiscount] = useState<number | null>();
    const [hotelName, setHotelName] = useState<string>("");
    const [phoneNumber, setPhoneNumber] = useState<number>();
    const [address, setAddress] = useState<string>("");
    const [sliderValue, setSliderValue] = useState<number | null>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numberValue = parseFloat(value);

        if (!isNaN(numberValue)) {
            setDiscount(numberValue);
        } else if (value === "") {
            setDiscount(undefined);
        }
    };

    const handleSliderValueChange = (value: number) => {
        setSliderValue(value);
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const formattedValue = value.replace(/  /g, ",");
        setAddress(formattedValue);
    };

    const sendBulkMessage = async () => {
        setLoading(true);
        try {
            // Format discount with '% Off' if it is defined
            const formattedDiscount = discount !== undefined ? `${discount}% Off` : undefined;

            const response = await axios.post("/api/Promotional", {
                discount: formattedDiscount, // send formatted discount
                hotelName,
                phoneNumber,
                address,
                sliderValue,
            });

            dispatch(MessagesUsed());
            setAddress("");
            setPhoneNumber(0);
            setDiscount(null);
            setHotelName("");
            setSliderValue(0);
            toast.success(response.data.message || "Message sent successfully!");
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                toast.error(error.response.data.message || "Something went wrong!");
            } else {
                toast.error(error.message || "An unknown error occurred.");
            }
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
