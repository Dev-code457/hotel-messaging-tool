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

    const handleTimeChange = (e: any) => {
        const timeString = e.target.value; // Get the selected time in "HH:mm" format
        const currentDate = new Date(); // Get today's date
        const [hour, minute] = timeString.split(":"); // Split the time into hours and minutes

        // Set the current date with the selected time
        currentDate.setHours(parseInt(hour, 10));
        currentDate.setMinutes(parseInt(minute, 10));
        currentDate.setSeconds(0); // Set seconds to 0

        // Format the date as weekday, time, and AM/PM
        const formattedTime = new Intl.DateTimeFormat("en-GB", {
            weekday: "short",  // Short format for the weekday (e.g., Mon, Tue)
            hour: "2-digit",   // Hour with two digits
            minute: "2-digit", // Minute with two digits
            hour12: true,      // Use 12-hour format (AM/PM)
        }).format(currentDate);

        // Set the formatted time
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
                ownerHotelName, phoneNumber, sliderValue
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

            toast.error(error.message || "An unknown error occurred.");
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
