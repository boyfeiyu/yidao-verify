## 背景
本程序用于《不知道人导师讲道合集》的文章签名与验证，使用RSA非对称加密算法。

## 开始
1. git clone 本仓库
2. 确保node.js版本 >= 20.11.10

## 签名流程(用户无需关注)
1. 将拟签名文本复制到signature目录下的contentText.txt中
2. 运行 npm run sign

## 验证流程
1. 将待验证文本复制到signature-verification目录下的contentText.txt中
2. 将签名复制到signature-verification目录下signText.txt中
3. 运行 npm run verify

