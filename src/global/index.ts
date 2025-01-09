import { axiosGet } from "@/utils/axiosUtility";
import { hotelActions } from "@/redux/slices/hotelSlice"; // Update with your slice path

interface FetchHotelDataResponse {
  data: any; // Replace 'any' with the actual data type if known
}

interface FetchHotelDataError {
  message: string;
}

export async function fetchHotelData(dispatch: (action: any) => void): Promise<any> { // Replace 'any' with the actual data type if known
  try {
    // Dispatch pending action
    dispatch(hotelActions.fetchHotelDetailsPending());

    const response: FetchHotelDataResponse = await axiosGet("/hotel/get-user-hotel");
    const data = response.data;

    // Dispatch success action to update Redux state
    dispatch(hotelActions.fetchHotelDetailsSuccess(data));

    return data; // Return the data in case it's needed
  } catch (error: any) {
    console.error("Error fetching hotel data:", error);

    // Dispatch failure action
    dispatch(hotelActions.fetchHotelDetailsFailure((error as FetchHotelDataError).message));

    throw error; // Re-throw the error for further handling
  }
}
