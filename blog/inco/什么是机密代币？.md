# 什么是机密代币？

透明度是公共区块链的核心原则，任何用户都能验证公共记录是否被篡改。当中本聪撰写比特币白皮书时，其理念明确反对导致 2008 年金融危机的银行不透明运作模式——那些银行向公众隐瞒其资产状况。区块链的透明特性具有诸多优势，例如允许任何人验证账本是否被篡改就是重要例证。

但完全透明也正阻碍着区块链的广泛应用。从薪酬管理到治理机制，许多应用场景都要求严格机密。如果全球任何人都能清楚看到具体客户持有何种资产，金融机构必然不愿将资产上链——监管机构则更甚。机密性在 Web2 中易于实现，在 Web3 中也理应如此。

理想情况下，链上机密性应在代币层面实现，但历史上这始终无法达成。采用零知识证明等技术的承诺方案虽能提供隐私保护，却会牺牲区块链赖以构建多样化应用的互操作性。

<iframe width="768" height="432" src="https://www.youtube.com/embed/soIXZNmKO28" title="Confidential Tokens? New cERC20 developed by Inco and Circle Research" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Inco 团队针对此问题开发了解决方案。通过加密技术，标准 ERC20 代币可在保持互操作性的同时实现机密性。更重要的是，机密性可通过智能合约进行编程设定——在向公众隐藏交易金额等细节的同时，授权特定方获取这些信息。这对需要遵守反洗钱等监管规定的机构而言至关重要。

