
# Inputs
如何输入外部值并将其转换为Handles

## 案例一：值来自链下源
在机密传输示例中，第一个外部方法旨在由外部拥有账户（EOA）/智能账户调用。它使用 `newEuint256` 将输入值转换为Handles。
```solidity
function transfer(
        address to,
        bytes memory valueInput
    ) external returns (ebool) {
        euint256 value = valueInput.newEuint256(msg.sender);
        // stuff
    }
```
`newEuint256` 接受两个参数：加密的输入值（以 `bytes` 形式）和执行输入的账户地址（此处为 `msg.sender` ）。该账户应始终是创建输入的账户，它将获得对Handles的解密权限。传递非执行输入用户的其他地址将构成恶意实现。
`valueInput` 必须是一个密文，意味着它必须是预期转移的值，并以 Inco 能够理解的方式加密。为此，您可以使用 [JavaScript SDK](https://docs.inco.org/js-sdk/existing-project#1-encrypt-a-value) 中的 `encrypt`方法。

如果 `bytes memory valueInput` 格式错误，Inco 将回退到处理默认值。 `euint256` 的默认值为 `0` ， `ebool` 的默认值为 `false` 。
:::info

`newEuint256` 使用后，生成的Handles可以立即使用，无需 Inco 发出确认即可在合约逻辑中开始使用。Inco 将在交易上链后在其 TEE 内安全地解密相应的密文。链上的所有操作都是通过标识符虚拟执行的，并由 Inco 异步地基于实际值重现。我们称这种模式为“symbolic execution”。

:::

:::info
有人可能会尝试重用另一个用户的相同密文以获取对其的解密访问权限。我们的 JS SDK 在密文中嵌入了上下文信息（来源账户、链、合约），如果密文在另一个上下文中使用，创建的Handels值将回退到默认值。
:::

## 案例二：值来源于变量
已知值可通过 `asEuint256` 方法转换为Handles。这有时被称为执行“trivial encrypt”，因为生成的Handles将对应已知值。我们可以在代币示例的构造函数中看到这一点：

```solidity
constructor() {
    balanceOf[msg.sender] = uint256(1000 * 1e9).asEuint256();
}
```
任何人都能看出 `balanceOf[msg.sender]` 的初始值为 `1000 * 1e9` ，但在部署者发送几笔转账后，其余额将对公众不可见。