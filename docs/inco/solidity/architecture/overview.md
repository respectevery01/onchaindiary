
# 概述
Inco 是一个区块链的机密层，无需修改底层区块链即可实现隐私保护的智能合约。与整体式隐私解决方案不同，Inco 采用模块化方法，类似于 SSL/TLS 为互联网协议提供安全性的方式。

> 白皮书即将发布！

## 高级组件
Inco 的架构包含四个主要组件，它们协同工作以提供机密计算能力：
1. 智能合约库(Smart Contract Library)
2. 机密计算节点（Confidential Compute Nodes）
3. 解密节点 + 回调中继器（Decryption Nodes + Callback Relayer）
4. 客户端 JavaScript 库（Client-side JavaScript Library）

这些组件协同工作，为在区块链上构建隐私保护应用的开发者提供无缝体验。该系统处理加密数据类型，执行机密计算，并管理安全解密过程，同时保持与现有 EVM 区块链的兼容性。