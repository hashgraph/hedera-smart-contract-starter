import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised)

describe("Bank", function () {
  async function deployBankFixture() {
    const [owner, otherAccount] = await ethers.getSigners();

    const Bank = await ethers.getContractFactory("Bank");
    const bank = await Bank.deploy();

    return { bank, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the Bank", async function () {
      await expect(deployBankFixture()).to.eventually.not.be.rejected;
    });
  });
});