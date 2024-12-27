import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { MessagesUsed } from "@/redux/slices/exampleSlice";
import { axiosPost } from "@/utils/axiosUtility";
import { ApiResponse } from "@/types";

interface BulkMessagePayload {
    ownerHotelName: string;
    sliderValue: number;
    phoneNumber?: string;
    address?: string;
    discount?: string;
    time?: string | null;
    date?: string | null;
}

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

    const sendBulkMessage = async (selectedTemplate: string) => {
        if (!ownerHotelName || !sliderValue) {
            toast.error("Hotel name and number of recipients are required");
            return;
        }

        setLoading(true);
        try {
            const formattedDiscount = discount !== null ? `${discount}% Off` : undefined;

            let endpoint: string;
            let payload: BulkMessagePayload;

            switch (selectedTemplate) {
                case 'discounts':
                    endpoint = 'http://localhost:3000/api/message/bulk-messaging/discount';
                    payload = {
                        ownerHotelName,
                        discount: formattedDiscount,
                        phoneNumber,
                        address,
                        sliderValue
                    };
                    break;

                case 'roomBooking':
                    if (!time || !date) {
                        throw new Error('date is required for this message');
                    }
                    endpoint = 'http://localhost:3000/api/message/bulk-messaging/room-booking';
                    payload = {
                        ownerHotelName,
                        phoneNumber,
                        date,
                        address,
                        sliderValue
                    };
                    break;

                case 'partyPlanning':
                    if (!date) {
                        throw new Error('Date and Time are required for date-based messages');
                    }
                    endpoint = 'http://localhost:3000/api/message/bulk-messaging/party-planning';
                    payload = {
                        ownerHotelName,
                        date,
                        time,
                        phoneNumber,
                        address,
                        sliderValue
                    };
                    break;
                case 'eventBooking':
                    if (!date) {
                        throw new Error('Date and Time are required for date-based messages');
                    }
                    endpoint = 'http://localhost:3000/api/message/bulk-messaging/event-booking';
                    payload = {
                        ownerHotelName,

                        phoneNumber,

                        sliderValue
                    };
                    break;

                default:
                    throw new Error('Invalid template selected');
            }

            const response = await axiosPost<ApiResponse>(endpoint, payload);

            if (response.data) {
                dispatch(MessagesUsed());

                // Reset fields after successful send
                setDiscount(null);
                setDate(null);
                setPhoneNumber("");
                setAddress("");
                setSliderValue(0);

                toast.success(response.data.message || "Message sent successfully!");
            }
        } catch (error: any) {
            console.error('Bulk message error:', error);
            toast.error(
                error.response?.data?.message ||
                error.message ||
                "Failed to send messages"
            );
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