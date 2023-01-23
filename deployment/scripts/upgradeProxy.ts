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