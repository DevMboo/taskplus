import api from './api';

export const login = async (email: string, password: string): Promise<boolean> => {
    try {
        const response = await api.post('/auth/login', {
            email,
            password,
        });

        const { token } = response.data;
        if (token) {
            localStorage.setItem('token', token);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Erro no login:', error);
        return false;
    }
};

export const registerUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/register', {
            email,
            password
        });
        return response.data; 
    } catch (error) {
        throw new Error('Erro ao registrar usuário');
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('token');
    if (token) {
        return true;
    }
    return false;
};

export const getToken = (): string | null => {
    return localStorage.getItem('token');
};

export const setAuthHeader = (): void => {
    const token = getToken();
    if (token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
};
