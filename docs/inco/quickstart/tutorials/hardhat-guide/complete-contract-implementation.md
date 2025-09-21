# 完整合约实现
完全实现机密 ERC20 代币

以下是机密 ERC20 代币合约的完整实现。如果您使用 Hardhat 模板，可以在 `ConfidentialERC20.sol` 中找到此代码。
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@inco/lightning/src/Lib.sol";
import "@openzeppelin/contracts/access/Ownable2Step.sol";

contract ConfidentialERC20 is Ownable2Step {
    // Events
    event Transfer(address indexed from, address indexed to);
    event Approval(address indexed owner, address indexed spender);
    event Mint(address indexed to, uint256 amount);
    event UserBalanceDecrypted(address indexed user, uint256 decryptedAmount);

    // State variables
    uint256 public _totalSupply;
    string public _name;
    string public _symbol;
    uint8 public constant decimals = 18;

    // Encrypted state
    mapping(address => euint256) internal balances;
    mapping(address => mapping(address => euint256)) internal allowances;
    mapping(uint256 => address) internal requestIdToUserAddress;

    constructor() Ownable(msg.sender) {
        _name = "Confidential USD";
        _symbol = "cUSD";
    }

    // Minting functions
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

    function _mint(bytes calldata encryptedAmount) public virtual {
        balances[msg.sender] = e.add(
            balances[msg.sender],
            e.newEuint256(encryptedAmount, msg.sender)
        );
        e.allow(balances[msg.sender], address(this));
        e.allow(balances[msg.sender], owner());
        e.allow(balances[msg.sender], msg.sender);
    }

    // Transfer functions
    function transfer(
        address to,
        bytes calldata encryptedAmount
    ) public virtual returns (bool) {
        transfer(to, e.newEuint256(encryptedAmount, msg.sender));
        return true;
    }

    function transfer(
        address to,
        euint256 amount
    ) public virtual returns (bool) {
        ebool canTransfer = e.ge(balances[msg.sender], amount);
        _transfer(msg.sender, to, amount, canTransfer);
        return true;
    }

    // View functions
    function balanceOf(address wallet) public view virtual returns (euint256) {
        return balances[wallet];
    }

    // Approval functions
    function approve(
        address spender,
        bytes calldata encryptedAmount
    ) public virtual returns (bool) {
        approve(spender, e.newEuint256(encryptedAmount, msg.sender));
        return true;
    }

    function approve(
        address spender,
        euint256 amount
    ) public virtual returns (bool) {
        _approve(msg.sender, spender, amount);
        emit Approval(msg.sender, spender);
        return true;
    }

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

    // Allowance functions
    function allowance(
        address owner,
        address spender
    ) public view virtual returns (euint256) {
        return _allowance(owner, spender);
    }
    
    function _allowance(
        address owner,
        address spender
    ) internal view virtual returns (euint256) {
        return allowances[owner][spender];
    }

    // TransferFrom functions
    function transferFrom(
        address from,
        address to,
        bytes calldata encryptedAmount
    ) public virtual returns (bool) {
        transferFrom(from, to, e.newEuint256(encryptedAmount, msg.sender));
        return true;
    }

    function transferFrom(
        address from,
        address to,
        euint256 amount
    ) public virtual returns (bool) {
        ebool isTransferable = _updateAllowance(from, msg.sender, amount);
        _transfer(from, to, amount, isTransferable);
        return true;
    }

    // Internal helper functions
    function _updateAllowance(
        address owner,
        address spender,
        euint256 amount
    ) internal virtual returns (ebool) {
        euint256 currentAllowance = _allowance(owner, spender);
        ebool allowedTransfer = e.ge(currentAllowance, amount);
        ebool canTransfer = e.ge(balances[owner], amount);
        ebool isTransferable = e.select(
            canTransfer,
            allowedTransfer,
            e.asEbool(false)
        );
        _approve(
            owner,
            spender,
            e.select(
                isTransferable,
                e.sub(currentAllowance, amount),
                currentAllowance
            )
        );
        return isTransferable;
    }

    function _transfer(
        address from,
        address to,
        euint256 amount,
        ebool isTransferable
    ) internal virtual {
        euint256 transferValue = e.select(
            isTransferable,
            amount,
            e.asEuint256(0)
        );
        euint256 newBalanceTo = e.add(balances[to], transferValue);
        balances[to] = newBalanceTo;
        e.allow(newBalanceTo, address(this));
        e.allow(newBalanceTo, to);

        euint256 newBalanceFrom = e.sub(balances[from], transferValue);
        balances[from] = newBalanceFrom;
        e.allow(newBalanceFrom, address(this));
        e.allow(newBalanceFrom, from);

        emit Transfer(from, to);
    }
}
```
## 合约结构


  <CardOption
    title="Imports"
    description=""
  >
  - 加密用 Inco 库
  - 所有权管理用 OpenZeppelin
  </CardOption>

  <CardOption
    title="State"
    description=""
  >
  - 公开代币详情
  - 加密余额与授权额度
  - 请求追踪
  </CardOption>
  <CardOption
    title="Functions"
    description=""
    >
    - 标准 ERC20 接口
    - 加密变体以保护隐私
    - 内部辅助工具
    </CardOption>


## 部署
使用 Hardhat Ignition 部署合约：

1. 在 `ignition/modules/ConfidentialToken.ts` 中创建部署模块：
```solidity

const ConfidentialERC20Module = buildModule("ConfidentialERC20Module", (m) => {
  const confidentialERC20Module = m.contract("ConfidentialERC20");
  return { confidentialERC20Module };
});

export default ConfidentialERC20Module;
```

2. 使用以下命令进行部署：
```bash
pnpm hardhat ignition deploy ./ignition/modules/ConfidentialToken.ts --network baseSepolia
```

3. 运行测试以验证部署：
```bash
pnpm hardhat test --network baseSepolia
```

> 该合约将部署以下内容：
> - Name: “Confidential USD”
> - Symbol: “cUSD”
> - Decimals: 18
> - Owner: The deploying address (msg.sender)
:::info
请务必保存已部署的合约地址以便后续交互。在集成前端或其他合约时您将需要用到该地址。
:::