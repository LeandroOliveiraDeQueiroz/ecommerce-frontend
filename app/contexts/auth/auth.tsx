import { createContext, useCallback, useContext, useMemo, useState, } from "react";
import type { PropsWithChildren } from 'react';
import type { AuthContextData, setLoggedUser } from "./types";

const AuthContext = createContext<AuthContextData>({ isLogged: false, name: "", accessToken: "", setLoggedUser: () => { }, logOut: () => { } });

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [isLogged, setLogged] = useState(false);
    const [name, setName] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const setLoggedUser: setLoggedUser = useCallback((params) => {
        setLogged(true);
        setName(params.name);
        setAccessToken(params.accessToken)
    }, []);

    const logOut = useCallback(() => {
        setLogged(false);
        setName("");
        setAccessToken("")
    }, [])

    const value = useMemo(() => ({
        isLogged, name, accessToken, setLoggedUser, logOut
    }), [isLogged, name, accessToken, setLoggedUser, logOut])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );

}

export const useAuthContext = () => {
    return useContext(AuthContext);
}