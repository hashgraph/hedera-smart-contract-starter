export interface DeployedContract {
    name: string;
    id: string;
    address: string;
    transparentProxyAddress?: string;
    transparentProxyId?: string;
    timestamp: string;
    hash: string;
}