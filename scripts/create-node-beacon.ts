import { ethers, upgrades } from "hardhat";

async function main() {
  console.log("Fetching Node contract...");
  const Node = await ethers.getContractFactory("Node");

  console.log("Deploying Node contract as a beacon...");
  const beacon = await upgrades.deployBeacon(Node);
  await beacon.deployed();
  console.log("Beacon deployed to:", beacon.address);

  console.log("Deploying Node contract as a beacon proxy with topic ID '0.0.1234'...");
  const node = await upgrades.deployBeaconProxy(beacon, Node, ["0.0.1234"]);
  await node.deployed();
  console.log("Node beacon proxy deployed to:", node.address);

  console.log("Node beacon proxy initialized with topic ID:", await node.getTopicId());
}

main().catch(console.error);
