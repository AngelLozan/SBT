require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-etherscan");
const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {
    },
    // rinkeby: {
    //   url: API_URL,
    //   accounts: [`0x${PRIVATE_KEY}`]
    // },
    mumbai: {
      url: "https://polygon-mumbai.infura.io/v3/3d67dbef6f8b488780529a324416cb0d",
      accounts: [`0x${privateKey}`]
    },
    matic: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
    }
  },
  etherscan: {
    // Your API key for polygonscan
    // Obtain one at https://etherscan.io/
    apiKey: "IEWXGI1H89D4V49UAQVIE1GT7ZC75QU8KX"
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

