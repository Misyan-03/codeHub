
const jwt = require('jsonwebtoken')
const { private_key,public_key } = require('../config/keys')
class LoginController {
    sign(ctx, next) {
        //获取从数据库查询到信息
        const { id, name } = ctx.user
        // 4.颁发token
        const token = jwt.sign({ id, name }, private_key, {
            expiresIn: '24h',
            algorithm: 'RS256',
            // algorithm: 'HS256'  //加密算法
        })
        ctx.body = {
            code: 0,
            data: {
                id,
                name,
                token: token
            }
        }
    }
    test(ctx, next) { ctx.body = '可以访问' }
}
module.exports = new LoginController()