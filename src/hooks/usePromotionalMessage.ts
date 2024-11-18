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

    const handleDateChange = (selectedDate: Date | null) => {
        if (selectedDate) {
            const options: Intl.DateTimeFormatOptions = {
                weekday: 'short', // Short form of the day (e.g., Thu)
                year: 'numeric',  // Four-digit year
                month: 'short',   // Short form of the month (e.g., Nov)
                day: '2-digit',   // Two-digit day
            };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(selectedDate);
            setDate(formattedDate); // Save the formatted date
        } else {
            setDate(null); // Handle null values
        }
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

    const sendBulkMessage = async (messageType: string) => {
        setLoading(true);
        try {
            const formattedDiscount = discount !== null ? `${discount}% Off` : undefined;

            // Define the request payload
            const eventBooking = {
                ownerHotelName, time, discount, date, sliderValue
            };
            const discountpayload = {
                ownerHotelName, discount, phoneNumber, address, sliderValue
            };
            const PartyPalnning = {
                ownerHotelName, time, date, phoneNumber, address, sliderValue
            };
            const roomBooking = {
                ownerHotelName, date, phoneNumber, address, sliderValue
            };

            let response: ApiResponse;

            if (messageType === "eventBooking") {
                // API call specific for eventBooking
                response = await axiosPost<ApiResponse, typeof eventBooking>("/api/Promotional/EventOrganization", eventBooking);
            } else if (messageType === "partyInvitation") {
                // API call specific for promotional
                response = await axiosPost<ApiResponse, typeof PartyPalnning>("/api/Promotional/PartyPlanning", PartyPalnning);
            } else if (messageType === "roomBooking") {
                // Handle other message types if needed
                response = await axiosPost<ApiResponse, typeof roomBooking>("/api/Promotional/RoomBooking", roomBooking);
            }
            else {
                // Handle other message types if needed
                response = await axiosPost<ApiResponse, typeof discountpayload>("/api/Promotional/Discounts", discountpayload);
            }

            dispatch(MessagesUsed());

            // Reset fields after successful submission
            setDiscount(null);
            setDate(null);
            setTime(null);
            setPhoneNumber("");
            setAddress("");
            setSliderValue(0);
            toast.success(response.data.message || "Message sent successfully!");
        } catch (error: any) {
            console.log(error);

            toast.error(error.message  || "An unknown error occurred.");
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
