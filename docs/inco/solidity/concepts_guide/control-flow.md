
# Control Flow
采用`select`和多路复用设计模式

由于 Inco 使得智能合约能够在不泄露任何信息的情况下对私有数据进行计算，因此两种常见的编程用法无法使用。

1. 您不能使用依赖于私有值的条件进行 if/else 语句判断。程序将执行的流程会泄露有关私有值的信息。
2. 出于同样的原因，您不能基于依赖于私有值的条件来回滚交易。

为了解决这个问题，我们采用了一种称为多路复用器设计模式的模式。

## 多路复用器设计模式
Inco 中等价于 if/else 语句的是 `select` 语句。 `select` 语句以加密布尔值作为第一个参数，两个加密值作为第二和第三个参数。 `select` 语句的结果是：若第一个参数为真，则返回第二个参数；否则返回第三个参数。

来自机代币合约的示例用法：
```solidity
function _transfer(address to, euint256 value) internal returns (ebool success) {
    // 我们检查用户是否有足够的余额，并将结果分配给ebool成功
    success = balanceOf[msg.sender].ge(value);
    // 我们使用select语句来分配要传输的值
    // 如果用户有足够的余额，我们就会转账
    // 否则，我们将转账的值赋值为0
    euint256 transferredValue = success.select(value, uint256(0).asEuint256());
    // ... 其余的传输逻辑
}
```

在机密代币的示例中，若用户余额不足，我们不会执行回滚操作，而是会转账 0 单位金额 —— 这本质上相当于什么都没做。大多数机密应用中都能见到这类逻辑设计。