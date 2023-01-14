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

export async function main(_contractName: string? = null) {
  const contractName = (
    _contractName ?? CONTRACT_NAME!
  ).toLowerCase();
  console.log(`contractName: ${contractName}`);
  const contractBeingDeployed: DeployedContract =
    contractService.getContract(contractName);
  console.log(`contractName: ${contractBeingDeployed.id}`);
  const contractAddress = contractBeingDeployed.address;
  const adminId = AccountId.fromString(ADMIN_ID!);
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
if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}