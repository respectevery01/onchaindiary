# JS SDK

Inco 网络的 JavaScript SDK 为前端开发者提供了完整的工具集，让您能够轻松地将机密计算功能集成到您的 Web 应用中。

## 📦 SDK 概述

IncoJS SDK 提供了以下核心功能：
- 🔐 加密数据处理
- 📡 与 Inco 网络的交互
- 🔑 密钥管理
- 📝 智能合约调用
- 🔄 数据重加密

## 🚀 快速开始

### 安装

```bash
npm install @inco-network/incojs
```

### 基本用法

```javascript

// 初始化网络连接
const inco = new IncoNetwork({
  network: 'testnet'
})

// 加密数据
const encryptedValue = await inco.encrypt(42)

// 调用机密智能合约
const result = await inco.contract.call('myContract', 'myFunction', [encryptedValue])
```

## 📚 开发指南

### [Next.js 集成](./guide/nextjs-starter)
学习如何在 Next.js 项目中集成 IncoJS SDK，包含完整的示例项目。

### [现有项目集成](./guide/use-incojs-in-existing-project)
了解如何将 IncoJS SDK 添加到您现有的 JavaScript/TypeScript 项目中。

## 🔧 API 参考

### 核心类和方法

- `IncoNetwork` - 主要的网络接口类
- `encrypt()` - 数据加密方法
- `decrypt()` - 数据解密方法
- `reencrypt()` - 数据重加密方法
- `Contract` - 智能合约交互类

### 配置选项

```javascript
const config = {
  network: 'testnet', // 'mainnet' | 'testnet'
  rpcUrl: 'https://testnet.inco.org',
  chainId: 9090,
  // 其他配置选项...
}
```

## 🎯 使用场景

- **机密投票系统** - 构建匿名投票应用
- **私密拍卖** - 实现密封竞价拍卖
- **机密 DeFi** - 开发隐私保护的金融应用
- **私密游戏** - 创建信息不对称的区块链游戏

## 🔗 相关资源

- [Solidity 开发指南](/docs/solidity/) - 后端智能合约开发
- [快速开始教程](/docs/quickstart/) - 完整开发流程
- [技术博客](/blog/inco/) - 最新技术动态

## 💡 示例项目

查看我们的 [GitHub 仓库](https://github.com/Inco-fhevm) 获取更多示例项目和代码片段。