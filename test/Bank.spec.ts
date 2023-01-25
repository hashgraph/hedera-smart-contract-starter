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

import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised)

describe("Bank", function () {

  type Bank = {
    getBalance(): Promise<string>;
    deposit(value: object): Promise<never>;
    withdraw(amount: number): Promise<number>;
  }
  let bank: Bank;

  async function deployBankFixture() {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy() as unknown as Bank;
  }

  describe("Deployment", function () {
    it("Should deploy the Bank", async function () {
      await expect(deployBankFixture()).to.eventually.not.be.rejected;
    });
  });
  describe("Get Balance", function () {
    it("Should return a balance", async function () {
      const balance = await bank.getBalance();
      expect(balance).equals(0);
    });
  });
  describe("Deposit", function () {
    it("Should deposit hbars to the contract", async function () {
      await bank.deposit({ value: ethers.utils.parseUnits(".00000000000001") });
      const balance = await bank.getBalance();
      expect(balance).equals(10000);
    });
  });
  describe("Withdraw", function () {
    it("Should withdraw hbars from the contract", async function () {
      await bank.withdraw(10000);
      const balance = await bank.getBalance();
      expect(balance).equals(0);
    });
  });

});