import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { isAuthenticated } from '@/services/authService';

type AuthContextType = {
    isAuthenticated: boolean;
    setAuthState: (state: { isAuthenticated: boolean }) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [authState, setAuthState] = useState({
        isAuthenticated: false
    });

    useEffect(() => {
        setAuthState({ isAuthenticated: isAuthenticated() });
    }, []);

    return (
        <AuthContext.Provider value={{ ...authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}