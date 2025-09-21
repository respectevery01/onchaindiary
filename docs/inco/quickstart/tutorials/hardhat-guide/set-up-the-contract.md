# 设置合约
学习如何设置机密 ERC20 代币的基本结构

## 导入所需库
首先，我们需要导入必要的合约和库：
```solidity
pragma solidity ^0.8.24;
import "@inco/lightning/src/Lib.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
```

## 合约定义
我们的机密 ERC20 合约继承自 `Ownable2Step` ，该合约提供了安全的拥有权管理：
```solidity
contract ConfidentialERC20 is Ownable2Step {
    // Contract implementation will go here
}
```
:::info
来自 OpenZeppelin 的 `Ownable2Step` 合约在构造函数中设置所有者，仅允许所有者查看所有用户的余额。
:::

## 状态变量
我们需要定义状态变量，包括加密的余额和授权额度：
```solidity
uint256 public _totalSupply;
string public _name;
string public _symbol;
uint8 public constant decimals = 18;

// Mappings for balances and allowances
mapping(address => euint256) internal balances;
mapping(address => mapping(address => euint256)) internal allowances;
mapping(uint256 => address) internal requestIdToUserAddress;
```
:::info
请注意， balances 和 allowances 使用 euint256 类型进行加密存储。
:::

## 事件
定义标准的 ERC20 事件以及我们自定义的解密事件

```solidity
// Events for Transfer, Approval, Mint, and Decryption
event Transfer(address indexed from, address indexed to);
event Approval(address indexed owner, address indexed spender);
event Mint(address indexed to, uint256 amount);
event UserBalanceDecrypted(address indexed user, uint256 decryptedAmount);
```
## 理解结构


  <CardOption
    title="加密类型"
    description="euint256 用于加密整数，确保余额隐私"
  >
  </CardOption>

  <CardOption
    title="访问控制"
    description="Ownable2Step 提供安全的持有权管理"
  >
  </CardOption>
  <CardOption
    title="事件"
    description="事件允许在不透露金额的情况下追踪转账和批准"
    >
    </CardOption>


## 下一步
继续学习如何实现核心代币功能