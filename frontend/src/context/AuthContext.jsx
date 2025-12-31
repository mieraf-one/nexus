import { createContext, useState } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));

    const login = async ({access, refresh}) => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        setIsAuthenticated(true);
    }
    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            login,
            logout,
            isAuthenticated,
        }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;