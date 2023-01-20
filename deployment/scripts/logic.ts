import { Deployment } from "../../utils/deployContractOnTestnet";
import ContractMetadata from "../../utils/ContractMetadata";

import { ContractFunctionParameters } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();
const {
    CONTRACT_NAME,
    CONTRACT_PATH
  } = process.env;

const deployment = new Deployment();
const contractMetadata = new ContractMetadata();

export async function main(_contractName: string?= null, _filePath: string) {
    const contractName = (
        _contractName ?? CONTRACT_NAME!
    );

    const filePath = (
        _filePath ?? CONTRACT_PATH!
    );

    console.log(
        `Deploying (${contractName}) contract, where file path is (${filePath})`
    );
    const deployedContract = await deployment.deployContractAsClient(
        filePath,
        new ContractFunctionParameters()
    );
    console.log(
        `${contractName} deployed successfully => ${JSON.stringify(
            deployedContract
        )}`
    );
    return `Successfully deployed`;
}

if (require.main === module) {
    main()
        .then(() => process.exit(0))
        .catch((error) => {
            console.error(error);
            process.exit(1);
        });
}
