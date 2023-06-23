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

  console.log("Node beacon proxy initialized with topic ID:", await (node as unknown as NodeContract).getTopicId());
}

main().catch(console.error);
