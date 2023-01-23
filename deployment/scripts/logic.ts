import { Deployment } from "../../utils/deployContractOnTestnet";

import { ContractFunctionParameters } from "@hashgraph/sdk";
import dotenv from "dotenv";
dotenv.config();
const {
    CONTRACT_NAME,
    CONTRACT_PATH
} = process.env;

const deployment = new Deployment();

export async function main(_contractName: string | null, _filePath: string) {
    const contractName = (
        _contractName ?? (CONTRACT_NAME || '')
    );

    const filePath = (
        _filePath ?? (CONTRACT_PATH || '')
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
