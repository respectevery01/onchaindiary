# 作弊码参考
完全从 Solidity 测试中模拟 Inco 环境

## 执行操作
Inco 的基础设施正在监控智能合约对加密变量所请求的操作。

Inco 在包含操作（ops）的区块被挖出后异步执行它们。在底层，每个受支持链上的 Inco 单例实例会发出事件来请求操作（包括加密、简单加密、所有逻辑和数学运算以及解密请求）。基于 Solidity 的模拟器使用 Foundry 的 `vm.recordLogs() `函数来记录待处理的操作。
:::warning
由于事件记录在读取时即被消耗，如果在测试中使用 `recordLogs` 会产生冲突。
:::

要模拟 Inco 处理操作的过程（该过程会将其加密值分配给内部值存储中的每个句柄），请使用以下作弊代码：
```solidity
processAllOperations();
```
在读取任何加密变量的值以及执行断言语句之前，必须调用此作弊代码。 `processAllOperations` 还会执行任何待处理的解密回调。

## 模拟输入
加密输入通常使用 Inco 的 JS SDK 生成。使用以下作弊码模拟它们：

### 对于 euint256
```solidity
fakePrepareEuint256Ciphertext(uint256 value) returns (bytes memory ciphertext);

// example usage
token.transfer(bob, fakePrepareEuint256Ciphertext(1 ether));
```

### 对于 ebool
```solidity
fakePrepareEboolCiphertext(bool value) returns (bytes memory ciphertext);

// example usage
someContract.setActive(fakePrepareEboolCiphertext(true));
```

## 模拟解密
允许的账户可以使用 JS SDK 请求读取 e 变量的值。在测试中，您可以绕过访问控制检查读取任何值。

### 对于 euint256
```solidity
getUint256Value(euint256 input) (uint256);

// example usage
assertEq(getUint256Value(token.balanceOf(alice)), 9 * GWEI);
```

### 对于 ebool
```solidity
getBoolValue(ebool input) (bool);

// example usage
assertEq(getBoolValue(someContract.isActive()), true);
```

为了全面测试您的用户如何查看其加密数据，我们建议将解密值的断言与访问控制检查相结合。
```solidity
// example, we check that alice can read her balance
assertTrue(token.balanceOf(alice).isAllowed(alice));
```