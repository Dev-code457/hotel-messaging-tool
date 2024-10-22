import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Define the response types
interface ApiResponse<T = any> {
    data: T;
    message?: string;
}

interface ErrorResponse {
    message: string;
}

// Create an instance of Axios
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    // Extract token from cookies
    const token = document.cookie.split('; ').find(row => row.startsWith('_session='))?.split('=')[1];

    // Check if the request URL does not contain login or signup
    if (token && !config.url?.includes('/signup') && !config.url?.includes('/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Debugging: Log the request details
    console.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
    });

    return config;
}, (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

// Handle response
const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    // Debugging: Log the response details
    console.debug(`Response: ${response.status} ${response.config.url}`, response.data);

    return response.data.data; // Adjust based on your API structure
};

// Handle errors
const handleError = (error: any): never => {
    if (error.response) {
        console.error('Response Error:', error.response.data);
        throw new Error(error.response.data.message || "Something went wrong!");
    } else if (error.request) {
        console.error('No response received from server:', error);
        throw new Error("No response received from server");
    } else {
        console.error('Unexpected Error:', error.message);
        throw new Error(error.message || "An unexpected error occurred");
    }
};

// Make a request
const makeRequest = async <T, U>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: U | null
): Promise<T> => {
    try {
        const response = await axiosInstance({ method, url, data } as AxiosRequestConfig);
        return handleResponse<T>(response);
    } catch (error) {
        handleError(error);
        throw error;
    }
};

// Export specific request methods
export const axiosGet = <T>(url: string): Promise<T> => makeRequest<T, null>("get", url);
export const axiosPost = <T, U>(url: string, data: U): Promise<T> => makeRequest<T, U>("post", url, data);
export const axiosPut = <T, U>(url: string, data: U): Promise<T> => makeRequest<T, U>("put", url, data);
export const axiosDelete = <T>(url: string): Promise<T> => makeRequest<T, null>("delete", url);
