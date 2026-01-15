import { createContext, useEffect, useState } from "react";
import { getReq } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import path from "../utils/apiEndPoints";

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            setLoading(true);
            const res = await getReq(path.profile());
            console.log(res);
            setUser(res);
        } catch (err) {
            if (err.message == 401) {
                navigate('/login', {replace: true})
            }
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