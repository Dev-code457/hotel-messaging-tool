// hooks/useAuth.ts

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { loginSuccess } from '@/redux/slices/authSlices';
import { useDispatch } from 'react-redux';

interface AuthContext {
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const useAuth = (): AuthContext => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get('_session');
        if (token) {
            dispatch(loginSuccess(token))
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const response = await axios.post<{ token: string; message: string }>('/api/auth/login', { email, password });
            Cookies.set('_session', response.data.token, { expires: 7 });
            dispatch(loginSuccess(response.data.token))
            router.push('/CheckInOut');
            toast.success('Login successful!');
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

    return { isAuthenticated, loading, login, logout };
};

export default useAuth;
