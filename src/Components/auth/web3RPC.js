import Web3 from "web3";

// Get the chain ID
const getChainId = async (provider) => {
  try {
    const web3 = new Web3(provider);

    // Get the connected Chain's ID
    const chainId = await web3.eth.getChainId();
    return chainId.toString();
  } catch (error) {
    return error;
  }
};

// Get user's Ethereum public address
const getAccounts = async (provider) => {
  try {
    const web3 = new Web3(provider);

    // Get user's accounts
    const accounts = await web3.eth.getAccounts();

    // Return the first account
    return accounts[0];
  } catch (error) {
    return error;
  }
};

// Get user's balance in ether
const getBalance = async (provider) => {
  try {
    const web3 = new Web3(provider);

    // Get user's account
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    // Get balance in ether
    const balanceWei = await web3.eth.getBalance(address);
    const balance = web3.utils.fromWei(balanceWei, "ether");

    return balance;
  } catch (error) {
    return error;
  }
};

// Sign a message
const signMessage = async (provider) => {
  try {
    const web3 = new Web3(provider);

    // Get user's account
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    const originalMessage = "YOUR_MESSAGE";

    // Sign the message
    const signedMessage = await web3.eth.personal.sign(originalMessage, address, "");
    return signedMessage;
  } catch (error) {
    return error;
  }
};

export { getChainId, getAccounts, getBalance, signMessage };
