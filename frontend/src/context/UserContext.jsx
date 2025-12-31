import { createContext, useEffect, useState } from "react";
import { getReq } from "../utils/utils";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false); 

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await getReq('user/profile/');
            setUser(res);
        } catch (err) {
            // setUser(null);
        } finally {
            setLoading(false);
        };
    }

    useEffect(() => {        
        fetchUser();
    }, [])

    return (
            <UserContext.Provider value={{
                user,
                loading
            }}>
                {children}
            </UserContext.Provider>
    );
}

export default UserProvider;