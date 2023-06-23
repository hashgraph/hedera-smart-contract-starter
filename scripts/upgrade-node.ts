import { ethers, upgrades } from "hardhat";

const NODE_ADDRESS = "..."; // replace with your Node contract address

async function main() {
    console.log("Fetching NodeV2 contract...");
    const NodeV2 = await ethers.getContractFactory("NodeV2");

    console.log("Upgrading Node contract to NodeV2...");
    const node = await upgrades.upgradeProxy(NODE_ADDRESS, NodeV2);

    console.log("Setting message on NodeV2 contract to 'Hello, Hedera'...");
    await node.setMessage("Hello, Hedera");
    console.log("NodeV2 contract message:", await node.getMessage());
}

main().catch(console.error);
