# hedera-smart-contract-starter

This project demonstrates a basic Hardhat use case that is preconfigured for Hedera. It comes with a simple Bank contract composed of `deposit` `withdraw` and `getBalance` functions, a test for that contract, and a script that deploys that contract.


### Set up
1. Edit values for variables in `.env_sample` and save as `.env`

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat compile
npx hardhat test
npx hardhat run deployment/scripts/deploy.ts #Deploy logic and proxy contracts
npx hardhat run deployment/scripts/upgradeProxy.ts #Upgrade to new implementation
```

### Upgrade Flow
1. Deploy `Bank.sol` (v1 logic contract) and `TransparentUpgradeableProxy.sol` (proxy contract)
```
npx hardhat run deployment/scripts/deploy.ts
```

2. Update `Bank.sol` (v2 logic contract)

3. Upgrade deployment
```
npx hardhat run deployment/scripts/upgradeProxy.ts
```
