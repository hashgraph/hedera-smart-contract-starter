# hedera-smart-contract-starter

This project demonstrates a basic Hardhat use case that is preconfigured for Hedera. It comes with a simple Bank contract composed of `deposit` `withdraw` and `getBalance` functions, a test for that contract, and a script that deploys that contract.


### Set up
1. Edit values for variables in `.env_sample` and save as `.env`

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat compile
npx hardhat test
npx hardhat run deployment/scripts/logic.ts #Deploys logic contract (Bank)
npx hardhat run deployment/scripts/transparentUpgradeableProxy.ts #To deploy logic contracts proxy 
npx hardhat run deployment/scripts/upgradeProxy.ts #Upgrade to new implementation
npx hardhat run deployment/scripts/deploy.ts #Deploy both logic and proxy in one go
```

### Upgrade Flow
1. Deploy Bank (v1)
`npx hardhat run deployment/scripts/logic.ts`

2. Deploy Proxy
`npx hardhat run deployment/scripts/transparentUpgradeableProxy.ts`

3. Update `Bank.sol` (v2)

4. Deploy upgraded Bank (v2)
`npx hardhat run deployment/scripts/upgradeProxy.ts`
