
# 概念指南介绍
全面了解开始使用 Inco 所需掌握的所有概念.

## 欢迎
本指南将帮助您快速掌握开发首个机密去中心化应用所需了解的所有概念。在本指南中，我们将使用多个示例，最常见的是机密代币。机密代币的行为类似于常规的 ERC20 代币，但持有者的余额和转账金额对公众是隐藏的。

以下是一个简单机密代币合约的完整代码：
```Solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


contract SimpleConfidentialToken {
    using e for *;

    mapping(address => euint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = uint256(1000 * 1e9).asEuint256();
    }

    function transfer(
        address to,
        bytes memory valueInput
    ) external returns (ebool) {
        euint256 value = valueInput.newEuint256(msg.sender);
        return _transfer(to, value);
    }

    function transfer(
        address to,
        euint256 value
    ) public returns (ebool success) {
        require(
            msg.sender.isAllowed(value),
            "SimpleConfidentialToken: unauthorized value handle access"
        );

        return _transfer(to, value);
    }

    function _transfer(
        address to,
        euint256 value
    ) external returns (ebool success) {
        success = balanceOf[msg.sender].ge(value);
        euint256 transferredValue = success.select(
            value,
            uint256(0).asEuint256()
        );

        euint256 senderNewBalance = balanceOf[msg.sender].sub(transferredValue);
        euint256 receiverNewBalance = balanceOf[to].add(transferredValue);

        balanceOf[msg.sender] = senderNewBalance;
        balanceOf[to] = receiverNewBalance;

        senderNewBalance.allow(msg.sender);
        receiverNewBalance.allow(to);
        senderNewBalance.allowThis();
        receiverNewBalance.allowThis();
    }
}
```
继续阅读本指南以了解此代码的工作原理及其概念。