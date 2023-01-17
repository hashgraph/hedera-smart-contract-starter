// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.17;
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Bank is Initializable {
    address public owner;
    mapping(address => uint) accounts;

    function initialize(address _owner) public initializer {
        owner = _owner;
    }

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
