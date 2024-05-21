const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const normalizeString = require(path.resolve(__dirname, '../utils/utils')).normalizeString;

const publicKey  = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_yidao_pub_4096.pem'), 'utf8');
const signData = fs.readFileSync(path.resolve(__dirname, './signText.txt'), 'utf8');
let content = fs.readFileSync(path.resolve(__dirname, './contentText.txt'), 'utf8');

// 读取文件内容，去除空格、换行符、数字、标点
content = normalizeString(content)
contentHash = crypto.createHash('sha256').update(content).digest('hex');

// 解密签名
try {
  const signStr = crypto.publicDecrypt(publicKey, Buffer.from(signData, 'base64')).toString('utf8');
  const dataObj = JSON.parse(signStr);

  if(dataObj.hash !== contentHash) {
    console.log('验证失败，哈希值不一致，请注意操作流程，或内容可能被篡改！')
  } else {
    console.log('验证成功！')
    console.log(signStr)
    
  }
} catch (error) {
  console.log('验证失败，公钥解密失败，签名不来自文集整理者，内容可能被篡改！')
}





