import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const useForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const forgotPassword = async (email: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put("/api/auth/forgot-password", {
        email,
      });
      toast.success(response.data.message || "Reset link sent successfully!");
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { forgotPassword, loading, error };
};

export default useForgotPassword;
