
# 设置 Hardhat 环境
这是使用 [Hardhat 模板](https://github.com/Inco-fhevm/inco-lite-template)部署和理解机密 ERC20 的快速入门指南。

**1. 先决条件**

我们建议先安装 nvm（Node 版本管理器），然后使用 nvm 安装 Node.js。
- 对于 Linux：官方 Linux 版本可在[此处](https://github.com/nvm-sh/nvm)找到或遵循[这个教程](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)。
- 对于 Windows，请遵循 [Readme 指南](https://github.com/coreybutler/nvm-windows/blob/master/README.md#installation--upgrades)。
- 对于 Mac，您可以遵循[这个教程](https://tecadmin.net/install-nvm-macos-with-homebrew/)。

安装 Node.js：
```bash
nvm install node
```
安装 pnpm：
```bash
npm install -g pnpm
```

**2. 设置您的环境**
    1. 克隆模板项目：
```bash
git clone https://github.com/Inco-fhevm/inco-lite-template.git
cd inco-lite-template
```
    2. 安装依赖项：
```bash
pnpm install
```
    3. 设置 `.env` 文件。您可以使用以下来自 `README` 的值：
```bash
# This should be a private key funded with native tokens.
PRIVATE_KEY_ANVIL="0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"
PRIVATE_KEY_BASE_SEPOLIA=""

# This should be a seed phrase used to test functionalities with different accounts.  
# You can send funds from the main wallet to this whenever needed.
SEED_PHRASE="garden cage click scene crystal fat message twice rubber club choice cool"

# This should be an RPC URL provided by a proper provider  
# that supports the eth_getLogs() and eth_getFilteredLogs() methods.
LOCAL_CHAIN_RPC_URL="http://localhost:8545"
BASE_SEPOLIA_RPC_URL="https://base-sepolia-rpc.publicnode.com"
```
:::info
如果没有助记词，您可以通过[此网站](https://iancoleman.io/bip39/)生成一个或使用我们的默认测试账户。建议使用 RPC 提供商而非公共端点，以便更好地访问日志。
:::
    4. 编译合约：
```bash
pnpm hardhat compile
```
    5. Run a local Node
:::info
当前指令将运行一个本地节点和一个本地协验证器。如果您将此模板用于其他网络（例如 Base Sepolia），请跳过此步骤。
:::
```bash
docker compose up
```
    6. 运行测试：
```bash
pnpm hardhat test --network anvil
```

## 在 Base Sepolia 上部署

在 `.env` 文件中设置 `PRIVATE_KEY_BASE_SEPOLIA` 和 `BASE_SEPOLIA_RPC_URL` 字段后，运行以下命令：
```bash
pnpm hardhat ignition deploy ./ignition/modules/ConfidentialToken.ts --network baseSepolia
```
然后，你可以通过以下方式确保测试通过：
```bash
pnpm hardhat test --network baseSepolia
```
## 下一步
现在您已经部署并测试了合约，让我们来了解它是如何工作的。