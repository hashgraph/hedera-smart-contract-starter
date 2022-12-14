import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { JSON_RPC_URL, ECDSA_PRIVATE_KEY } = process.env;

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hedera",
  networks: {
    hardhat: {},
    hedera: {
      url: JSON_RPC_URL || "",
      gas: "auto",
      gasPrice: "auto",
      accounts: [ECDSA_PRIVATE_KEY || ""]
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
