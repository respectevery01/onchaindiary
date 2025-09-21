# Delta Litepaper

# 引言

Delta 是一个 “无需许可的网络之网”，其体系内的每个成员网络（称为 “域”，domain）均可与其他任意域实现安全高效的互操作。每位终端用户都拥有与每个域关联的 “账户库”（vault，详见 “账户” 章节）。一个账户库仅能通过其关联的域进行资产支出，但可接收来自其他任意域的资产。

连接各域的网络由 “验证者”（validators）运营，该网络被称为 “基础层”（base layer）。验证者负责传播和处理来自各域的交易数据，验证与这些数据对应的简洁非交互式零知识证明（SNARKs [1]），并在存在恶意参与者的情况下保障域与用户的安全。即便某一域存在恶意行为，也无法对其他域或其用户造成损害。任意两个域的任意两名用户，均可通过任意方式进行交易与交互，无需依赖第三方托管机构或其他中介。

Delta 的状态模型基于无冲突复制数据类型（CRDTs [3]）构建，这一设计使基础层协议具备高度轻量化与稳健性的特点。

## 执行

终端用户直接与域交互。但若遭遇域的审查或故障，用户有权通过基础层 “退出” 该域，并将资金转移至其他域，这一操作被称为 “强制迁移”（forced migration）。因此，一个域既可以由单一中心化实体运营，也可由无需许可的验证者组运营，或采用介于两者之间的任何运营模式，且不会影响终端用户的财产所有权。

执行模型由 “全局法则”（global laws）与 “域内法则”（local laws）共同决定：

- **全局法则**：包括 “不得通过非关联域进行资产支出”，以及针对特定资产的规则（如黑白名单、铸币权限等）。这些法则适用于所有域，旨在保障域与资产的安全。

- **域内法则**：由域在部署时自行声明，用于向用户承诺其将遵循的规则 —— 例如 “仅执行指定的程序集”，或 “运行以太坊虚拟机（EVM）/Solana 虚拟机（SVM）”。域内法则可设为空集，以降低域的计算需求。

域的运营者可按自定义频率对用户交易进行排序与执行，并据此设定域的交易延迟。对排序后的交易列表执行计算后，会生成 “状态差异列表”（State Diff List，简称 SDL）—— 这是一种用于描述状态变更的标准化压缩格式。SDL 会直接提交至基础层。运营者需结合交易数据，必要时还需结合执行轨迹，计算生成两份 SNARK 证明（若无需遵循域内法则，则只需一份），以证明该 SDL 符合该域的全局法则与域内法则。

## SDL 的偏序关系

由于资产 “支出” 与 “接收” 的操作存在不对称性，SDL 之间无需形成 “全序关系”（totally ordered），即可确保最终生成的状态具备确定性。事实上，SDL 自身已包含所有必要数据，可直接形成 “隐式偏序关系”（implicit partial ordering）。

每个 SDL 均带有序列号，因此同一域的所有 SDL 之间会形成全序关系。此外，每个 SDL 会标注其依赖的 “外部 SDL 集合”—— 即来自其他域、且其最终状态被视为当前 SDL 输入条件的 SDL。这些数据共同构成了 SDL 依赖关系的 “有向无环图”（directed acyclic graph，简称 DAG），该图可唯一确定网络的状态。

## 共识

提交至 Delta 验证者的交易需遵循以下两种协议之一：

如前一节所述，SDL 无需依赖外部协议来确定排序，因此会通过 “无共识快速路径”（consensus-free fast path）传播，具体采用 “拜占庭可靠广播”（Byzantine Reliable Broadcast [2]）机制。SDL 证明的处理也采用此方式。

仅有少数其他类型的交易可提交至基础层，包括 “创建 / 移除验证者或域”“将用户账户库从一个域强制迁移至另一个域”。这些交易类型同样无需依赖全序关系，但 Delta 验证者会运行一套 “最小化共识算法”（minimal consensus algorithm），该算法会划分 “周期”（epochs），上述交易仅会在周期边界（epoch boundaries）进行处理。

## 结算（Settlement）

与用户相关的状态会根据 SDL 快速路径持续更新，并在其关联的 SNARK 证明验证通过后完成结算。由于不存在 “基于领导者的共识”（leader-based consensus）与 “区块”（blocks），域可通过其自身运营的验证者提交 SDL，从而确保 SDL 的结算。

非 SDL 交易与非 SNARK 证明交易，会在每个周期结束时（即该周期内所有 SDL 与 SNARK 证明均已提交后），作为 “周期转换函数”（epoch transition function，简称 ETF）的一部分进行处理。ETF 会同步更新验证者集合与域集合。

## 资产与账户

资产是全局状态的一部分，既保障了跨域互操作的流畅性，也为用户提供了统一的跨域体验 —— 某一特定资产在所有域中仅存在唯一实现形式。

一个 Delta 账户包含存储在 “账户注册表”（Account Registry）中的少量数据，主要包括账户的公钥（对应一种或多种签名方案，或多签数据）。

此外，每个账户在每个域中均拥有一个 “账户库”，账户在该域的资产会存储于其中。作为替代方案，用户也可将资产存储在本地，仅在 Delta 的公开状态中保留默克尔根（Merkle root），以此获得隐私保护优势。

在实际操作中，用户只需使用其 Delta 密钥对直接登录应用（即域），即可向该域提交交易，并使用存储在该应用状态所属账户库中的资产。

## 参考文献

[1] Eli Ben-Sasson, et al. "Succinct Non-Interactive Zero Knowledge for a von Neumann Architecture." 2013. Link: [https://eprint.iac](https://eprint.iacr.org/2013/879)[r.org](https://eprint.iacr.org/2013/879)[/2013](https://eprint.iacr.org/2013/879)[/879](https://eprint.iacr.org/2013/879) (Preprint).

[2] Gabriel Bracha. "Asynchronous Byzantine Agreements." In *Information and Computation*, Vol. 75, No. 2, November 1987, pp. 130-143.

[3] Marc Shapiro, Nuno Preguiça, Carlos Baquero. "Conflict-Free Replicated Data Types." In *Stability, Safety, and Security of Distributed Systems*, Heidelberg, Germany: Springer, 2011, pp. 386-400.