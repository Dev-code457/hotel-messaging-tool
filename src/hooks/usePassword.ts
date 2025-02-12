// hooks/usePasswordReset.ts
import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { axiosPost, axiosPut } from "@/utils/axiosUtility";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { hotelActions } from "@/redux/slices/hotelSlice";
import { useHotelData } from "./useHotelUser";


export const usePasswordReset = (token: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const {data}: any = useHotelData()

  useEffect(() => {
    const persistedHotelData = localStorage.getItem("persist:root");

    if (persistedHotelData) {
      const parsedData = JSON.parse(persistedHotelData);

      if (parsedData.hotel) {
        const hotelData = JSON.parse(parsedData.hotel).details;

        if (hotelData) {
          dispatch(hotelActions.fetchHotelDetailsSuccess(hotelData));
          return; 
        }
      }
    }
  }, [dispatch]);




  const resetPassword = async (password: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);




    try {
      const response = await axiosPost(`/password/reset-password/${token}`, {
        password,
        confirmPassword,
        email: data?.data?.User?.email,
        hotelName: data?.data?.hotel?.dbName,
      });

      toast.success(response.data.message || "Password reset successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
};
