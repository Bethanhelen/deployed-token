require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

import { HardhatUserConfig } from "hardhat/config";


module.exports = {
    solidity: "0.8.0",
    networks: {
        goerli: {
            url: process.env.INFURA_GOERLI_ENDPOINT,
            accounts: [process.env.PRIVATE_KEY]
        }
    }
};