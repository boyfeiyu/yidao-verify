const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const normalizeString = require(path.resolve(__dirname, '../utils/utils')).normalizeString;

// 签名时手动修改下面两行的值
const title = 'test';
const createTime = '2021-01-01';

const privateKeyStr  = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_yidao_pri_4096.pem'), 'utf8');
const privateKey = crypto.createPrivateKey(privateKeyStr);
let content = fs.readFileSync(path.resolve(__dirname, './contentText.txt'), 'utf8');
content = normalizeString(content)
contentHash = crypto.createHash('sha256').update(content).digest('hex');
const now = new Date();
const nowDate = now.toISOString().split('T')[0];

const data = {
  title,
  createTime,
  hash: contentHash,
  signTime: nowDate,
}

const signStr = crypto.privateEncrypt(privateKey, JSON.stringify(data)).toString('base64');

fs.writeFileSync(path.resolve(__dirname, './signText.txt'), signStr);
fs.writeFileSync(path.resolve(__dirname, './normalizeContentResult.txt'), content);

console.log('签名成功，生成了 signText.txt 文件！')