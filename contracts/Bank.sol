// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
contract Bank {
   address public owner;
   mapping(address => uint) accounts;

   function deposit() external payable {
     accounts[msg.sender] += msg.value;
   }

   function withdraw(uint _amount) public payable {

     require(accounts[msg.sender] >= _amount, "Insufficient balance!");
     accounts[msg.sender] -= _amount;
     payable(msg.sender).transfer(_amount);
   }

   function getBalance() public view returns (uint res) {
    return accounts[msg.sender];
  }
}