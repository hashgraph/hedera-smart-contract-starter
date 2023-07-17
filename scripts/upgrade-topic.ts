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

const TOPIC_ADDRESS = "..."; // replace with your Node contract address

async function main() {
    console.log("Fetching TopicV2 contract...");
    const TopicV2 = await ethers.getContractFactory("TopicV2");

    console.log("Upgrading Topic contract to TopicV2...");
    const topic = await upgrades.upgradeProxy(TOPIC_ADDRESS, TopicV2);

    console.log("Setting message on TopicV2 contract to 'Hello, Hedera' for TopicId:", await (topic as unknown as TopicContract).getTopicId());
    await (topic as unknown as TopicContract).setMessage("Hello, Hedera");
    console.log("TopicV2 contract message:", await (topic as unknown as TopicContract).getMessage());
}

main().catch(console.error);
