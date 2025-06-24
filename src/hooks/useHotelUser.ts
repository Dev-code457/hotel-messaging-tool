// useHotelData.tsx
import { useState, useEffect } from 'react';

interface HotelData {
  User: {
    name: string;
    email: string;
    planType: string;
    messageLimit: number;
    templates: number;
    customerLimit?: number;
  };
  hotel: {
    hotelName: string;
    address: string;
    contactNumber: string;
    email: string;
  };
  timestamp: string;
}

// This is your custom hook
export function useHotelData() {
  const [data, setData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);  // Default state is loading
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (signal?: AbortSignal) => {
    setLoading(true); // Set loading to true when fetching new data
    try {
      const token = localStorage.getItem("__temp");
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}hotel/get-user-hotel`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          signal
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const newData = await response.json();

      // Only update if the timestamp is newer
      if (!data || new Date(newData.timestamp) > new Date(data.timestamp)) {
        setData(newData);
      }

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false); // Set loading to false after the fetch is done
    }
  };

  // Initial fetch
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  // Periodic refresh (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refetch = () => fetchData(); // Refetch function to trigger data fetch

  return { data, loading, error, refetch };
}
