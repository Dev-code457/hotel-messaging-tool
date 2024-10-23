// hooks/usePasswordReset.ts
import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { axiosPut } from "@/utils/axiosUtility";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { fetchHotelData } from "@/global";

export const usePasswordReset = (token: string) => {
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

  const resetPassword = async (password: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axiosPut(`/api/auth/reset-password/${token}`, {
        password,
        confirmPassword,
        email: hotelDetail.email,
        hotelName: hotelDetail.hotelName,
      });
      toast.success(response.data.message || "Password reset successfully!");
    } catch (err: any) {
      const message = err.data.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
};
