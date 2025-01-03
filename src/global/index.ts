import { axiosGet } from "@/utils/axiosUtility";

export async function fetchHotelData() {
    try {
      const response = await axiosGet('https://dc0uc29zl4vtv.cloudfront.net/api/hotel/get-user-hotel');
      console.log(response.data);
      
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      throw error;
    }
  }