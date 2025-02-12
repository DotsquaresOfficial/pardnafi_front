
import { createContext, useContext, useState, useEffect } from "react";
import { getWeb3AuthEVMInstance } from "./Components/auth/web3auth";
import { WALLET_ADAPTERS } from "@web3auth/base";

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

    const connectWallet = async (email) => {
        if(!email){
            return;
        }
        debugger;
       

        try {
            await getWeb3AuthEVMInstance().init();
        } catch (ex) {
            console.log(ex)
        }

        try{
            await getWeb3AuthEVMInstance().logout();
        }catch(error){
          console.error("Web3Auth error:", error);
        }
        try {
            await getWeb3AuthEVMInstance().connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: "email_passwordless",
                extraLoginOptions: {
                 login_hint: email, // email to send the OTP to
                },
              });
        } catch (ex) {
            console.log(ex)
        }
    }

    return (
        <AuthContext.Provider value={{ authenticated, login, logout, connectWallet }}>
            {children}
        </AuthContext.Provider>
    );
};