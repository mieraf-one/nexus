import { createContext, useEffect, useState } from "react";
import { loginUser, logoutUser, refreshUser } from "../auth/auth.api";

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
        }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;