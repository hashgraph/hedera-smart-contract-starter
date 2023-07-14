//SPDX-License-Identifier: 	Apache-2.0
pragma solidity ^0.8.0;

import "./Topic.sol";

contract TopicV2 is Topic {
    string private _message;

    function setMessage(string memory message) public {
        _message = message;
    }

    function getMessage() public view returns (string memory) {
        return _message;
    }
}
