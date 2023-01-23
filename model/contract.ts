export interface DeployedContract {
    name: string;
    id: string;
    address: string;
    transparentProxyAddress?: string;
    transparentProxyId?: string;
    timestamp: string;
    hash: string;
}
export interface Contract {
    contract_id: string;
    contractName: string;
    bytecode: string;
}