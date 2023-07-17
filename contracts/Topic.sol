//SPDX-License-Identifier: Apache 2
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Topic is Initializable {
    string private _topicId;

    function initialize(string memory topicId) public initializer {
        _topicId = topicId;
    }

    function getTopicId() public view returns (string memory) {
        return _topicId;
    }
}