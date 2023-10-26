import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({ user: null, token: "" })
    useEffect(() => {
        const data = localStorage.getItem("auth");
        // console.log("json data", data);
        if (data) {
            const parseData = JSON.parse(data)
            setAuth({
                ...parseData
            });
        }
    }, []);
    // console.log("auth data", auth);
    return (
        <>
            <AuthContext.Provider value={[auth, setAuth]}>
                {children}
            </AuthContext.Provider>
        </>
    )
}

// custom hook
const useAuth = () => useContext(AuthContext)
export { useAuth, AuthProvider }