
# 设置
设置你的仓库

## 使用 lightning-rod 模板（推荐）
我们推荐使用我们的[模板](https://github.com/Inco-fhevm/lightning-rod/tree/main)，它已经预先配置好了 foundry。

```bash
git clone git@github.com:Inco-fhevm/lightning-rod.git
cd lightning-rod
bun install
```

使用该模板后，你可能想直接跳转到[作弊码参考](../../reference/cheatcode-reference.md)部分。

## 手动设置
:::warning
如果您正在使用 lightning-rod 模板，则无需遵循这些步骤。
:::
按照以下步骤将 inco 添加到您现有的项目中，或手动设置一个新项目。

### 下载 inco 库
Inco 使用 npm 包提供其 Solidity 库。
```bash
bun add @inco/lightning @inco/shared
```
或者，您可以使用 npm/yarn/pnpm。
​
### 设置重映射
在合约目录的根目录下创建一个名为 `remappings.txt` 的文件。
```bash
touch remappings.txt
```
根据您的设置编辑重映射路径。
```
forge-std/=your/path/to/forge-std/src/
ds-test/=your/path/to/ds-test/src/
@inco/=path/to/your/node_modules/@inco/
@openzeppelin/=path/to/your/node_modules/@openzeppelin/
```
由于 Solidity 导入和重映射的工作方式，您的重映射必须遵循惯用形式。以下是使用 inco 时确保项目编译的要求：
- 在 `=` 符号左侧，使用以下名称
    - `forge-std/`
    - `ds-test/`
    - `@inco/`
    - `@openzeppelin/`
- 在 `=` 符号右侧，指定对应库的路径
    - `forge-std/` 应指向您本地 `forge-std` 库的 `src/` 目录
    - `ds-test/` 应指向您本地 `ds-test` 库的 `src/` 目录
    - `@inco/` 应指向您 `node_modules` 目录中的 `@inco` 目录，而不是 `@inco/lightning` 或 `@inco/shared` 目录
    - 同样地， `@openzeppelin/` 应指向您 `node_modules` 目录中的 `@openzeppelin` 目录

为了简化这一过程，我们建议使用 bun/npm 导入所有依赖项（包括 `foundry-std` 和 `ds-test` ），如下所示：
```bash
bun add  @inco/lightning @inco/shared https://github.com/dapphub/ds-test https://github.com/foundry-rs/forge-std @openzeppelin/contracts
```
并使用此重映射文件（假设您的 `node_modules` 位于合约目录的上层目录）：
```
@openzeppelin/=../node_modules/@openzeppelin/
forge-std/=../node_modules/forge-std/src/
ds-test/=../node_modules/ds-test/src/
@inco/=../node_modules/@inco/
```