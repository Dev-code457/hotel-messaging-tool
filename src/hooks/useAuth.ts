import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginSuccess } from '@/redux/slices/authSlices';
import { useDispatch } from 'react-redux';
import { axiosPost } from '@/utils/axiosUtility';
import * as yup from 'yup';

interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    signUp: (email: string, password: string, hotelName: string) => Promise<void>;
}

interface LoginResponse {
    message: string;
    email: string;
    password: string;
}

const useAuth = (): AuthContext => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const dispatch = useDispatch();

    // Validation schemas using yup
    const loginSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required'),
    });

    const signUpSchema = yup.object().shape({
        email: yup.string().email('Invalid email address').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        hotelName: yup.string().required('Hotel name is required'),
    });

    useEffect(() => {
        const token = Cookies.get('_session');
        if (token) {
            dispatch(loginSuccess(token));
        }
        setLoading(false);
    }, []);

    const validate = async (data: { email: string; password: string; hotelName?: string }, type: 'login' | 'signup') => {
        try {
            const schema = type === 'login' ? loginSchema : signUpSchema;
            await schema.validate(data, { abortEarly: false });
            return { isValid: true };
        } catch (error: any) {
            const validationErrors = error.inner.reduce((acc: any, err: any) => {
                acc[err.path] = err.message;
                return acc;
            }, {});
            return { isValid: false, errors: validationErrors };
        }
    };

    const login = async (email: string, password: string) => {
        const validation = await validate({ email, password }, 'login');
        if (!validation.isValid) {
            toast.error(Object.values(validation.errors).join(', '));
            return;
        }

        setLoading(true);
        try {
            const response = await axiosPost<{ token: string; message: string }, LoginResponse>('/api/auth/login', {
                email,
                password,
                message: '',
            });
            Cookies.set('__session', response.data.token, { expires: 7 });
            dispatch(loginSuccess(response.data.token));
            router.push('/AddNumber');
            toast.success('Login successful!');
        } catch (error: any) {
            toast.error(error.message || 'An unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    const signUp = async (email: string, password: string, hotelName: string) => {
        const validation = await validate({ email, password, hotelName }, 'signup');
        if (!validation.isValid) {
            toast.error('Validation failed: ' + Object.values(validation.errors).join(', '));
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post<{ token: string; message: string }>('/api/auth/signup', { email, password, hotelName });
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
