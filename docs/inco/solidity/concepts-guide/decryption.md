
# Decryption
解密智能合约中的信息

智能合约可以触发对其可访问的任何密文的公开解密。此流程是异步的，合约首先发出请求，并在后续区块的callback
函数中接收解密结果。
:::warning
Inco 将尝试调用callback函数一次，如果调用失败则不会重试。
:::
让我们考虑以下示例，其中机密转账的发送方在转账成功后进行解密：
```solidity
function doATransfer() public {
    ebool success = token.transfer(bob, amount);
    // the third argument is arbitrary data that will be passed to the callback function
    success.requestDecryption(this.toCallback.selector, "");
}

function toCallback(
    uint256 /* requestId */, // unique id of the request, useful to track multiple requests
    bytes32 result, // result is encoded in bytes32 value 
    bytes memory /* data */ // arbitrary data passed to the callback
) external {
    bool _result = bool(result); // decode the result
    if (_result) {
        // it worked !
    }
}
```
callback函数始终期望接收这三个参数：
- `requestId` ：请求的唯一标识符，用于追踪多个请求
- `result` ：解密结果（编码后的 `bytes32` 值）
- `data` ：传递给callback函数的任意数据

`e.requestDecryption` 返回请求的唯一标识符，可用于追踪多个请求。可通过合约有权访问的 `ebool` 或 `euint256` 进行调用。

`e.requestDecryption` 函数的签名：
```solidity
function requestDecryption(
    ebool a,
    bytes4 callbackSelector,
    bytes memory callbackData
) returns (uint256 requestId);

function requestDecryption(
    euint256 a, 
    bytes4 callbackSelector, 
    bytes memory callbackData
) returns (uint256 requestId);
```