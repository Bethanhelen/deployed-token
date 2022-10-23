require("@nomicfoundation/hardhat-toolbox");


const ALCHEMY_API_KEY = "6piHhA9VKwxp7GOuHJ_9B4QargwXpE5m";
const GOERLI_PRIVATE_KEY = "b1c016d8640e61d716378fea9fa98f86126efcbf26fca9064f252ea34697fe5b";

module.exports = {
    solidity: "0.8.0",
    networks: {
        goerli: {
            url: `https://eth-goerli.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY]
        }
    }
};