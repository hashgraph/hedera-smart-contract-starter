// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.5.0 <0.9.0;

import "@openzeppelin/contracts/proxy/transparent/TransparentUpgradeableProxy.sol";

/**
 * ProxyPattern is defined to generate the compile version of TransparentUpgradeableProxy.sol
 * TransparentUpgradeableProxy is used to deployed transparent proxies.
 *
 *  */
abstract contract ProxyPattern is TransparentUpgradeableProxy {

}