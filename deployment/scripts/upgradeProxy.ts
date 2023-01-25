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

import {
  ContractExecuteTransaction,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import ClientManagement from "../../utils/ClientManagement";

import { ContractService } from "../../service/ContractService";
const contractService = new ContractService();
const clientManagement = new ClientManagement();

let contractId = "";

const client = clientManagement.createClientAsAdmin();
const { adminKey } = clientManagement.getAdmin();

const getAdmin = async () => {
  const liquidityPool = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2000000)
    .setFunction("implementation", new ContractFunctionParameters())
    .freezeWith(client)
    .sign(adminKey);
  const liquidityPoolTx = await liquidityPool.execute(client);
  const response = await liquidityPoolTx.getRecord(client);
  const adminAddress = response?.contractFunctionResult?.getInt64(0);
  console.log(`Impl address: ${String(adminAddress)}`);

  const liquidityPool1 = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2000000)
    .setFunction("admin", new ContractFunctionParameters())
    .freezeWith(client)
    .sign(adminKey);
  const liquidityPoolTx1 = await liquidityPool1.execute(client);
  const response1 = await liquidityPoolTx1.getRecord(client);
  const adminAddress1 = response1?.contractFunctionResult?.getInt64(0);
  console.log(`Admin address: ${String(adminAddress1)}`);
};

const upgradeTo = async (newImplementation: string) => {
  const liquidityPool = await new ContractExecuteTransaction()
    .setContractId(contractId)
    .setGas(2000000)
    .setFunction(
      "upgradeTo",
      new ContractFunctionParameters().addAddress(newImplementation)
    )
    .freezeWith(client)
    .sign(adminKey);
  const liquidityPoolTx = await liquidityPool.execute(client);
  const transferTokenRx = await liquidityPoolTx.getReceipt(client);
  console.log(`upgradedTo: ${String(transferTokenRx?.status)}`);
};

async function main() {
  const contractName = process.env.CONTRACT_NAME || '';
  const contractProxy = contractService.getContractWithProxy(contractName);
  contractId = String(contractProxy?.transparentProxyId);
  const contractGettingUpgraded = contractService.getContract(contractName);
  await getAdmin();
  await upgradeTo(contractGettingUpgraded.address);
  const updatedContract = {
    ...contractProxy,
    address: contractGettingUpgraded.address,
    id: contractGettingUpgraded.id,
    hash: contractGettingUpgraded.hash,
    timestamp: new Date().toISOString(),
  };
  contractService.updateContractRecord(
    updatedContract,
    contractGettingUpgraded
  );
  await getAdmin();
}

main()
  .catch((error) => console.error(error))
  .finally(() => process.exit(1));