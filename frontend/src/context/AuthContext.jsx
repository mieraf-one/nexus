import { createContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshUser } from "../auth/auth.api";
import { getUsername } from "../utils/token";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

    const login = async (username, password) => {
        try {
            await loginUser(username, password);
            setIsAuthenticated(true);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const username = () => getUsername()

    const logout = () => {
        try {
            setIsAuthenticated(false);
            logoutUser();
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const refresh = async () => {
        try {
            await refreshUser();
        } catch (error) {
            throw new Error(error.message);
        }
    }


    return (
        <AuthContext.Provider value={{
            login,
            logout,
            refresh,
            isAuthenticated,
            username
        }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;