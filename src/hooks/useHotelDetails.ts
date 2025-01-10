import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { axiosPost, axiosPut } from "@/utils/axiosUtility"; 
const useHotelDetails = (hotelId?: string) => {
    const router = useRouter();
    const [hotelDetails, setHotelDetails] = useState("");
    const [isLoading, setLoading] = useState(false);

    const handleChangeHotelDetails = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!hotelDetails) {
            toast.error("Fields are required.");
            return;
        }

        setLoading(true);

        try {
            // Determine whether to use POST or PUT
            const url = `/hotel/change-hotel-details`; // Same endpoint for both POST and PUT

            const response = await axiosPut<{ message: string }, { hotelName: string }>(url, {  hotelName: hotelDetails })
               console.log(response);
               

            toast.success(response.data.message || "Hotel details saved successfully!");
            setHotelDetails("");
            router.push("/Settings");
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
