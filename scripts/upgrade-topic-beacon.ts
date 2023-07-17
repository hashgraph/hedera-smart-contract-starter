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
  console.log("Fetching TopicV2 contract...");
  const TopicV2 = await ethers.getContractFactory("TopicV2");

  console.log("Upgrading beacon to TopicV2...");
  await upgrades.upgradeBeacon(BEACON_ADDRESS, TopicV2);
  console.log("Beacon upgraded to TopicV2");

  const TOPIC_PROXY_ADDRESS = "..."; // replace with your Topic beacon proxy contract address
  const topicProxy = await ethers.getContractAt("TopicV2", TOPIC_PROXY_ADDRESS);

  console.log("Setting message on TopicV2 beacon proxy to 'Hello, Hedera' for TopicId:", await (topicProxy as unknown as TopicContract).getTopicId());
  await (topicProxy as unknown as TopicContract).setMessage("Hello, Hedera");
  console.log("TopicV2 beacon proxy message:", await (topicProxy as unknown as TopicContract).getMessage());
}

main().catch(console.error);
