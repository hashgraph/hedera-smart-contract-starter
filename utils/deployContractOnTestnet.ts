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
import * as fs from "fs";
import {
  FileCreateTransaction,
  FileAppendTransaction,
  PrivateKey,
  ContractCreateTransaction,
  Client,
  ContractFunctionParameters,
} from "@hashgraph/sdk";
import { ContractService } from "../service/ContractService";
import ClientManagement from "../utils/ClientManagement";
import { Contract } from "../model/contract";

dotenv.config();

export class Deployment {
  private contractService = new ContractService();
  private clientManagement = new ClientManagement();

  public deployContractAsClient = async (
    filePath: string,
    contractConstructorArgs: ContractFunctionParameters = new ContractFunctionParameters()
  ) => {
    return this.deployContract(
      this.clientManagement.createOperatorClient(),
      this.clientManagement.getOperator().key,
      filePath,
      contractConstructorArgs
    );
  };

  private deployContract = async (
    clientArg: Client,
    operatorKey: PrivateKey,
    filePath: string,
    contractConstructorArgs: ContractFunctionParameters = new ContractFunctionParameters()
  ) => {
    console.log(`\nSTEP 1 - Create file`);
    const rawdata = String(fs.readFileSync(filePath));
    const compiledContract = JSON.parse(rawdata) as Contract;
    const contractByteCode = compiledContract.bytecode;

    //Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = await new FileCreateTransaction()
      .setKeys([operatorKey])
      .execute(clientArg);
    const fileCreateRx = await fileCreateTx.getReceipt(clientArg);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`- The smart contract bytecode file ID is: ${String(bytecodeFileId)}`);

    // Append contents to the file
    const fileAppendTx = await new FileAppendTransaction()
      .setFileId(bytecodeFileId ?? "")
      .setContents(contractByteCode)
      .setMaxChunks(100)
      .execute(clientArg);
    await fileAppendTx.getReceipt(clientArg);
    console.log(`- Content added`);

    console.log(`\nSTEP 2 - Create contract`);
    const contractCreateTx = await new ContractCreateTransaction()
      .setAdminKey(operatorKey)
      .setBytecodeFileId(bytecodeFileId ?? "")
      .setConstructorParameters(contractConstructorArgs)
      .setGas(2000000)
      .execute(clientArg);

    const contractCreateRx = await contractCreateTx.getReceipt(clientArg);
    const contractId = String(contractCreateRx?.contractId?.toString());
    const evmAddress = String(contractCreateRx?.contractId?.toSolidityAddress())
    console.log(
      `- Contract created ${contractId}, Contract Address ${evmAddress}`
    );

    this.contractService.saveDeployedContract(
      contractId,
      evmAddress,
      String(compiledContract?.contractName),
      ""
    );

    const contractEvmAddress = `0x${evmAddress}`;

    clientArg.close();

    return {
      id: contractId,
      address: contractEvmAddress,
    };
  };

}
