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

// Send a transaction
// const sendTransaction = async (provider) => {
//   try {
//     const web3 = new Web3(provider);

//     // Get user's account
//     const accounts = await web3.eth.getAccounts();
//     const sender = accounts[0];

//     const destination = "0x40e1c367Eca34250cAF1bc8330E9EddfD403fC56";
//     const amount = web3.utils.toWei("0.001", "ether");

//     // Estimate gas and fees
//     const gasPrice = await web3.eth.getGasPrice();
//     const gasLimit = await web3.eth.estimateGas({
//       from: sender,
//       to: destination,
//       value: amount,
//     });

//     // Create and send the transaction
//     const tx = await web3.eth.sendTransaction({
//       from: sender,
//       to: destination,
//       value: amount,
//       gas: gasLimit,
//       gasPrice,
//     });

//     return tx;
//   } catch (error) {
//     return error;
//   }
// };

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
