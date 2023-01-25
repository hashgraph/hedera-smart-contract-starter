# hedera-smart-contract-starter

This repository contains a smart contract starter project that utilizes a proxy pattern to enable upgradeable contracts on Hedera. The proxy pattern allows for the logic of a contract to be upgraded without the need to redeploy the contract or transfer its assets to a new contract address. This allows for easy maintenance and updates to the contract's functionality. The starter includes a basic smart contract `Bank.sol` which is the logic contract and instructions for deploying/upgrading it on the Hedera.


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

# Contributing
Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

# Code of Conduct
This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com).

# License
[Apache License 2.0](LICENSE)