我们与 Circle Research 团队合作，共同制定了一套针对这种机密 ERC20（cERC20）代币标准的[框架](https://www.inco.org/blog/circle-research-inco-confidential-erc20-report)。在本文中，我们将详细探讨 cERC20 代币，并深入解析其在代码和加密层面的运作机制，随后概述通过 cERC20 标准实现的链上加密驱动的机密性所开启的应用场景。

##  什么是 ERC20 代币？

在我们深入探讨 cERC20 之前，先来概述其原始版本 ERC20 的定义。

ERC20 是以太坊区块链上同质化代币的技术标准。同质化代币具有可互换的价值单位特性，意味着每个代币之间完全等同。该标准为创建此类代币提供了蓝图，明确规定了代币智能合约必须实现的功能和事件，以确保与基于以太坊的工具和服务兼容。

### 同质化与非同质化特性对比

诸如 ERC20 的同质化代币代表每个单位都具有相同价值和属性的资产，例如加密货币或稳定币。相反，以 ERC721 和 ERC1155 等代币标准为代表的非同质化代币（NFT）则代表艺术品或收藏品等独特资产。

### 代码解析

ERC20 标准定义了一组需要实现的变量和函数。以下是相关代码片段的解释：

#### 变量

- 地址：代币持有者的以太坊地址。
- 余额：地址持有的代币数量。

```
mapping(address => uint256) private balances;
string public name;
string public symbol;
uint8 public decimals;
```

此代码定义了代币的基本要素。请注意，余额映射是从地址到整数的定义。

#### 函数

- balanceOf 函数接收用户地址作为参数，并返回该地址账户所持有的对应余额。
- transfer 函数接收用户地址和整数参数，将指定数量的代币转移至输入的目标地址。
- mint 函数接收用户地址和整数参数，向输入地址创建指定数量的代币并增加总供应量。
- 同样地，销毁功能接收一个用户地址和一个整数，从输入地址中移除指定数量的代币，并减少总供应量。

```
function balanceOf(address account) public view returns (uint256) {
    return balances[account];
}

function transfer(address recipient, uint256 amount) public {
    require(balances[msg.sender] >= amount, "Insufficient balance");
    balances[msg.sender] -= amount;
    balances[recipient] += amount;
}

function mint(address account, uint256 amount) public {
    balances[account] += amount;
    totalSupply += amount;
}

function burn(address account, uint256 amount) public {
    balances[account] -= amount
    totalSupply -= amount
}
```

### ERC20 代币存在哪些问题？

尽管 ERC20 代币标准推动了加密生态系统的大幅进步，但仍存在几个显著的改进空间。

- 缺乏隐私性：所有交易和余额在区块链上都是公开可见的。
- 易受抢先交易影响：透明交易可能导致去中心化金融（DeFi）中的抢先交易攻击。
- 适用范围有限：无法满足机构和监管合规的隐私要求。

## 什么是全同态加密（FHE）？

现在让我们深入探讨一项能够支撑 cERC20 代币的核心加密技术：全同态加密（FHE）。

全同态加密是一种密码学技术，允许在不解密的情况下对加密数据进行计算。这些计算的结果仍保持加密状态，只有数据所有者才能解密。这一特性在确保隐私的同时实现了功能性的需求。

全同态加密方案基于诸如带误差学习（LWE）等困难数学问题构建。其核心在于能够对密文进行代数运算，从而在不暴露原始明文的情况下得出有意义的结果。

### Web3 中的全同态加密

在 Web3 背景下，全同态加密（FHE）通过私有智能合约和加密代币操作赋能 fhEVM。通过对代币余额和交易金额等敏感数据进行加密，FHE 在保持区块链应用可组合性的同时确保数据机密性。

### 加密类型

fhEVM 中设有额外的私有状态，允许开发者存储加密数据。这些状态包括：

- ebool
- eaddress
- euint8
- euint16
- euint32

### 加密方法

除了这些加密类型外，TFHE 库还提供加密操作；

- TFHE.add()
- TFHE.sub()
-  TFHE.mul()

以及比较，例如：

- TFHE.eq()
- TFHE.gt()
- TFHE.max()

## 什么是 cERC20 代币？

如果你能通过提供一种在链上实现余额和转账金额机密性的方式来扩展原有的 ERC20 标准，那会怎样？

cERC20 合约支持铸造新代币、在账户间转移代币以及管理代币授权额度（指定一个账户被允许代表另一个账户花费的金额），同时保持金额加密状态。此外，只有合约部署者能够查看所有人的余额。如果需要，合约所有者还可以全局解密特定用户的余额。

### 代码解析

cERC20 代币的一个关键优势在于其简洁性：cERC20 智能合约与标准 ERC20 代币的合约基本相同，仅存在少量改动。

#### 变量

```
mapping(address => euint64) internal balances;
```

请注意，常规 ERC20 合约中的余额映射是从地址到整数的定义，而此处则是从地址到加密整数的定义。

#### 函数

**_mint** 函数接收一个用户地址、一个整数和一个输入证明，用于向输入地址创建指定数量的代币，同时不暴露铸造的数量。

```
function _mint(address account, euint256 encryptedAmount, bytes calldata inputProof) public virtual onlyOwner {
    balances[account] = TFHE.add(balances[account], TFHE.asEuint256(encryptedAmount, inputProof)); 
}
```

同样地，**_burn** 函数接收一个用户地址、一个整数和一个输入证明，用于从输入地址中移除指定数量的代币，同时确保金额的隐私性不受影响。

```
function _burn(address account, euint256 encryptedAmount, bytes calldata inputProof) public virtual onlyOwner {
    balances[account] = TFHE.sub(balances[account], TFHE.asEuint256(encryptedAmount, inputProof)); 
}
```

**_transfer**函数接收一个用户地址和一个整数，以加密方式将指定数量的代币转移到输入的地址。

```
function _transfer(address to, euint64 encryptedAmount) internal virtual {
    euint256 newBalanceTo = TFHE.add(balances[to], encryptedAmount);
    balances[to] = newBalanceTo;
    
    euint256 newBalanceFrom = TFHE.sub(balances[msg.sender], encryptedAmount);
    balances[msg.sender] = newBalanceFrom;
}
```

请注意这些新变量和函数：它们由 FHE 技术支持，使得代币能够在链上实现机密性。

## cERC20 优势

### 承诺机制与解密机制

机密交易有潜力显著推动加密货币的普及，但实现方式多种多样。其中两种主要方法是基于承诺和基于加密的模型，各自具有独特的优势和权衡。

基于承诺的模型依赖于零知识证明（ZKPs）。这些技术允许用户对加密值创建“承诺”，并在不泄露底层信息的情况下进行验证。例如，用户可以锁定一笔隐藏的转账金额，同时证明其正确性。这种方法在既需要隐私又需要验证，且全部细节（如身份或金额）必须机密的情况下非常理想。

然而，基于承诺的模型灵活性有限。由于承诺是通过唯一密钥生成的，更新查看权限（例如授予审计员访问权）具有挑战性。一旦密钥设定，便难以修改，这使得该方法更适用于访问需求静态的场景。

cERC20 代币采用基于加密的技术方案。这种加密技术能够在保护敏感数据隐私的同时对加密信息进行计算，使得诸如余额核算或交易验证等流程无需暴露任何信息即可完成。此外，加密方案天然具备更高灵活性——通过智能合约规则可动态更新或共享查看权限，特别适用于薪酬发放等场景：交易金额对外隐藏，但授权审计方在需要时可获取详细信息。

虽然承诺制方案适用于需要严格隐私保护和预设访问控制的场景（例如医疗机密数据），但加密方案能提供动态访问控制与可组合性，从而解锁薪酬管理及隐私 DeFi 等应用场景。采用这种方案后，cERC20 的架构使其能够以标准 ERC20 代币相同的方式在链上使用，开发者可构建具有可组合性和灵活性的应用程序，因为用户无需使用自有密钥进行解密。

考虑到这一点，cERC20 可以在链上生态系统中以最少的技术考量被采纳，使其非常适合采用。

### 解密规则

进一步来说，cERC20 代币可内置解密规则，这意味着经授权的参与方无需获取用户密钥即可获得访问权限——用户不愿分享密钥是可以理解的。cERC20 代币可照常进行链上交易，但隐藏余额与转账金额，随后可设置解密规则，例如允许审计人员查看这些金额与余额。审计人员无需获得用户密钥的访问权——加密机制意味着可向特定地址授予查看权限。

这非常强大：cERC20 代币在保持完全可组合性与安全性的同时，还能灵活地允许用户向他人开放查看权限，以满足诸如监管合规等使用场景的需求。

### 易于构建

最后值得一提的是，cERC20 架构使其构建过程极为简便。

开发者无需学习新的工具集、不同的区块链架构或其他编程语言，他们可以立即使用与构建标准 ERC20 智能合约相同的工具和技能（如 Hardhat）上手运行，并且只需对 Solidity 智能合约代码进行少量修改即可（详见上方代码示例）。

## 用例

cERC20 代币解锁了一系列标准 ERC20 无法实现的应用场景。以下是一份非详尽的应用案例列表。

### 支付相关用例：

- 私人跨境支付：支持私密国际交易，在遵守当地法规的同时保护敏感财务信息。
- 私人代币归属管理：管理与自动化已归属代币的分配，确保分配时间表和金额的机密性。
- 私有 B2B 薪资服务：促进企业间私有薪资处理，保护薪资详情安全，并确保符合法规要求。
- 国际汇款：提供安全私密的跨境资金转移渠道，保护汇款人和收款人免受信息泄露和欺诈风险。

### DeFi 相关用例：

- 私有化自动做市商与暗池交易：执行加密交易量的私有代币兑换，有效防止抢先交易并保护交易策略。该实施方案存在值得深入探索的技术挑战，可作为未来研究方向。
- 隐私型现实资产代币化：通过隐私保护功能实现现实资产上链，有效保障敏感的所有权信息与交易细节安全。
- 盲拍：支持在拍卖结束前保持出价机密的拍卖方式，确保竞拍过程的公平性和竞争性。
- 私人借贷：支持机密条款和抵押物的私人贷款，保护借款人隐私。通过整合链上信用评分来私下评估信用度，可能支持抵押不足的借贷。

如果您想了解更多关于机密 ERC20 框架的信息，请阅读[完整报告](https://github.com/Inco-fhevm/confidential-erc20-framework/blob/main/whitepaper.pdf)。

想了解更多基于加密的方法如何助力您的应用场景？请在[此处](https://docs.google.com/forms/d/e/1FAIpQLSdxdIndLL6lBFgLac4s4tsQw_JI_C1G5XwTBQR34FbXSmaKSQ/viewform)与我们联系。