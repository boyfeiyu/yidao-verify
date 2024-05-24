const fs = require('fs')
const crypto = require('crypto')
const path = require('path')
const normalizeString = require(path.resolve(
  __dirname,
  '../utils/utils'
)).normalizeString

const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../keys/rsa_yidao_pri_4096.pem'),
  'utf8'
)

const content = fs.readFileSync(
  path.resolve(__dirname, './contentText.txt'),
  'utf8'
)

const { title, normalizedString } = normalizeString(content)
contentHash = crypto.createHash('sha256').update(normalizedString).digest('hex')

const data = {
  title,
  hash: contentHash,
  signTime: new Date().toISOString().split('T')[0],
}

const signResStr = crypto
  .privateEncrypt(privateKey, JSON.stringify(data))
  .toString('base64')

const signToFileStr =
  '-----以下为签名内容-----\n\n' +
  signResStr.match(/.{1,57}/g).join('\n\n') +
  '\n\n-----签名内容结束-----'

fs.writeFileSync(path.resolve(__dirname, './signText.txt'), signToFileStr)
fs.writeFileSync(
  path.resolve(__dirname, './normalizeContentResult.txt'),
  normalizedString
)

console.log('签名成功，结果请查看 signText.txt 文件！')
