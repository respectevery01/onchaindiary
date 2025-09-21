# Circle Research 与 Inco 探索基于加密技术的机密性 ERC20 代币框架

区块链是金融基础设施的未来，为个人和机构提供了无需中介的交易方式。然而，目前的区块链在机密性方面存在不足：其公开化、伪匿名的设计缺乏消费者和企业广泛采用所需的强机密性。

用户通常通过中心化交易所等基础设施来实现机密性，这重新引入了区块链旨在避免的单点故障和中介化架构。另一方面，私有链等解决方案无法提供像以太坊这类现有公链的流动性和开发者活跃度，而混币器等专注于匿名性的隐私解决方案又无法满足消费者和个人所需的合规与监管要求。

[Circle Research](https://www.circle.com/circle-research) 与 Inco 合作推出基于全同态加密（FHE）的隐私 ERC20 代币框架，该技术支持在无需解密的情况下对加密数据进行计算。用户可通过封装其 ERC20 代币将其转换为隐私 ERC20 代币（该框架也支持铸造与销毁机制）。隐私 ERC20 代币能利用 FHE 技术隐藏地址间的转账金额，同时保持资金流向可见性。

您可在 [此处](https://github.com/Inco-fhevm/confidential-erc20-framework/blob/main/whitepaper.pdf).阅读完整报告。特别感谢研究合作伙伴 Kaili Wang 与 Jacob Hirshman，以及顾问 Dan Boneh 和 Michael Mosier 提供的专业意见。

想进一步了解 FHE 如何支持您的支付场景？请通过[此处](https://docs.google.com/forms/d/e/1FAIpQLSdxdIndLL6lBFgLac4s4tsQw_JI_C1G5XwTBQR34FbXSmaKSQ/viewform?usp=sf_link)联系我们。

## [阅读报告](https://github.com/Inco-fhevm/confidential-erc20-framework/blob/main/whitepaper.pdf)

该框架相较于其他机密方法具有关键优势，例如保持以太坊生态系统的流动性和可组合性，兼容流行的 ERC20 框架，并提供让第三方能够验证交易数据特定方面的手段。

该流程简单明了：用户将其现有的 ERC20 代币进行封装，即可获得机密型 ERC20（cERC20）代币。转账金额和地址余额通过在预编译或协处理器级别采用全同态加密（FHE）增强版的以太坊虚拟机（EVM）进行加密，使得机密代币（如机密 USDC/cUSDC）能够在 EVM 兼容的生态系统中流通，同时保持可组合性和流动性。无需解密数据即可遵守转账规则或黑名单要求，以满足反洗钱（AML）等标准。最终，用户可在需要时将其 cERC20 代币换回标准的 ERC20 代币。

机密性解锁了众多应用场景，尤其在支付和去中心化金融（DeFi）领域尤为突出：

#### **支付相关用例：**

- 私人跨境支付：支持私密国际交易，在遵守当地法规的同时保护敏感财务信息。

- 私人代币归属管理：管理与自动化已归属代币的分配，确保分配时间表和金额的机密性。

- 私有 B2B 薪资服务：促进企业间私有薪资处理，保护薪资详情安全，并确保符合法规要求。

- 国际汇款：提供安全私密的跨境资金转移渠道，保护汇款人和收款人免受信息泄露和欺诈风险。

#### **DeFi 相关应用场景：**

- 私有化自动做市商与暗池交易：执行加密交易量的私有代币兑换，有效防止抢先交易并保护交易策略。该实施方案存在值得深入探索的技术挑战，可作为未来研究方向。
- 隐私型现实资产代币化：通过隐私保护功能实现现实资产上链，有效保障敏感的所有权信息与交易细节安全。
- 盲拍：支持在拍卖结束前保持出价机密的拍卖方式，确保竞拍过程的公平性和竞争性。
- 私人借贷：支持机密条款和抵押物的私人贷款，保护借款人隐私。通过整合链上信用评分来私下评估信用度，可能支持抵押不足的借贷。

如果您想了解更多关于机密 ERC20 框架的信息，请阅读[完整报告](https://github.com/Inco-fhevm/confidential-erc20-framework/blob/main/whitepaper.pdf)。

想了解更多关于全同态加密如何助力您的应用场景？请在[此处](https://docs.google.com/forms/d/e/1FAIpQLSdxdIndLL6lBFgLac4s4tsQw_JI_C1G5XwTBQR34FbXSmaKSQ/viewform?usp=sf_link)与我们联系。