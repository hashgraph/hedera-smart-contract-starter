import { ethers, upgrades } from "hardhat";

const BEACON_ADDRESS = "..."; // replace with your Beacon contract address

async function main() {
  console.log("Fetching NodeV2 contract...");
  const NodeV2 = await ethers.getContractFactory("NodeV2");

  console.log("Upgrading beacon to NodeV2...");
  await upgrades.upgradeBeacon(BEACON_ADDRESS, NodeV2);
  console.log("Beacon upgraded to NodeV2");

  const NODE_PROXY_ADDRESS = "..."; // replace with your Node beacon proxy contract address
  const nodeProxy = await ethers.getContractAt("NodeV2", NODE_PROXY_ADDRESS);

  console.log("Setting message on NodeV2 beacon proxy to 'Hello, Hedera'...");
  await nodeProxy.setMessage("Hello, Hedera");
  console.log("NodeV2 beacon proxy message:", await nodeProxy.getMessage());
}

main().catch(console.error);
