
# 在现有项目中使用 IncoJS
将 incoJS 集成到您现有的 JavaScript/TypeScript 项目中。


:::info
目前仅针对 Webpack 和 NextJS 进行了测试。如果您使用 Rollup 或 Vite，请在[此处](https://docs.google.com/forms/d/e/1FAIpQLSetj4PsvNUSTP7nQYun9D-VF1cXX6YtYctjKkzC4j-x_g2wXg/viewform)报告任何问题
:::

## 安装
选择您喜欢的包管理器：
```bash
npm install @inco/js
# or
bun install @inco/js
# or
yarn add @inco/js
```

## 使用
`@inco/js` 的典型用法包括三个步骤：
1. 加密一个值。
2. 将密文发布到合约，合约将对其进行机密计算。
3. 请求对计算结果进行重新加密。

### 1. 加密一个值
```js

// Setup: do it once at initialization
const chainId = supportedChains.baseSepolia;
const zap = Lightning.latest('testnet', chainId); // Connect to Inco's latest public testnet
const walletClient = createWalletClient({
  chain: getViemChain(chainId),
  account: /* Choose your account, e.g. from window.ethereum */,
  transport: /* Choose your transport, e.g. from Alchemy */,
});
const dappAddress = '0x00000000000000000000000000000000deadbeef'; // Put your contract address here

// Encrypt the plaintext value
const plaintext = 42;
const ciphertext = await zap.encrypt(plaintext, {
  accountAddress: walletClient.account.address,
  dappAddress,
});

console.log(ciphertext); // A long hex string representing the encrypted value
```

### 2. 将密文发布到合约
此步骤无需任何特定的 `@inco/js` 功能。我们推荐使用 [viem](https://viem.sh/) 与区块链交互。具体来说，使用 `writeContract` 方法提交交易。将先前加密步骤中的 `ciphertext` 作为类型为 `bytes` 的输入密文参数传递。
​
### 3. 请求重加密
交易提交后，Inco 协验证器将处理计算请求。合约将计算结果作为句柄存储在链上。该句柄（下文以 `resultHandle` 表示）是一个 `Handle` 类型的十六进制字符串，用作加密计算输出的引用标识。
```js

// Request a re-encryption of the result ciphertext
const resultHandle = "0x..." as Hex; // Retrieve the handle from the contract, e.g. using viem
const reencryptor = await zap.getReencryptor(walletClient); // Use same walletClient as previous step
const resultPlaintext = await reencryptor({ handle: resultHandle });

console.log(resultPlaintext.value); // The decrypted value
```