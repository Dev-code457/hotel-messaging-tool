
export async function fetchHotelData() {
    try {
      const response = await fetch('/api/ChangeHotel-Details');  // Replace this with your actual API endpoint
      const data = await response.json();
      if (response.ok) {
        return data;  // Success
      } else {
        throw new Error(data.message || 'Failed to fetch hotel data');
      }
    } catch (error) {
      console.error("Error fetching hotel data:", error);
      throw error;
    }
  }