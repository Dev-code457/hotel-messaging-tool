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
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: '2-digit',
            };
            const formattedDate = new Intl.DateTimeFormat('en-US', options).format(selectedDate);
            setDate(formattedDate);
        } else {
            setDate(null);
        }
    };

    const handleTimeChange = (e: any) => {
        const timeString = e.target.value;
        const currentDate = new Date();
        const [hour, minute] = timeString.split(":");


        currentDate.setHours(parseInt(hour, 10));
        currentDate.setMinutes(parseInt(minute, 10));
        currentDate.setSeconds(0);


        const formattedTime = new Intl.DateTimeFormat("en-GB", {
            weekday: "short",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        }).format(currentDate);

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


            const eventBooking = {
                ownerHotelName, phoneNumber, sliderValue
            };
            const discountpayload = {
                ownerHotelName, formattedDiscount, phoneNumber, address, sliderValue
            };
            const PartyPalnning = {
                ownerHotelName, time, date, phoneNumber, address, sliderValue
            };
            const roomBooking = {
                ownerHotelName, date, phoneNumber, address, sliderValue
            };

            let response: ApiResponse;

            if (messageType === "eventBooking") {

                response = await axiosPost<ApiResponse, typeof eventBooking>("/api/Promotional/EventOrganization", eventBooking);
            } else if (messageType === "partyInvitation") {

                response = await axiosPost<ApiResponse, typeof PartyPalnning>("/api/Promotional/PartyPlanning", PartyPalnning);
            } else if (messageType === "roomBooking") {

                response = await axiosPost<ApiResponse, typeof roomBooking>("/api/Promotional/RoomBooking", roomBooking);
            }
            else {

                response = await axiosPost<ApiResponse, typeof discountpayload>("/api/Promotional/Discounts", discountpayload);
            }

            dispatch(MessagesUsed());


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
