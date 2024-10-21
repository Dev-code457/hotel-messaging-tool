import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const useHotelDetails = (hotelId?: string) => {
    const router = useRouter()
    const [hotelDetails, setHotelDetails] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleChangeHotelDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = Cookies.get("_session");

        // Basic validation
        if (!hotelDetails) {
            toast.error("Fieldss are required.");
            return;
        }

        setLoading(true);

        try {
            // Determine whether to use POST or PUT
            const url = hotelId
                ? `/api/ChangeHotel-Details` // PUT for existing hotel (update)
                : `/api/ChangeHotel-Details`; // POST for new hotel (create)

            const method = hotelId ? "put" : "post"; // Use PUT if hotelId exists, otherwise POST

            const response = await axios[method](
                url,
                { id: hotelId, hotelName: hotelDetails },
                { headers: { Authorization: token } }
            );

            toast.success(response.data.message || "Hotel details saved successfully!");
            setHotelDetails("");
            router.push("/Settings")
        } catch (error: any) {
            const errorMessage = error.response?.data?.error || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return {
        hotelDetails,
        setHotelDetails,
        handleChangeHotelDetails,
        isLoading,
    };
};

export default useHotelDetails;
