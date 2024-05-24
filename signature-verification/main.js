const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const normalizeString = require(path.resolve(__dirname, '../utils/utils')).normalizeString;

const publicKey  = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_yidao_pub_4096.pem'), 'utf8');
const signData = fs.readFileSync(path.resolve(__dirname, './signText.txt'), 'utf8');
const content = fs.readFileSync(path.resolve(__dirname, './contentText.txt'), 'utf8');

const { normalizedString } = normalizeString(content);
contentHash = crypto.createHash('sha256').update(normalizedString).digest('hex');

// 解密签名
try {
  const signStr = crypto.publicDecrypt(publicKey, Buffer.from(signData, 'base64')).toString('utf8');
  const dataObj = JSON.parse(signStr);

  if(dataObj.hash !== contentHash) {
    console.log('验证失败，哈希值不一致，你阅读的可能不是原文件！')
  } else {
    console.log('验证成功！')
    console.log(signStr)
    
  }
} catch (error) {
  console.log('验证失败，公钥解密失败，你阅读的可能不是原文件！')
}





