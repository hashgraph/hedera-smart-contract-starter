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

import dotenv from "dotenv";
import { AccountId, ContractFunctionParameters } from "@hashgraph/sdk";
import { DeployedContract } from "../../model/contract";
import { ContractService } from "../../service/ContractService";
import { Deployment } from "../../utils/deployContractOnTestnet";
dotenv.config();
const {
  CONTRACT_NAME,
  ADMIN_ID
} = process.env;

const contractService = new ContractService();

export async function main(_contractName: string | null) {
  const contractName = (
    _contractName ?? (CONTRACT_NAME || '')
  );
  console.log(`contractName: ${contractName}`);
  const contractBeingDeployed: DeployedContract =
    contractService.getContract(contractName);
  console.log(`contractName: ${contractBeingDeployed.id}`);
  const contractAddress = contractBeingDeployed.address;
  const adminId = AccountId.fromString(ADMIN_ID || '');
  const deployment = new Deployment();
  const filePath =
    "./artifacts/@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol/TransparentUpgradeableProxy.json";
  const args = new ContractFunctionParameters();
  args.addAddress(contractAddress);
  args.addAddress(adminId.toSolidityAddress());
  args.addBytes(new Uint8Array());
  const { id, address } = await deployment.deployContractAsClient(
    filePath,
    args
  );
  console.log(`TransparentUpgradeableProxy deployed - ${id}`);
  const updatedContract = {
    ...contractBeingDeployed,
    transparentProxyAddress: address,
    transparentProxyId: id,
    timestamp: new Date().toISOString(),
  };
  contractService.updateContractRecord(updatedContract, contractBeingDeployed);
}