
# Access Control
对加密数据的完全可编程访问控制

访问控制逻辑是完全可编程且上链的。谁有权解密并查看特定密文，这一点在链上是可查的。

要授予某个账户（即地址）对密文的访问权限，您可以使用 `e.allow` 函数。这将授予该地址永久查看、公开解密并对密文进行计算的权限。
:::info
由于Handles是不可变的，将变量访问权限共享给账户仅授予对变量当前值的访问权限。每当变量更新时，Handles会改变，必须重新授予对新Handles的访问权限。例如，您可以将当前余额共享给某个地址，但如果您更新了余额，该地址将无法看到新值。
:::
机密代币合约的示例用法
```solidity
function _transfer(address to, euint256 value) internal returns (ebool success) {
    // …一些先前的逻辑
    // 允许发送者看到它的新余额
    senderNewBalance.allow(msg.sender);
    // 让接受者看到它的新余额
    receiverNewBalance.allow(to);
    // 允许该合约能够在未来的转账中计算新的余额
    senderNewBalance.allowThis();
    receiverNewBalance.allowThis();
    // 让caller知道转账是否成功
    success.allow(msg.sender);
}
```
`e.allowThis(value)` 是 `e.allow(value, address(this))` 的别名。

一个常见的错误是在更新变量后忘记调用 `allowThis` 。这将导致合约在未来的交易中无法对该变量进行计算。

:::warning
如果变量将在合约中再次使用，更新后务必调用 `e.allowThis`
:::

## 临时许可
:::info
e.transientAllow 尚未在 SDK 中提供，但即将推出。
:::
临时许可是一种仅对当前交易有效的许可。诸如 `e.add` 等操作的所有结果都被临时允许由调用该操作的合约解密。这就是为什么合约可以利用先前操作的结果连续执行操作。但由于此许可是临时的，因此需要调用 `e.allowThis` 以允许合约在未来的交易中对结果进行计算。

## 如何理解访问权限
理解访问控制的正确思路是：任何在某一时刻获得密文访问权限的账户（即外部拥有账户 EOA、合约账户、智能钱包的任意地址），无论其权限是临时的还是永久的，都能知晓该密文的内容、存储密文，并且可基于密文进行计算。需要注意的是，一旦密文的访问权限被共享出去，接收权限的账户既可以将其共享给其他任意账户，也可以公开解密该密文。因此，在你的应用中授予密文访问权限时务必格外谨慎，切勿认为临时授权在任何情况下都比永久授权 “更安全”。

