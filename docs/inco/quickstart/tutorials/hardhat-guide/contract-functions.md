
# 合约功能
理解机密代币的核心功能

## 构造函数
构造函数设置初始代币配置：
```solidity
constructor() Ownable(msg.sender) {
    _name = "Confidential USD";
    _symbol = "cUSD";
}
```

## 铸造代币
有两种铸造函数适用于不同场景：
```solidity
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
:::info
`_mint` 函数接受加密金额以增强隐私性。
:::

## 转账功能
提供两种转账版本：
```solidity
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

## 审批系统
审批系统允许委托支出：
```solidity
// Approve for EOAs
function approve(
    address spender,
    bytes calldata encryptedAmount
) public virtual returns (bool) {
    approve(spender, e.newEuint256(encryptedAmount, msg.sender));
    return true;
}

// Approve for contracts
function approve(
    address spender,
    euint256 amount
) public virtual returns (bool) {
    _approve(msg.sender, spender, amount);
    emit Approval(msg.sender, spender);
    return true;
}

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

## TransferFrom 函数
对于已批准代币的支出：
```solidity
// TransferFrom for EOAs
function transferFrom(
    address from,
    address to,
    bytes calldata encryptedAmount
) public virtual returns (bool) {
    transferFrom(from, to, e.newEuint256(encryptedAmount, msg.sender));
    return true;
}

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

## 查看功能
检查余额和授权的函数：
```solidity
// Get encrypted balance
function balanceOf(address wallet) public view virtual returns (euint256) {
    return balances[wallet];
}

// Get encrypted allowance
function allowance(
    address owner,
    address spender
) public view virtual returns (euint256) {
    return _allowance(owner, spender);
}
```

## 所有者功能
合约所有者专用功能：
```solidity
// Request balance decryption
function requestUserBalanceDecryption(
    address user
) public onlyOwner returns (uint256) {
    euint256 encryptedBalance = balances[user];
    e.allow(encryptedBalance, address(this));

    uint256 requestId = e.requestDecryption(
        encryptedBalance,
        this.onDecryptionCallback.selector,
        ""
    );
    requestIdToUserAddress[requestId] = user;
    return requestId;
}

// Decryption callback
function onDecryptionCallback(
    uint256 requestId,
    bytes32 _decryptedAmount,
    bytes memory data
) public returns (bool) {
    address userAddress = requestIdToUserAddress[requestId];
    emit UserBalanceDecrypted(userAddress, uint256(_decryptedAmount));
    return true;
}
```
## 下一步
看看这些功能如何在完整合约中协同工作