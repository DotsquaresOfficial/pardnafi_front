

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
const clientId = "BJC_Lk_RKd9cDnYG0qVP7T71FCXG7qcYVllK9kc_5FRScB4FSAlnxNYFNEbcvfUaFBeOPu-w9ljRujxBPaynJ1Q"
// IMP END - Dashboard Registration


const chainConfigEVM = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x14a34", // Chain ID for Sepolia Testnet
  rpcTarget: "https://sepolia.base.org", // Sepolia RPC endpoint
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode, etc.
  displayName: "Sepolia Testnet",
  blockExplorerUrl: "https://sepolia.basescan.org", // Sepolia Etherscan
  ticker: "ETH",
  tickerName: "Ethereum",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png", // Same Ethereum logo
};

// IMP END - Chain Config

// IMP START - SDK Initialization
const privateKeyProviderEVM = new EthereumPrivateKeyProvider({
  config: { chainConfig: chainConfigEVM },
});


const web3AuthOptionsEVM = {
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider: privateKeyProviderEVM,
}

const web3authEVM = new Web3Auth(web3AuthOptionsEVM);
// IMP END - SDK Initialization

// IMP START - Configuring External Wallets
const adapters = getDefaultExternalAdapters({ options: web3AuthOptionsEVM });
adapters.forEach((adapter) => {
  web3authEVM.configureAdapter(adapter);
});

// IMP END - Configuring External Wallets

const walletServicesPlugin = new WalletServicesPlugin();
web3authEVM.addPlugin(walletServicesPlugin);


const getWeb3AuthEVMInstance = () => {
  
  return web3authEVM;
}

const getWalletServicesPluginInstance = () => {
  return walletServicesPlugin;
}

export { getWeb3AuthEVMInstance, getWalletServicesPluginInstance };