// hooks/useChangePassword.js
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";

 const useChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = Cookies.get("_session");

    // Basic validation
    if (!password || !newPassword) {
      toast.error("Both fields are required.");
      return;
    }
    
    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.put(
        "/api/auth/change-password",
        { password, newPassword },
        { headers: { Authorization: token } }
      );

      toast.success(response.data.message || "Password changed successfully!");
      // Clear passwords
      setPassword("");
      setNewPassword("");
    } catch (error: any) {
      console.log(error);
      
      const errorMessage = error.response.data.message || "Something went wrong!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    password,
    setPassword,
    newPassword,
    setNewPassword,
    handleChangePassword,
    loading,
  };
}
export default useChangePassword;


