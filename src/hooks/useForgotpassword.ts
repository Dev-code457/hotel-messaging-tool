import { useState } from "react";
import { toast } from "sonner";
import { axiosPut } from "@/utils/axiosUtility";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useHotelData } from "./useHotelUser";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);





  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {

      const response = await axiosPut("/password/forgot-password", {
        email,
        token: localStorage.getItem("__temp"),
      });

      toast.success(response.data.message || "Reset link sent successfully!");
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};

export default useForgotPassword;
