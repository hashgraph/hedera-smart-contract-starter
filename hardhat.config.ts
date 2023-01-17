import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "@openzeppelin/hardhat-upgrades";

dotenv.config();

const { JSON_RPC_URL } = process.env;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        /// Note: A “runs” parameter of “1” will produce short but expensive code.
        ///       In contrast, a larger “runs” parameter will produce longer but more gas efficient code.
        ///       The maximum value of the parameter is 2**32-1. So it could change as required.
        runs: 13000,
      },
    },
  },
  networks: {
    remoteRelay: {
      url: JSON_RPC_URL,
    },
    hardhat: {
      allowUnlimitedContractSize: true,
    },
  },
};

export default config;
