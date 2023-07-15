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
import { expect } from "chai";
import { describe, it } from "mocha";
import { Contract } from "ethers";

describe("Topic", function () {
  let Topic: Contract;
  let TopicV2: Contract;

  beforeEach(async function () {
    const TopicFactory = await ethers.getContractFactory("Topic");
    Topic = await upgrades.deployProxy(TopicFactory, ["0.0.1337"], { initializer: 'initialize' });

    const TopicV2Factory = await ethers.getContractFactory("TopicV2");
    TopicV2 = await upgrades.upgradeProxy(Topic.address, TopicV2Factory);
  });

  it("should return the correct topicId", async function () {
    expect(await (Topic as unknown as TopicContract).getTopicId()).to.equal("0.0.1337");
  });

  it("should return the correct topicId for version 2", async function () {
    expect(await (TopicV2 as unknown as TopicContract).getTopicId()).to.equal("0.0.1337");
  });

  it("should set and return the correct message for version 2", async function () {
    await (TopicV2 as unknown as TopicContract).setMessage("HelloFuture");
    expect(await (TopicV2 as unknown as TopicContract).getMessage()).to.equal("HelloFuture");
  });
});
