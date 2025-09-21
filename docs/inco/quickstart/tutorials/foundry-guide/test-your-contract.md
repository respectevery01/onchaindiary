# 测试您的合约
使用 Inco 作弊码在 Solidity 中测试您的合约

Inco 库附带了一个扩展包，提供了对常规 `Test` Foundry 合约的扩展

您可以这样导入：

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


contract YourTest is IncoTest {
    function testSomething() public {
        // Your test code here
    }
}
```

`IncoTest` 扩展了 Foundry 的 `Test` 合约，并暴露了有用的 Inco 特定作弊码来测试您的合约。

如果你正在扩展 `setUp` 函数，记得在你的函数开头调用 `super.setUp() `。

## 示例
:::info
以下示例在 [lightning-rod](https://github.com/Inco-fhevm/lightning-rod) 模板中附带了[解释代码](https://github.com/Inco-fhevm/lightning-rod/blob/main/contracts/src/test/TestSimpleConfidentialToken.t.sol)的注释。
:::
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8;


contract TestSimpleConfidentialToken is IncoTest {
    SimpleConfidentialToken token;

    function setUp() public override {
        super.setUp();
        token = new SimpleConfidentialToken();
        token.transfer(alice, fakePrepareEuint256Ciphertext(10 * GWEI));
    }

    function testTransfer() public {
        vm.prank(alice);
        token.transfer(bob, fakePrepareEuint256Ciphertext(1 * GWEI));
        processAllOperations();
        uint256 decryptedBobBalance = getUint256Value(token.balanceOf(bob));
        uint256 decryptedAliceBalance = getUint256Value(token.balanceOf(alice));
        assertEq(decryptedBobBalance, 1 * GWEI);
        assertEq(decryptedAliceBalance, 9 * GWEI);
    }
}
```
一旦你对合约的状态满意，无需任何更改即可按原样部署，Inco 将对其操作做出响应（只要你在受支持的网络上，目前仅支持 Base-Sepolia）。

请继续阅读以获取可用的作弊码参考