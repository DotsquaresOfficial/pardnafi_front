

// IMP START - Quick Start
import { CHAIN_NAMESPACES, IAdapter, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { AuthAdapter } from "@web3auth/auth-adapter";
// IMP END - Blockchain Calls

// BJC_Lk_RKd9cDnYG0qVP7T71FCXG7qcYVllK9kc_5FRScB4FSAlnxNYFNEbcvfUaFBeOPu-w9ljRujxBPaynJ1Q - Last Client Id
const clientId = "BNMK_l8_e5oXo1wmXUSD8J3e2zwPnfQf24OHMQJHVAkqS57zg23BlBah4sPTlelveLOIQfsZiaczqUz_BjBK8NQ"

const chainConfigEVM = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34", // Chain ID for Sepolia Testnet
  rpcTarget: "https://sepolia.base.org", // Sepolia RPC endpoint
  displayName: "Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.basescan.org", // Sepolia Etherscan
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", // Same Ethereum logo
};

let web3authEVM;
let walletServicesPlugin;

const initWeb3Auth=async ()=>{
const privateKeyProviderEVM = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfigEVM },
});


const web3AuthOptionsEVM = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProviderEVM,
  uiConfig: {
    appName: "Pardna Fi",
    appUrl: "https://pardnafi-front.vercel.app/",
    logoLight: "https://pardnafi-front.vercel.app/images/logo/logo.svg",
    logoDark: "https://pardnafi-front.vercel.app/images/logo/logo.svg",
    defaultLanguage: "en",
    mode: "light", 
    theme: {
      primary: "#001C93",
    },
    useLogoLoader: true,
  },
}

web3authEVM = new Web3AuthNoModal(web3AuthOptionsEVM);

walletServicesPlugin = new WalletServicesPlugin({
  wsEmbedOpts: {},
  walletInitOptions: { whiteLabel: { showWidgetButton: true } },
});
web3authEVM.addPlugin(walletServicesPlugin); // Add the plugin to web3auth

const authadapter = new AuthAdapter();
web3authEVM.configureAdapter(authadapter);

await web3authEVM.init();
}



const getWeb3AuthEVMInstance = () => {
  return web3authEVM;
}

const getWalletServicesPluginInstance = () => {
  return walletServicesPlugin;
}


export { getWeb3AuthEVMInstance ,getWalletServicesPluginInstance ,initWeb3Auth};