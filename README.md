# hedera-smart-contract-starter

This project demonstrates a basic Hardhat use case that is preconfigured for Hedera. It comes with a simple Bank contract composed of `deposit` `withdraw` and `getBalance` functions, a test for that contract, and a script that deploys that contract.


### Set up
1. Edit values for variables in `.env_sample` and save as `.env`

#### RPC relay urls:
* Testnet: https://testnet.hashio.io/api
* Mainnet: https://mainnet.hashio.io/api
* Previewnet: https://previewnet.hashio.io/api

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.ts
npx hardhat run deployment/scripts/logic.ts #Deploys logic contract
npx hardhat run deployment/scripts/transparentUpgradeableProxy.ts #To deploy logic contracts proxy 
npx hardhat run deployment/scripts/upgradeProxy.ts #Upgrade to new implementation
npx hardhat run deployment/scripts/deploy.ts #Deploy both logic and proxy in one go
```
