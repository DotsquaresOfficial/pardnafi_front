
import { createContext, useContext, useState, useEffect } from "react";
import { getWeb3AuthEVMInstance } from "./Components/auth/web3auth";
import { WALLET_ADAPTERS } from "@web3auth/base";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [web3Initilized,setWeb3Initilized]=useState(false);
    const [authenticated, setAuthenticated] = useState(localStorage?.getItem("jwtToken") ? true : false);

    useEffect(() => {
        if (localStorage?.getItem("jwtToken")) {
            setAuthenticated(true);
            initializeWeb3AuthEVMInstance();
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
            return false;
        }
       
        try {
            if(!web3Initilized){
                await getWeb3AuthEVMInstance().init();
                 setWeb3Initilized(true);
            }
        } catch (ex) {
            console.log(ex);
            return false;
        }

        try{
            await getWeb3AuthEVMInstance().logout();
        }catch(error){
          console.error("Web3Auth error:", error);
          return false;
        }
        try {
            await getWeb3AuthEVMInstance().connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: "email_passwordless",
                extraLoginOptions: {
                 login_hint: email, // email to send the OTP to
                },
              });
              return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    const initializeWeb3AuthEVMInstance = async ()=>{
        try{
        if(!web3Initilized){
            await getWeb3AuthEVMInstance().init();
            setWeb3Initilized(true);
        }
          return true;
        }catch(ex){
          return false;
        }
      }


    return (
        <AuthContext.Provider value={{ authenticated, login, logout, connectWallet,initializeWeb3AuthEVMInstance }}>
            {children}
        </AuthContext.Provider>
    );
};