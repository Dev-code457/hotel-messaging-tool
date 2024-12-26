import { useEffect, useState } from "react";
import { toast } from "sonner";
import { axiosPut } from "@/utils/axiosUtility";
import { useDispatch } from "react-redux";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { fetchHotelData } from "@/global";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"
import { data } from "jquery";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch()
  const hotelDetail = useSelector((state: RootState) => state.hotel.details);
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(hotelActions.fetchHotelDetailsPending());
        const data = await fetchHotelData();
        dispatch(hotelActions.fetchHotelDetailsSuccess(data));
      } catch (error: any) {
        dispatch(hotelActions.fetchHotelDetailsFailure(error.message));
      }
    };

    fetchData();
  }, [dispatch]);


  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPut("http://localhost:3000/api/password/forgot-password", {
        email,
        dbName: hotelDetail?.data?.hotel?.dbName,
      });
      toast.success(response.data.message || "Reset link sent successfully!");
    } catch (error: any) {
      const message =
        error.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};

export default useForgotPassword;
