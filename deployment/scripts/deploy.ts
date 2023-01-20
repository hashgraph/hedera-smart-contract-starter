import { main as deployContract } from "./logic";
import { main as createContractProxy } from "./transparentUpgradeableProxy";

async function main() {
  const contractName = process.env.CONTRACT_NAME!;
  const contractFilepath = process.env.CONTRACT_PATH!;
  await deployContract(contractName, contractFilepath);
  await createContractProxy(contractName);
  return "Done";
}

main()
  .then((res) => console.log(res))
  .catch((error) => console.error(error))
  .finally(() => process.exit(1));