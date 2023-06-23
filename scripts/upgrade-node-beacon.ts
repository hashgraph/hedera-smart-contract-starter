/*-
 *
 * Hedera smart contract starter
 *
 * Copyright (C) 2023 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
  await (nodeProxy as unknown as NodeContract).setMessage("Hello, Hedera");
  console.log("NodeV2 beacon proxy message:", await (nodeProxy as unknown as NodeContract).getTopicId());
}

main().catch(console.error);
