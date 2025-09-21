
# Handles
不可变隐藏数据的唯一标识符

## E-Types
在机密代币实现的顶部，我们可以看到正在导入新型变量：

```solidity
```
`euint256` 和 `ebool` 分别是 `uint256` 和 `bool` 的隐藏对应物，用于表示合约中的隐藏值。 `e`-types是 Solidity 标准类型的隐藏对应版本。
在我们的代币示例中，用户余额明显地表示为 `euint256` ：
```solidity
mapping(address => euint256) public balanceOf;
```
如果我们查看 Inco 的库，可以看到 `euint256` 和 `ebool` 是如何定义的：
```
type euint256 is bytes32;
type ebool is bytes32;
```
如果我们尝试在区块浏览器上查找调用 `balanceOf` 返回的原始值，我们会得到类似这样的结果：
```solidity
0xa8d84064218bfc979af10dccc8153c9ab8a15068c3d64cb63927aca8ad1a3c9c
```
这个乱码值无法提供关于用户实际余额的任何信息。

## 什么是Handles？
Handles是隐藏数据不可变片段的唯一标识符。在我们的代币示例中，每个用户的余额都表示为一个Handles， `ebool success` 、 `euint256 value` 等也是Handles。链上智能合约操作的是隐藏数据（如余额、布尔值等）的标识符，而实际数据则以加密形式安全地存储在链下。每当对加密数据类型执行操作时，结果也是一个Handles，如下所示：
```solidity
euint256 senderNewBalance = balanceOf[msg.sender].sub(transferredValue);
```

Handles是不可变的。如果我们重新分配变量，例如：
```solidity
balanceOf[msg.sender] = balanceOf[msg.sender].sub(transferredValue);
```

`balanceOf[msg.sender] `将被分配一个新的Handles。重要的是要记住，代表旧余额的句柄仍然存在，并且仍然对应于旧余额的加密值，即使合约不再跟踪它。在本指南的后续部分，我们将看到Handles的值永远不会丢失，仍然可以访问。从 Inco 的角度来看，Handles会被创建但永远不会被删除。