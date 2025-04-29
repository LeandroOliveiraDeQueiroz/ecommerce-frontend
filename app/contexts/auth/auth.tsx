import { createContext, useCallback, useContext, useEffect, useMemo, useState, } from "react";
import type { PropsWithChildren } from 'react';
import type { AuthContextData, TUser } from "./types";

export const AuthContext = createContext<AuthContextData>({
    isAuthenticated: false,
    loading: true,
    userData: null,
    login: () => { },
    logOut: () => { },
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [user, setUser] = useState<TUser | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const name = localStorage.getItem('name');

        if (storedToken) {
            setIsAuthenticated(true);
            setUser({ name: name || "", accessToken: storedToken })
        } else {
            setIsAuthenticated(false);
        }
        setLoading(false);
    }, []);


    const login = useCallback((user: TUser) => {
        localStorage.setItem('authToken', user.accessToken);
        localStorage.setItem('name', user.name);
        setUser(user);
        setIsAuthenticated(true);
    }, []);

    const logOut = useCallback(() => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.clear();
    }, [])


    const value = useMemo(() => ({
        login, userData: user, isAuthenticated, loading, logOut,
    }), [login, user, isAuthenticated, loading, logOut,])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => {
    return useContext(AuthContext);
}