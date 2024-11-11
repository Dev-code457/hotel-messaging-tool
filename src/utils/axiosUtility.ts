import axios, { AxiosRequestConfig, AxiosResponse } from "axios";


interface ApiResponse<T> {
    data: T;
    message?: string;
    [key: string]: any;
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
    const token = document.cookie.split('; ').find(row => row.startsWith('__session='))?.split('=')[1];
    const tempToken = document.cookie.split('; ').find(row => row.startsWith('temp_session='))?.split('=')[1];
    console.log('Cookies:', document.cookie);

    // Check if the request URL does not contain login or signup
    if (token && !config.url?.includes('/signup') && !config.url?.includes('/login')) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    if (tempToken && config.url?.includes('/login')) {
        config.headers.Authorization = `Bearer ${tempToken}`;
    }


    console.debug(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
        headers: config.headers,
        data: config.data,
    });

    return config;
}, (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
});

const handleResponse = <T>(response: AxiosResponse<ApiResponse<T>>): AxiosResponse<ApiResponse<T>> => {

    return response;
};


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

const makeRequest = async <T, U>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    data?: U | null
): Promise<AxiosResponse<ApiResponse<T>>> => {
    try {
        const response = await axiosInstance({ method, url, data } as AxiosRequestConfig);
        return handleResponse<T>(response);


    } catch (error) {
        handleError(error);
        throw error;
    }
};

export const axiosGet = <T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> =>
    makeRequest<T, null>("get", url);

export const axiosPost = <T, U>(url: string, data: U): Promise<AxiosResponse<ApiResponse<T>>> =>
    makeRequest<T, U>("post", url, data);

export const axiosPut = <T, U>(url: string, data: U): Promise<AxiosResponse<ApiResponse<T>>> =>
    makeRequest<T, U>("put", url, data);

export const axiosDelete = <T>(url: string): Promise<AxiosResponse<ApiResponse<T>>> =>
    makeRequest<T, null>("delete", url);

