import { axiosGet } from "@/utils/axiosUtility";

export async function fetchHotelData() {
    try {
      const response = await axiosGet('/hotel/get-user-hotel');
      console.log(response.data);
      const data = response.data;
      return data;
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      throw error;
    }
  }