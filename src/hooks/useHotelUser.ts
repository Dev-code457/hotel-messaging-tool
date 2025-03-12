// Create a custom hook for real-time data fetching
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

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

export function useHotelData() {
  const [data, setData] = useState<HotelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async (signal?: AbortSignal) => {
    try {
      const token = localStorage.getItem("__temp");
      if (!token) throw new Error('No token found');

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/hotel/get-user-hotel`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          },
          signal // Add abort signal
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const newData = await response.json();
      
      // Compare timestamps to ensure we're getting fresh data
      if (!data || new Date(newData.timestamp) > new Date(data.timestamp)) {
        setData(newData);
      }
      
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err : new Error('Unknown error'));
      toast.error('Failed to fetch latest data');
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    return () => controller.abort();
  }, []);

  // Set up periodic refresh (every 30 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const refetch = () => fetchData();

  return { data, loading, error, refetch };
}
