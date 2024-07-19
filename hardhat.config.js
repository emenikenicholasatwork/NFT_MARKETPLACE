const { url } = require("inspector");
require("dotenv").config();
const { env, config } = require("process");
const { accounts } = require("web3/lib/commonjs/eth.exports");
const { solidity, networks } = require("./hardhat.config");
const { log } = require("console");
require("@nomicfoundation/hardhat-toolbox");
const sopolia_api_key = process.env.INFURA_API_KEY;
console.log(sopolia_api_key);

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  }
};
