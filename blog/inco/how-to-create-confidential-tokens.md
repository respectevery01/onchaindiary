# 如何创建机密代币

区块链生态系统由代币驱动，它让用户无需中介即可进行价值交换、参与治理提案投票等。

但在公有区块链上，代币交易的细节对所有人公开可见。无论是向朋友发送代币、接收代币薪资还是参与 DeFi 活动——所有这些操作目前都会将转账金额和涉及方的余额暴露在链上。这对于吸引主流用户上链是个巨大障碍，也是区块链相较于传统金融体系的明显缺陷。

Inco 正在构建链上机密解决方案。目前已在 Base Sepolia 测试网上线的首款产品 Inco Lightning，为开发者提供了构建机密智能合约的途径。Inco Lightning 的核心应用场景之一就是创建机密代币。本次演示中，我们将展示具体实现方法。

## 什么是机密代币？

机密代币是一种在链上隐藏交易金额和余额的代币。目前最广泛采用的代币标准是 ERC20，这是与以太坊及其二层链相关的代币标准。本教程将指导您使用 Inco Lightning 创建 ERC20 代币的机密版本，并将其部署至 Base Sepolia 测试网。

## 如何创建机密代币

创建机密代币非常简单。您只需准备标准的智能合约开发工具，包括 Solidity 库、MetaMask 以及 Hardhat 或 Remix（本教程将使用 Hardhat）。我们将把合约部署至 Base Sepolia 测试网。

### 快速开始：使用 Hardhat 部署

#### 前置条件

在开始处理合约之前，您需要先设置好 Hardhat 环境。

我们建议先安装 nvm（Node 版本管理器），然后通过 nvm 安装 Node.js。

