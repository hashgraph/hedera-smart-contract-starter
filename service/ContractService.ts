import * as fs from "fs";
import { DeployedContract } from "../model/contract";
import { mirrorRequest } from "../api/mirrorNodeRequest";

export class ContractService {
  public bankContractName = "bank";

  private contractRecordFile = "./state/contracts.json";
  static DEV_CONTRACTS_PATH = "./state/contracts.json";
  static UAT_CONTRACTS_PATH = "./state/contractsUAT.json";

  constructor(filePath?: string) {
    this.contractRecordFile = filePath ?? ContractService.DEV_CONTRACTS_PATH;
  }

  private readFileContent = () => {
    const rawdata: any = fs.readFileSync(this.contractRecordFile);
    return JSON.parse(rawdata);
  };

  public getContractId = async (contractEvmAddress: string): Promise<any> => {
    console.log(`Fetching contract id for evm address ${contractEvmAddress}`);
    const contractId: any = await mirrorRequest(contractEvmAddress, undefined);
    return contractId.contract_id;
  };

  public saveDeployedContract = async (
    contractId: string,
    contractAddress: string,
    contractName: string,
    calculatedHash: string
  ) => {
    const contractNameLowerCase = contractName.toLowerCase();

    if (contractNameLowerCase === "transparentupgradeableproxy") {
      return;
    }

    const contracts: [DeployedContract] = this.readFileContent();

    console.log(`Contract id ${contractId}`);

    const newContract: DeployedContract = {
      name: contractNameLowerCase,
      id: contractId,
      address: "0x" + contractAddress,
      timestamp: new Date().toISOString(),
      hash: calculatedHash,
    };

    const contractsWithNewContract = [...contracts, newContract];

    const data = JSON.stringify(contractsWithNewContract, null, 4);

    console.log(`Contract details ${data}`);

    fs.writeFileSync(this.contractRecordFile, data);
  };

  public recordDeployedContract = async (
    contractAddress: string,
    contractName: string
  ) => {
    const contractNameLowerCase = contractName.toLowerCase();

    if (contractNameLowerCase === "transparentupgradeableproxy") {
      return;
    }

    const contracts: [DeployedContract] = this.readFileContent();

    const contractId = await this.getContractId(contractAddress);
    console.log(`Contract id from api ${contractId}`);

    const newContract: DeployedContract = {
      name: contractNameLowerCase,
      id: contractId,
      address: contractAddress,
      timestamp: new Date().toISOString(),
    };

    const contractsWithNewContract = [...contracts, newContract];

    const data = JSON.stringify(contractsWithNewContract, null, 4);

    console.log(`Contract details ${data}`);

    fs.writeFileSync(this.contractRecordFile, data);
  };

  public getAllContracts = (): Array<DeployedContract> =>
    this.readFileContent();

  public updateContractRecord = (
    updatedContract: DeployedContract,
    contractBeingDeployed: DeployedContract
  ) => {
    const contracts: Array<DeployedContract> = this.getAllContracts();
    const allOtherContracts = contracts.filter(
      (contract: DeployedContract) =>
        contract.address != contractBeingDeployed.address
    );

    const updatedContracts = [...allOtherContracts, updatedContract];

    const data = JSON.stringify(updatedContracts, null, 4);

    console.log(`Contract record updated ${data}`);

    fs.writeFileSync(this.contractRecordFile, data);
  };

  public getContract = (contractName: string): DeployedContract => {
    const contracts: Array<DeployedContract> = this.getAllContracts();
    const matchingContracts = contracts.filter(
      (contract: DeployedContract) => contract.name == contractName
    );
    const latestContract = matchingContracts[matchingContracts.length - 1];
    return latestContract;
  };

  public getContractWithProxy = (contractName: string): DeployedContract => {
    const contracts: Array<DeployedContract> = this.getAllContracts();
    const matchingProxyContracts = contracts.filter(
      (contract: DeployedContract) =>
        contract.name == contractName &&
        contract.transparentProxyAddress != null &&
        contract.transparentProxyId != null
    );
    return matchingProxyContracts[matchingProxyContracts.length - 1];
  };

  public getContractsWithProxy = (
    contractName: string,
    count: number
  ): DeployedContract[] => {
    const contracts: Array<DeployedContract> = this.getAllContracts();
    const matchingProxyContracts = contracts.filter(
      (contract: DeployedContract) =>
        contract.name == contractName &&
        contract.transparentProxyAddress != null &&
        contract.transparentProxyId != null
    );
    return matchingProxyContracts.slice(-count);
  };

  public getContractWithProxyById = (contractId: string): DeployedContract => {
    const contracts: Array<DeployedContract> = this.getAllContracts();
    const matchingProxyContracts = contracts.filter(
      (contract: DeployedContract) =>
        contract.transparentProxyAddress != null &&
        contract.transparentProxyId != null &&
        contract.transparentProxyId === contractId
    );
    return matchingProxyContracts[matchingProxyContracts.length - 1];
  };

  public addDeployed = (contract: DeployedContract) => {
    const contracts: [DeployedContract] = this.readFileContent();
    contracts.push(contract);
    const data = JSON.stringify(contracts, null, 4);
    fs.writeFileSync(this.contractRecordFile, data);
  };
}
