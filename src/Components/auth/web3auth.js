

// IMP START - Quick Start
import { CHAIN_NAMESPACES, IAdapter, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { getDefaultExternalAdapters } from "@web3auth/default-evm-adapter";
import { WalletServicesPlugin } from "@web3auth/wallet-services-plugin";

import { CommonPrivateKeyProvider } from "@web3auth/base-provider";
// IMP END - Blockchain Calls

// IMP START - Dashboard Registration
// const clientId = "BPi5PB_UiIZ-cPz1GtV5i1I2iOSOHuimiXBI0e-Oe_u6X3oVAbCiAZOTEBtTXw4tsluTITPqA8zMsfxIKMjiqNQ"; // get from https://dashboard.web3auth.io
const clientId = "BFiU84sd-mL3gBYJO4Ym9rkw_CLKdGBEzN97Ex2BPwghHxX2jC_v2p-lYkP7ur-H7P6_M_FfnwA21HVlnDCOroE"
// IMP END - Dashboard Registration

// IMP START - Chain Config
const chainConfigNear = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: "0x4e454152",
  rpcTarget: "https://mainnet.aurora.dev",
  // Avoid using public rpcTarget in production.
  displayName: "Near",
  blockExplorerUrl: "https://aurorascan.dev",
  ticker: "NEAR",
  tickerName: "NEAR",
};


const chainConfigEVM = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1",
  rpcTarget: "https://rpc.ankr.com/eth",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io",
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
// IMP END - Chain Config

// IMP START - SDK Initialization
const privateKeyProviderEVM = new EthereumPrivateKeyProvider({
  config: { chainConfig:chainConfigEVM },
});

const privateKeyProviderNear = new CommonPrivateKeyProvider({
  config: { chainConfig:chainConfigNear },
});

const web3AuthOptionsEVM = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProviderEVM,
}

const web3AuthOptionsNear = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  privateKeyProvider: privateKeyProviderNear,
}
const web3authEVM = new Web3Auth(web3AuthOptionsEVM);
const web3authNear = new Web3Auth(web3AuthOptionsNear);
// IMP END - SDK Initialization

// IMP START - Configuring External Wallets
const adapters = await getDefaultExternalAdapters({ options: web3AuthOptionsEVM });
      adapters.forEach((adapter) => {
        web3authEVM.configureAdapter(adapter);
      });

// IMP END - Configuring External Wallets

const walletServicesPlugin = new WalletServicesPlugin();
web3authEVM.addPlugin(walletServicesPlugin); 


const getWeb3AuthEVMInstance=()=>{ debugger
    return web3authEVM;
}
const getWeb3AuthNearInstance=()=>{
  return web3authNear;
}
const getWalletServicesPluginInstance=()=>{
  return walletServicesPlugin;
}

export {getWeb3AuthEVMInstance,getWeb3AuthNearInstance,getWalletServicesPluginInstance};