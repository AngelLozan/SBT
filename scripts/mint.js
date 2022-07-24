require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/SoulBound.sol/SoulBound.json");

console.log(JSON.stringify(contract.abi));

const contractAddress = "0x2562ffA357FbDd56024AeA7D8E2111ad299766c9";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

  //the transaction
  const tx = {
    'from': PUBLIC_KEY,
    'to': contractAddress,
    'nonce': nonce,
    'gas': 500000,
    'maxPriorityFeePerGas': 2999999999987,
    'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
  };


const signedTx = await web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
const transactionReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
  
console.log(`Transaction receipt: ${JSON.stringify(transactionReceipt)}`);
}


//the ipfs CID is to the metadata, which has the pined jpeg linked inside it with another CID
mintNFT("https://gateway.pinata.cloud/ipfs/QmaoDgnyCpqMQh623uH6uWymrB9Jez6qvZyPiCp6kAixSb");
