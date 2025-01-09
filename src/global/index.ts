// global.ts
import { axiosGet } from "@/utils/axiosUtility";
import { store } from '@/redux/store';  // Import your store
import { hotelActions } from '@/redux/slices/hotelSlice';

export async function fetchHotelData() {
    try {
      store.dispatch(hotelActions.fetchHotelDetailsPending());
      const response = await axiosGet('/hotel/get-user-hotel');
      const data = response.data;
      
      // Dispatch the success action with the data
      store.dispatch(hotelActions.fetchHotelDetailsSuccess(data));
      
      return data;
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