
import { createContext, useContext, useState, useEffect } from "react";
import { getWeb3AuthEVMInstance } from "./Components/auth/web3auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authenticated, setAuthenticated] = useState(localStorage?.getItem("jwtToken") ? true : false);

    useEffect(() => {
        if (localStorage?.getItem("jwtToken")) {
            setAuthenticated(true);
        }
    }, [])




    const login = () => {

        setAuthenticated(true);
    };

    const logout = () => {

        setAuthenticated(false);
    };

    const connectWallet = async () => {
        await getWeb3AuthEVMInstance().initModal()
        await getWeb3AuthEVMInstance().connect()
    }

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, connectWallet }}>
            {children}
        </AuthContext.Provider>
    );
};