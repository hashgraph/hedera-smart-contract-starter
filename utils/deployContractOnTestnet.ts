import dotenv from "dotenv";
import * as fs from "fs";
import {
  FileCreateTransaction,
  FileAppendTransaction,
  PrivateKey,
  ContractCreateTransaction,
  Client,
  ContractFunctionParameters,
  ContractExecuteTransaction,
} from "@hashgraph/sdk";
import { ContractService } from "../service/ContractService";
import ClientManagement from "../utils/ClientManagement";
import ContractMetadata from "../utils/ContractMetadata";

dotenv.config();

export class Deployment {
  private contractService = new ContractService();
  private clientManagement = new ClientManagement();
  private contractMetadata = new ContractMetadata();

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
    const rawdata: any = fs.readFileSync(filePath);
    const compiledContract = JSON.parse(rawdata);
    const contractByteCode = compiledContract.bytecode;

    //Create a file on Hedera and store the hex-encoded bytecode
    const fileCreateTx = await new FileCreateTransaction()
      .setKeys([operatorKey])
      .execute(clientArg);
    const fileCreateRx = await fileCreateTx.getReceipt(clientArg);
    const bytecodeFileId = fileCreateRx.fileId;
    console.log(`- The smart contract bytecode file ID is: ${bytecodeFileId}`);

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
    const contractId = contractCreateRx.contractId;
    console.log(
      `- Contract created ${contractId?.toString()}, Contract Address ${contractId?.toSolidityAddress()}`
    );

    await this.contractService.saveDeployedContract(
      contractId?.toString()!,
      contractId?.toSolidityAddress()!,
      compiledContract.contractName,
      ""
    );

    const contractEvmAddress = "0x" + contractId?.toSolidityAddress()!;

    clientArg.close();

    return {
      id: contractId?.toString()!,
      address: contractEvmAddress,
    };
  };

}
