// 统一处理下keys
const fs = require('fs')
const path = require('path')
// const private_key = fs.readFileSync('.src/config/keys/private_key.pem')
// const public_key = fs.readFileSync('.src/config/keys/public_key.pem')\
//__dirname当前目录
//path.resolve(__dirname, './keys/private_key.pem')路径拼接，当前目录/keys/private_key.pem,
// 拼出绝对路径 D:\前端的学习之路\项目\codeHub\src\config\...就能找到了
//__filename 
//D:\前端的学习之路\项目\codeHub\src\config\keys.js
const private_key = fs.readFileSync(path.resolve(__dirname, './keys/private_key.pem'))
const public_key = fs.readFileSync(path.resolve(__dirname, './keys/public_key.pem'))

module.exports = {
    private_key,
    public_key
}
// 保证公钥是根据私钥创建的一对就行，以后可直接用,不需要在openSSL生产了