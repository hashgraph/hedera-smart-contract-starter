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
