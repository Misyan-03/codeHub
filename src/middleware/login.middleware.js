const { NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXIST, PASSWORD_IS_INCORRECT, UNAUTHORIZATION } = require("../config/error");
const { public_key } = require("../config/keys.js");
const userService = require("../service/user.service.js");
const md5password = require("../utils/md5-password");
const jwt = require("jsonwebtoken");
const verifyLogin = async (ctx, next) => {
    //1.用户名用户密码不能为空
    const { name, password } = ctx.request.body;
    if (!name || !password) {
        return ctx.app.emit('error', NAME_OR_PASSWORD_IS_REQUIRED, ctx);
    }
    // 2.用户名有没有被注册过,查询数据库,不管是几条数据，返回的始终是个数组，包含信息对象
    /**
     * [
         {
           id: 21,
           name: 'why',
           password: 'e10adc3949ba59abbe56e057f20f883e',
           createAt: 2024-03-11T06:55:35.000Z,
           updateAt: 2024-03-11T06:55:35.000Z
         }
      ]
     */
    const users = await userService.findUserByName(name)
    const user = users[0];
    // console.log(users[0])
    /**{
        id: 21,
        name: 'why',
        password: 'e10adc3949ba59abbe56e057f20f883e',
        createAt: 2024-03-11T06:55:35.000Z,
        updateAt: 2024-03-11T06:55:35.000Z
       }
     */
    if (!user) {
        return ctx.app.emit('error', NAME_IS_NOT_EXIST, ctx);
    }
    // 3.查询数据库的密码和用户传递的密码是否一致
    //因为数据库的密码是MD5加密的，我们把用户输的密码也加密
    if (user.password !== md5password(password)) {
        return ctx.app.emit('error', PASSWORD_IS_INCORRECT, ctx);
    }
    //4.将数据库中查到的信息存到ctx中，用于给前端返回信息
    ctx.user = user;
    await next()
}
//验证权限
const verifyAuth = async (ctx, next) => {
    //接收设置authorization里的token，由前端传递来，前端一般存到localstorage
    const authorization = ctx.headers.authorization
    //把Bearer去掉,我们获取的token默认是Bearer 开头,要去掉
    if (!authorization) {
        return ctx.app.emit('error', UNAUTHORIZATION, ctx)  
    }
    const token = authorization.replace('Bearer ', '')
    try {
        //验证token，
        const result = jwt.verify(token, public_key, {
            algorithms: ['RS256']
        })
        //将token信息保留
        ctx.user = result;
        await next()

    } catch (error) {
        ctx.app.emit('error', UNAUTHORIZATION, ctx)
    }
}

module.exports = { verifyLogin, verifyAuth };