- 对于 Linux 系统：官方 Linux 版本可在[此处](https://github.com/nvm-sh/nvm)找到，或者您可以按照此[教程](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)操作
- 对于 Windows 系统，请遵循 [Readme 指南](https://github.com/coreybutler/nvm-windows/blob/master/README.md#installation--upgrades)
- 对于 Mac 用户，您可以按照本教程操作

完成此步骤后，您需要安装 node.js 和 pnpm。

```
nvm install node
npm install -g pnpm
```

#### 环境配置

现在，请克隆模板项目。

```
git clone https://github.com/Inco-fhevm/inco-lite-template.git
cd inco-lite-template
```

然后，安装依赖项。

```javascript
pnpm install
```

设置.env 文件。您可以使用以下来自 README 的值。

```javascript
# This should be a private key funded with native tokens.

PRIVATE_KEY_ANVIL="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"

PRIVATE_KEY_BASE_SEPOLIA=""‍

# This should be a seed phrase used to test functionalities with different accounts.  

# You can send funds from the main wallet to this whenever needed.
SEED_PHRASE="garden cage click scene crystal fat message twice rubber club choice cool"‍

# This should be an RPC URL provided by a proper provider  

# that supports the eth_getLogs() and eth_getFilteredLogs() methods.

LOCAL_CHAIN_RPC_URL="http://localhost:8545"

BASE_SEPOLIA_RPC_URL="https://base-sepolia-rpc.publicnode.com"
```

注意：如果您没有助记词，可以通过[此网站](https://iancoleman.io/bip39/)生成一个或使用我们的默认测试账户。建议使用 RPC 提供商而非公共端点，以获得更好的日志访问体验。

接下来，编译合约。

```javascript
pnpm hardhat compile
```

最后，运行测试。

```javascript
pnpm hardhat test --network anvil
```

现在，您已准备好部署到 Base Sepolia

### 部署至 Base Sepolia 测试网

在.env 文件中设置 PRIVATE_KEY_BASE_SEPOLIA 和 BASE_SEPOLIA_RPC_URL 字段后，运行以下命令：

```javascript
pnpm hardhat ignition deploy ./ignition/modules/ConfidentialToken.ts --network baseSepolia
```

然后，你可以通过以下方式确保测试仍然通过：

```javascript
pnpm hardhat test --network baseSepolia
```

您已在 Base Sepolia 网络上部署了机密 ERC20 Hardhat 模板合约。是不是非常简单？

既然您已经部署了机密 ERC20 合约，现在让我们来了解它的运作原理。

## 合约深度解析与手动部署

让我们学习如何设置机密代币的基本结构

首先，我们需要导入必要的合约和库。

```javascript
pragma solidity ^0.8.24;
import "@inco/lightning/src/Lib.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";
```

我们的机密代币合约继承自 Ownable2Step，该合约提供了安全的拥有权管理功能。

```javascript
contract ConfidentialERC20 is Ownable2Step {
// Contract implementation will go here
}
```

OpenZeppelin 的 Ownable2Step 合约在构造函数中设置所有者，仅允许所有者查看所有用户的余额。

我们需要定义我们的状态变量，包括加密余额和授权额度。

```javascript
uint256 public _totalSupply;
string public _name;
string public _symbol;
uint8 public constant decimals = 18;‍

// Mappings for balances and allowances
mapping(address => euint256) internal balances;
mapping(address => mapping(address => euint256)) internal allowances;
mapping(uint256 => address) internal requestIdToUserAddress;
```

请注意，余额和津贴使用 euint256 类型进行加密存储。

我们需要定义标准的 ERC20 事件以及我们自定义的解密事件。

```javascript
// Events for Transfer, Approval, Mint, and Decryption
event Transfer(address indexed from, address indexed to);
event Approval(address indexed owner, address indexed spender);
event Mint(address indexed to, uint256 amount);
event UserBalanceDecrypted(address indexed user, uint256 decryptedAmount);
```

理解合同的三个关键方面至关重要。

- 加密类型：euint256 用于加密整数，确保余额隐私
- 访问控制：Ownable2Step 提供安全的权限管理机制
- 事件：通过事件可追踪转账和授权操作，同时隐藏具体金额

### 合约功能

让我们来看看机密代币的核心功能。

构造函数设置了初始令牌配置：

```javascript
constructor() Ownable(msg.sender) {
	_name = "Confidential USD";
	_symbol = "cUSD";
 }
```

有两种适用于不同使用场景的铸造功能：

```javascript
// Standard minting with plaintext amount
function mint(uint256 mintedAmount) public virtual onlyOwner {
balances[owner()] = e.add(
balances[owner()],        
e.asEuint256(mintedAmount)    
);    
e.allow(balances[owner()], address(this));
e.allow(balances[owner()], owner());
_totalSupply += mintedAmount;
emit Mint(owner(), mintedAmount);
}
// Minting with encrypted amount
function _mint(bytes calldata encryptedAmount) public virtual onlyOwner {
balances[msg.sender] = e.add(
balances[msg.sender],        
e.newEuint256(encryptedAmount, msg.sender)
);    
e.allow(balances[msg.sender], address(this));
e.allow(balances[msg.sender], owner());
e.allow(balances[msg.sender], msg.sender);
}
```

_mint 函数接受加密金额以增强隐私性。

有两种转账版本可供选择：

```javascript
// For EOAs using encrypted inputs
function transfer(    
address to,
bytes calldata encryptedAmount
) public virtual returns (bool) {
transfer(to, e.newEuint256(encryptedAmount, msg.sender));
return true;
}
// For contract interactions
function transfer(
address to,
euint256 amount
) public virtual returns (bool) {
ebool canTransfer = e.ge(balances[msg.sender], amount);
_transfer(msg.sender, to, amount, canTransfer);
return true;
}
```

审批系统允许委托支出：

```javascript
// Approve for EOAs
function approve
(    address spender,
bytes calldata encryptedAmount
) public virtual returns (bool) {
approve(spender, e.newEuint256(encryptedAmount, msg.sender));
return true;}
```

‍

```javascript
// Approve for contracts
function approve(
address spender,
euint256 amount
) public virtual returns (bool) {
_approve(msg.sender, spender, amount);
emit Approval(msg.sender, spender);
return true;}

// Internal approval logic
function _approve(
address owner,
address spender,
euint256 amount
) internal virtual {
allowances[owner][spender] = amount;
e.allow(amount, address(this));
e.allow(amount, owner);
e.allow(amount, spender);
}
```

对于已批准的代币支出：

```javascript
// TransferFrom for EOAs
function transferFrom(
address from,
address to,
bytes calldata encryptedAmount
) public virtual returns (bool) {
transferFrom(from, to, e.newEuint256(encryptedAmount, msg.sender));
return true;
}‍

// TransferFrom for contracts
function transferFrom(
address from,
address to,
euint256 amount
) public virtual returns (bool) {
ebool isTransferable = _updateAllowance(from, msg.sender, amount);
_transfer(from, to, amount, isTransferable);
return true;
}
```

查看余额和津贴的视图功能：

```javascript
// Get encrypted balance
function balanceOf(address wallet) public view virtual returns (euint256) {
return balances[wallet];
}
‍
// Get encrypted allowance
function allowance(
address owner,
address spender
) public view virtual returns (euint256) {
return _allowance(owner, spender);
}
```

合约所有者专用功能：

```javascript
// Request balance decryption
function requestUserBalanceDecryption(
address user
) public onlyOwner returns (uint256) {
euint256 encryptedBalance = balances[user];
e.allow(encryptedBalance, address(this));‍

uint256 requestId = e.requestDecryption(
encryptedBalance,
this.onDecryptionCallback.selector,
""    
);    
requestIdToUserAddress[requestId] = user;
return requestId;
}
```

‍现在让我们看看这些功能如何在完整合约中协同工作。以下是 [GitHub 上机密 ERC20 代币合约的完整实现](https://github.com/Inco-fhevm/inco-lite-template)；如果您使用的是 Hardhat 模板，可以在 ConfidentialERC20.sol 文件中找到此代码。

### 部署合约

如上所述，您可以使用 Hardhat 模板来构建合约。但若要通过 Hardhat Ignition 自行部署上述合约，只需几个简单步骤。

首先，在 ignition/modules/ConfidentialToken.ts 中创建部署模块。

```javascript
import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";‍

const ConfidentialERC20Module = buildModule("ConfidentialERC20Module", (m) => {  
const confidentialERC20Module = m.contract("ConfidentialERC20");
return { confidentialERC20Module };
})

export default ConfidentialERC20Module;
```

然后，使用以下命令进行部署。

```javascript
pnpm hardhat ignition deploy ./ignition/modules/ConfidentialToken.ts --network baseSepolia
```

最后，运行测试以验证部署。

```javascript
pnpm hardhat test --network baseSepolia
```

合约将部署于：

```javascript
Name: “Confidential USD”
Symbol: “cUSD”
Decimals: 18
Owner: The deploying address (msg.sender)
```

## 结论：这是不是很简单？

此时，您已成功将机密智能合约代币部署至 Base Sepolia 测试网，实现了用户间的隐私交易功能，同时也掌握了合约的核心逻辑。值得注意的是，机密智能合约的应用场景远不止于此：理论上，您可以构建任何设想的区块链应用，并通过 Inco 库调用机密智能合约数据类型实现隐私保护。

想要进一步探索 Inco 的开发可能性？请查阅官方[技术文档](https://docs.inco.org/home)。