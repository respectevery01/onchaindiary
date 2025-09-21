
# Best Practices
避免陷阱并编写安全的去中心化应用

在结束本概念指南之前，以下是创建机密去中心化应用时需牢记的一些最佳实践。

## 始终检查输入的授权情况
正如我们在机密代币示例中所见，大多数暴露机密输入的外部函数都需要像这样声明两次。
```solidity
function transfer(address to, bytes memory valueInput) external returns (ebool) {
    euint256 value = valueInput.newEuint256(msg.sender);
    return _transfer(to, value);
}

function transfer(address to, euint256 value) public returns (ebool success) {
    require(msg.sender.isAllowed(value), "SimpleConfidentialToken: unauthorized value handle access");
    return _transfer(to, value);
}
```
这是因为其中一个函数用于接收链下生成的密文，而另一个函数则供智能合约调用，以传递已有的电子变量（e-variable）。在第二个函数中，你必须始终检查调用者是否有权访问作为参数传入的密文句柄（ciphertext handle）。要实现这一点，需通过执行 `require(msg.sender.isAllowed(value))` 语句来完成。这一步至关重要，因为调用者可能会使用一个自身无权访问、但合约有权访问的Handles；在这种情况下，根据合约的具体逻辑，调用者有可能推导出或获取到作为输入的变量值。

## 从信息泄露的角度思考
设计应用时，不仅需要注意谁有权访问密文，还要考虑从公开可用的信息中可以推断出什么。

例如，如果我们将 Uniswap 池简单地移植到 Inco，可能希望接受机密的输入金额进行交换，并发送机密的输出金额。如果池的价格是公开的，那么通过比较交换前后的价格，可以推断出交换的金额。

再举一例，若您正在举行一场秘密拍卖，当前最高出价者持续更新，通过不断提交更高出价直至成为最高出价者，便可推断出当前最高出价。

这类可能的推断被称为信息泄露，并可能在您的去中心化应用中频繁出现。

## 切勿失去对密文的访问权限
操作完成后请勿忘记调用 `e.allowThis()` 和 `e.allow` 。默认情况下，交易被纳入后，无人保留对新创建Handles的访问权限，合约将来无法对其进行计算，且若未授予访问权限，用户将无法查看它们。

## 务必格外小心 delegatecall 的使用
被 delegatecall 调用的合约能够解密您合约持有的任何密文或共享对其的访问权限。
:::info
如有任何疑问或想讨论您的 dapp 设计，请随时联系我们。我们也非常欢迎您对本文档提供反馈意见。
:::