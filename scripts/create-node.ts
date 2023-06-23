import { ethers, upgrades } from "hardhat";

async function main() {
    console.log("Fetching Node contract...");
    const Node = await ethers.getContractFactory("Node");

    console.log("Deploying Node contract with topic ID '0.0.1234'...");
    const node = await upgrades.deployProxy(Node, ["0.0.1234"]);
    await node.deployed();
    console.log("Node contract deployed to:", node.address);

    console.log("Node contract initialized with topic ID:", await node.getTopicId());
}

main().catch(console.error);
