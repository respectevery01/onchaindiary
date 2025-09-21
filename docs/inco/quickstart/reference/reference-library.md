
# 参考库
Inco 库公开的所有函数

## 类型
- `ebool` ：加密的 `bool`
- `euint256` ：加密的 `uint256`

## 数学运算
所有这些操作都返回一个 `euint256` 。所有二元运算可以使用 `euint256` 或常规 `uint256` 作为第一个或第二个参数，或者使用两个 `euint256`

| 名称           | 函数     | 类型   |
| -------------- | -------- | ------ |
| Addition       | `e.add`  | 二进制 |
| Subtraction    | `e.sub`  | 二进制 |
| Multiplication | `e.mul`  | 二进制 |
| Division       | `e.div`  | 二进制 |
| Remainder      | `e.rem`  | 二进制 |
| BitAnd         | `e.and`  | 二进制 |
| BitOr          | `e.or`   | 二进制 |
| BitXor         | `e.xor`  | 二进制 |
| Shift Right    | `e.shr`  | 二进制 |
| Shift Left     | `e.shl`  | 二进制 |
| Rotate Right   | `e.rotr` | 二进制 |
| Rotate Left    | `e.rotl` | 二进制 |

## 比较操作
| 名称                  | 函数    | 类型   | 返回     |
| --------------------- | ------- | ------ | -------- |
| Equal                 | `e.eq`  | Binary | ebool    |
| Not equal             | `e.ne`  | Binary | ebool    |
| Greater than or equal | `e.ge`  | Binary | ebool    |
| Greater than          | `e.gt`  | Binary | ebool    |
| Less than or equal    | `e.le`  | Binary | ebool    |
| Less than             | `e.lt`  | Binary | ebool    |
| Min                   | `e.min` | Binary | euint256 |
| Max                   | `e.max` | Binary | euint256 |
| Not                   | `e.not` | Unary  | ebool    |

## 多路复用器
- `e.select(ebool, euint256, euint256) returns(euint256)` : 根据 `ebool` 条件在两个 `euint256` 之间选择
- `e.select(ebool, ebool, ebool) returns(ebool)` : 在首个 `ebool` 条件下于两个 `ebool` 之间选择

## 输入
- `e.asEuint256(uint256) returns(euint256)` : 将 `uint256` 转换为 `euint256` （简单加密）
- `e.asEbool(bool) returns(ebool)` : 将 `bool` 转换为 `ebool` （简单加密）
- `e.newEuint256(bytes memory input) returns(euint256)` : 从密文创建新的 `euint256`
- `e.newEbool(bytes memory input) returns(ebool) `: 从密文创建新的 `ebool`

## 访问控制
- `e.allow(address)` : 允许用户永久访问该值
- `e.allowThis() `：允许当前合约永久访问该值
- `e.isAllowed(address, e-value) returns(bool)` ：检查用户是否被允许访问该值（临时或永久）

## 解密请求
- `e.requestDecryption(euint256 value, bytes4 callbackSelector, bytes memory callbackData) returns (uint256 requestId) `：请求解密一个 `euint256`
- `e.requestDecryption(ebool value, bytes4 callbackSelector, bytes memory callbackData) returns (uint256 requestId)` ：请求解密一个 `ebool`

## 解密回调格式
```solidity
function callback(
        uint256 requestId,
        uint256 result,
        bytes memory data
    ) external {
        // code
    }
```