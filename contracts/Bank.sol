// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.17;
contract Bank {
   address public owner;
   mapping(address => uint) accounts;

   function deposit() external payable {
     accounts[msg.sender] += msg.value;
   }

   function withdraw(uint _amount) public payable {
     uint hbars = _amount * 100000000;
     require(accounts[msg.sender] >= hbars, "Insufficient balance!");
     accounts[msg.sender] -= hbars;
     payable(msg.sender).transfer(hbars);
   }

   function getBalance() public view returns (uint res) {
    return accounts[msg.sender] / 100000000;
  }
}