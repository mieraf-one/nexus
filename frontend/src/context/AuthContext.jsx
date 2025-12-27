import { createContext } from "react";

export const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const login = () => {}
    const logout = () => {}


    return (
        <AuthContext.Provider value={{ela: ''}}>
            { children }
        </AuthContext.Provider>
    )
    
}

export default AuthProvider;