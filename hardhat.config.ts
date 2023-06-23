import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: '0.8.6',
  networks: {
    hederaTestnet: {
      url: "https://testnet.hashio.io/api",
      chainId: 296,
      accounts: [process.env.ECDSA_PRIVATE_KEY || ''], // Private key of your account
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 3 
    }
  }
  
};

export default config;