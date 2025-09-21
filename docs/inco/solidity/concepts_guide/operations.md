
# Operations
私有状态计算

Inco 提供对加密数据执行数学和逻辑运算的能力。请注意，对于需要两个参数的操作（即以下二元类型），您可以将 e 类型或常规变量用作第一个或第二个参数。每个操作均返回单个 e-type 作为结果。
:::info
在底层，所有操作都是通过调用 Inco 合约单例来执行的。Inco 合约会检查访问控制规则，并为每个操作发出一个事件。
:::
## 示例用法
```Solidity
euint256 a = e.asEuint256(2);
euint256 b = e.asEuint256(3);
euint256 c = a.add(b); // c = 5 (encrypted)
```
## 支持的数学运算
所有这些操作都返回一个 `euint256` 。
| 名称           | 函数     | 类型   |
| -------------- | -------- | ------ |
| Addition       | `e.add`  | Binary |
| Subtraction    | `e.sub`  | Binary |
| Multiplication | `e.mul`  | Binary |
| Division       | `e.div`  | Binary |
| Remainder      | `e.rem`  | Binary |
| BitAnd         | `e.and`  | Binary |
| BitOr          | `e.or`   | Binary |
| BitXor         | `e.xor`  | Binary |
| Shift Right    | `e.shr`  | Binary |
| Shift Left     | `e.shl`  | Binary |
| Rotate Right   | `e.rotr` | Binary |
| Rotate Left    | `e.rotl` | Binary |

## 支持的比较操作
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

## 生成一个加密随机数
```solidity
euint256 randomNumber = e.rand();
```