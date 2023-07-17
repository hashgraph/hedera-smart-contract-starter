/*-
 *
 * Hedera smart contract starter
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { HardhatUserConfig } from 'hardhat/config';
import '@openzeppelin/hardhat-upgrades';
import '@nomiclabs/hardhat-ethers';
import dotenv from 'dotenv';

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 13000,
      },
    },
  },
  networks: {
    local: {
      url: "http://127.0.0.1:7546",
      chainId: 298,
      accounts: [process.env.ECDSA_PRIVATE_KEY_LOCAL || ''], // Private key generated from 'hedera start -d'
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 3
    },
    testnet: {
      url: "https://testnet.hashio.io/api",
      chainId: 296,
      accounts: [process.env.ECDSA_PRIVATE_KEY_TEST || ''], // Private key of your testnet account
      gas: "auto",
      gasPrice: "auto",
      gasMultiplier: 3
    }
  }
};

export default config;