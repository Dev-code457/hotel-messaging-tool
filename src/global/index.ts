import { toast } from "sonner";


export async function fetchHotelData(token: string) {
  try {
    // Send the token in the Authorization header with a Cache-Control header to avoid caching
    const response = await fetch('https://dc0uc29zl4vtv.cloudfront.net/api/hotel/get-user-hotel', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });

    // Check if the response is OK
    if (!response.ok) {
      throw new Error('Error fetching hotel data');
    }


    // Parse the JSON data from the response
    const data = await response.json();
    toast.success(JSON.stringify(data))
    console.log(data);

    return data;
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    throw error;
  }
}
