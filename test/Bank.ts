import { expect, use } from "chai";
import { ethers } from "hardhat";
import chaiAsPromised = require("chai-as-promised");
use(chaiAsPromised)

describe("Bank", function () {

  interface Bank {
    getBalance: any;
    deposit: any;
    withdraw: any
  }
  let bank: Bank;

  async function deployBankFixture() {
    const Bank = await ethers.getContractFactory("Bank");
    bank = await Bank.deploy();
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
      await bank.deposit({value: ethers.utils.parseEther("10")});
      const balance = await bank.getBalance();
      expect(balance).equals(10);
    });
  });
  describe("Withdraw", function () {
    it("Should withdraw hbars from the contract", async function () {
      await bank.withdraw(10);
      const balance = await bank.getBalance();
      expect(balance).equals(0);
    });
  });
  
});