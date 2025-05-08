import api from './api';

type LoginResponse = {
    token: string;
};

export const login = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await api.post<LoginResponse>('/auth/login', {
            email,
            password,
        });

        if (response.data?.token) {
            localStorage.setItem('token', response.data.token);
            setAuthHeader();
            
            return true;
        }
        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
    delete api.defaults.headers['Authorization'];
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const setAuthHeader = (): void => {
    const token = getToken();
    if (token) {
        document.cookie = `token=${token}; path=/; secure; samesite=strict`;
    }
};