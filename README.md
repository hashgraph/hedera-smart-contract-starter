# Upgradeable Smart Contracts with Proxies and Beacon Proxies

This project provides a hands-on demonstration of using upgradeable smart contracts with OpenZeppelin's upgrades plugins in Hardhat. Specifically, it illustrates the use of both Proxies and Beacon Proxies.

## Understanding Proxies

A proxy is a smart contract that serves as an intermediary between the user and the logic contract. It forwards calls and data to the logic contract and then returns the results. The address of the logic contract can be updated, thus allowing changes to the contract's behavior over time without changing the contract's address.

## Understanding Beacon Proxies

A Beacon Proxy is a proxy that references a Beacon contract to determine its implementation. By updating the Beacon contract, all associated Beacon Proxies will point to the new implementation, allowing simultaneous upgrades of multiple contracts.

## How It Works

This project contains two contracts: `Node` and `NodeV2`.

- `Node` is a simple contract that enables storing and retrieving a Hedera Topic ID.
- `NodeV2` is an enhanced version of `Node` that introduces an additional feature: the ability to set a message.

We use OpenZeppelin's upgrades plugins to deploy these contracts as upgradeable contracts.

## Running the Project

1. Install the dependencies:

    ```sh
    npm install
    ```

2. Compile the contracts:

    ```sh
    npx hardhat compile
    ```

3. Deploy the `Node` contract:

    ```sh
    npx hardhat run scripts/create-node.ts --network hederaTestnet
    ```

    This script deploys the `Node` contract as a proxy contract, initializes it with a Topic ID '0.0.1234', and prints the address of the proxy contract.

4. Upgrade the `Node` contract to `NodeV2`:

    ```sh
    npx hardhat run scripts/upgrade-node.ts --network hederaTestnet
    ```

    This script upgrades the `Node` contract to `NodeV2`, sets a new message, and prints the updated message.

5. Deploy the `Node` contract as a Beacon Proxy:

    ```sh
    npx hardhat run scripts/create-node-beacon.ts --network hederaTestnet
    ```

    This script deploys a Beacon and a Beacon Proxy for the `Node` contract, initializes the Beacon Proxy with a Topic ID '0.0.1234', and prints the addresses of the Beacon and the Beacon Proxy.

6. Upgrade the `Node` contract to `NodeV2` for the Beacon Proxy:

    ```sh
    npx hardhat run scripts/upgrade-node-beacon.ts --network hederaTestnet
    ```

    This script upgrades the Beacon to point to `NodeV2`, effectively upgrading all Beacon Proxies. It sets a new message on the Beacon Proxy and prints the updated message.

These scripts illustrate how proxies and beacon proxies allow the contract logic to be upgraded while keeping the contract address constant. The use of beacon proxies also demonstrates the power of simultaneous upgrades across multiple contracts.

# Contributing
Contributions are welcome. Please see the
[contributing guide](https://github.com/hashgraph/.github/blob/main/CONTRIBUTING.md)
to see how you can get involved.

# Code of Conduct
This project is governed by the
[Contributor Covenant Code of Conduct](https://github.com/hashgraph/.github/blob/main/CODE_OF_CONDUCT.md). By
participating, you are expected to uphold this code of conduct. Please report unacceptable behavior
to [oss@hedera.com](mailto:oss@hedera.com)