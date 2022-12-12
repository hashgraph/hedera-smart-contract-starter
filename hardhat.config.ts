import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hedera",
  networks: {
    hardhat: {},
    hedera: {
      url: process.env.JSON_RPC_URL || "",
      chainId: 296,
      gas: "auto",
      gasPrice: "auto",
      accounts: [process.env.PRIVATE_KEY || ""]
    },
  },
  paths: {
    sources: "./contracts",
    cache: "./cache",
    artifacts: "./artifacts"
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 24000,
      },
    },
  },
};

export default config;
