
# 在您的合约中导入 Inco
使用 Inco 库为您的合约启用机密功能

要在合约中开始使用 Inco 功能，只需在 Solidity 文件顶部添加这行代码：

```solidity
import {e, ebool, euint256} "@inco/lightning/src/Lib.sol";
```

并在合约主体顶部添加这行代码：
```solidity
using e for *;
```
现在您的合约即可使用加密类型和操作。以下是一个简单可替代代币的完整示例：
:::info
以下示例在 [lightning-rod](https://github.com/Inco-fhevm/lightning-rod) 模板中附带了[解释代码](https://github.com/Inco-fhevm/lightning-rod/blob/main/contracts/src/SimpleConfidentialToken.sol)的注释。
:::
```solidity
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
该合约在[概念指南](../../../solidity/concepts-guide/handles.md)中有深入解释。