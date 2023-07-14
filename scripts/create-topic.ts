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
    console.log("Fetching Topic contract...");
    const Topic = await ethers.getContractFactory("Topic");

    console.log("Deploying Topic contract with topic ID '0.0.1234'...");
    const topic = await upgrades.deployProxy(Topic, ["0.0.1234"]);
    await topic.deployed();
    console.log("Topic contract deployed to:", topic.address);

    console.log("Topic contract initialized with topic ID:", await (topic as unknown as TopicContract).getTopicId());
}

main().catch(console.error);
