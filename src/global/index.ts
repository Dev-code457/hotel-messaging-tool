// global.ts
import { axiosGet } from "@/utils/axiosUtility";
import { store } from '@/redux/store';
import { hotelActions } from '@/redux/slices/hotelSlice';

export async function fetchHotelData() {
    try {
      const response = await axiosGet('/hotel/get-user-hotel');
      
      // Get fresh data from API response
      const freshData = response.data;
      
      // Immediately update Redux with fresh data
      store.dispatch(hotelActions.fetchHotelDetailsSuccess(freshData));
      
      return freshData;
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      if (error instanceof Error) {
        store.dispatch(hotelActions.fetchHotelDetailsFailure(error.message));
      } else {
        store.dispatch(hotelActions.fetchHotelDetailsFailure("An unknown error occurred"));
      }
      throw error;
    }
}