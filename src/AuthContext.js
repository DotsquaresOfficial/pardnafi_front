
import { createContext, useContext, useState, useEffect } from "react";
import { getWalletServicesPluginInstance, getWeb3AuthEVMInstance } from "./Components/auth/web3auth";
import { WALLET_ADAPTERS } from "@web3auth/base";
import Web3 from "web3";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [web3Initilized,setWeb3Initilized]=useState(false);
    const [provider,setProvider]=useState(null);
    const [walletAddress,setWalletAddress]=useState(null);
    const [walletBalance,setWalletBalance]=useState(null);
    const [authenticated, setAuthenticated] = useState(localStorage?.getItem("jwtToken") ? true : false);

    const getUserWalletBalanceAndAccount = async () => {
        try {
              const provider = getWeb3AuthEVMInstance().provider;
              const web3 = new Web3(provider);
              const accounts = await web3.eth.getAccounts();
               if(accounts.length>0){
                setProvider(provider);
                const balanceWei = await web3.eth.getBalance(accounts[0]);
                const balance = web3.utils.fromWei(balanceWei, "ether");
                setWalletAddress(accounts[0]);
                setWalletBalance(balance);
               
               }
        } catch (error) {
          console.log(error, "error")
        }
      }

    useEffect(() => {
        if (localStorage?.getItem("jwtToken")) {
            login();
        }
    }, [])

    const login = async () => {
        debugger;
        setAuthenticated(true);
          await  initializeWeb3AuthEVMInstance();
          await  getUserWalletBalanceAndAccount();
    };

    const logout = async () => {
        await getWeb3AuthEVMInstance().logout();
        setAuthenticated(false);
    };

    const connectWallet = async (email) => {
        debugger;
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
        }
        try {
            await getWeb3AuthEVMInstance().connectTo(WALLET_ADAPTERS.AUTH, {
                loginProvider: "email_passwordless",
                extraLoginOptions: {
                 login_hint: email, // email to send the OTP to
                },
              });

              try{
                await getUserWalletBalanceAndAccount();
              }catch(ex){
                console.log(ex);
                return false;
              }
              return true;
        } catch (ex) {
            console.log(ex);
            return false;
        }
    }

    const initializeWeb3AuthEVMInstance = async ()=>{
        try{
            debugger;
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
        <AuthContext.Provider value={{ authenticated, login, logout, connectWallet,initializeWeb3AuthEVMInstance ,provider,walletAddress,walletBalance}}>
            {children}
        </AuthContext.Provider>
    );
};