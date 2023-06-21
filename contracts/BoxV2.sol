// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BoxV2 is Initializable {
    uint256 private value;

    function initialize(uint256 _value) public initializer {
        value = _value;
    }

    function store(uint256 newValue) public {
        value = newValue;
    }

    function retrieve() public view returns (uint256) {
        return value;
    }

    function increment() public {
        value = value + 1;
    }
}
