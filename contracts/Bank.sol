// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
contract Bank {

   address public owner;
   mapping(address => uint) accounts;

   constructor() {
     owner = msg.sender;
   }

   function deposit() external payable {
     accounts[msg.sender] += msg.value;
   }
   function withdraw(uint _amount) external {     
     require(accounts[msg.sender] >= _amount, "Insufficient balance!");
     accounts[msg.sender] = accounts[msg.sender] - _amount;
     payable(msg.sender).transfer(_amount);
   }

   function getBalance() public view returns (uint res) {
    return accounts[msg.sender];
  }
}