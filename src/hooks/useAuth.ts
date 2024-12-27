// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginSuccess } from '@/redux/slices/authSlices';
import { useDispatch } from 'react-redux';
import { axiosPost } from '@/utils/axiosUtility';

interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signUp: (email: string, password: string, hotelName: string) => Promise<void>;
}


interface LoginResponse {
    message: string;
    email: string
    password: string
}
interface SignUpResponse {
    hotelName: string;
    email: string
    password: string
}

const useAuth = (): AuthContext => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('_session');
        if (token) {
            dispatch(loginSuccess(token));
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axiosPost<{ token: string; message: string }, LoginResponse>('http://localhost:3000/api/auth/login', {
                email, password,
                message: ''
            });
            console.log(response);

            Cookies.set('__session', response.data.data.token, { expires: 7 });
            localStorage.setItem('__temp', response.data.data.token);
            dispatch(loginSuccess(response.data.data.token));
            router.push('/AddNumber');
            toast.success(response.data.message);
        } catch (error: any) {
            console.log(error);
            toast.error(error.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, hotelName: string) => {
        setLoading(true);
        try {
            const response = await axiosPost<{ token: string; message: string }, SignUpResponse>('http://localhost:3000/api/auth/signup', {
                email,
                password,
                hotelName,
            });
            Cookies.set('temp_session', response.data.token, { expires: 7 });
            router.push('/');
            toast.success('SignUp Success');
        } catch (error: any) {
            toast.error(error?.response?.data?.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove('_session');
        setIsAuthenticated(false);
        router.push('/');
    };

    return { isAuthenticated, loading, login, logout, signUp };
};

export default useAuth;
