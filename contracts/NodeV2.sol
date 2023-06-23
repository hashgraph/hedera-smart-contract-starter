//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./Node.sol";

contract NodeV2 is Node {
    string private _message;

    function setMessage(string memory message) public {
        _message = message;
    }

    function getMessage() public view returns (string memory) {
        return _message;
    }
}
