
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


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


const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): T => {
    return response.data.data; // Adjust based on your API structure
};

// Handle errors
const handleError = (error: any): never => {
    if (error.response) {
        throw new Error(error.response.data.message || "Something went wrong!");
    } else if (error.request) {
        throw new Error("No response received from server");
    } else {
        throw new Error(error.message || "An unexpected error occurred");
    }
};


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
    }
};

// Export specific request methods
export const axiosGet = <T>(url: string): Promise<T> => makeRequest<T, null>("get", url);
export const axiosPost = <T, U>(url: string, data: U): Promise<T> => makeRequest<T, U>("post", url, data);
export const axiosPut = <T, U>(url: string, data: U): Promise<T> => makeRequest<T, U>("put", url, data);
export const axiosDelete = <T>(url: string): Promise<T> => makeRequest<T, null>("delete", url);
