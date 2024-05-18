// 这个库koa是内置的,直接引入
const crypto = require('crypto')
function md5password(password) {
    const md5 = crypto.createHash('md5')
    //用md5对password进行加密,返回加密后的字符串,并且是16进制的字符串,不是字符串,所以要用toString()方法转
    const md5psd = md5.update(password).digest('hex')
    console.log(md5psd)
    return md5psd
}
module.exports = md5password;