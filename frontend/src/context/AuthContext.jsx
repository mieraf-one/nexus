import { createContext, useState } from "react";
import { getReq } from "../utils/utils";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access'));
    const [user, setUser] = useState(null);

    const login = async ({access, refresh}) => {
        localStorage.setItem('access', access);
        localStorage.setItem('refresh', refresh);
        try {
            const profile = await getReq('user/profile/');
            setUser(profile);
            setIsAuthenticated(true);
            console.log(profile);
        } catch (err) {
            console.log('logout')
            logout();
        }
        
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
            user
        }}
        >
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;