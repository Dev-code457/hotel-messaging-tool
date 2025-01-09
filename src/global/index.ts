import { axiosGet } from "@/utils/axiosUtility";


interface FetchHotelDataResponse {
  data: any; // Replace 'any' with the actual data type if known
}

interface FetchHotelDataError {
  message: string;
}

export async function fetchHotelData(): Promise<any> { // Replace 'any' with the actual data type if known
  try {
    // Dispatch pending action


    const response: FetchHotelDataResponse = await axiosGet("/hotel/get-user-hotel");
    const data = response.data;



    return data; 
  } catch (error: any) {
    console.error("Error fetching hotel data:", error)

    throw error; // Re-throw the error for further handling
  }
}
