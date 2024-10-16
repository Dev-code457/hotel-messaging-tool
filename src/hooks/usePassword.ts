// hooks/usePasswordReset.ts
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export const usePasswordReset = (token: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (password: string, confirmPassword: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/auth/reset-password/${token}`, {
        password,
        confirmPassword,
      });
      toast.success(response.data.message || "Password reset successfully!");
    } catch (err: any) {
      const message = err.response?.data?.message || "Something went wrong!";
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, loading, error };
};
