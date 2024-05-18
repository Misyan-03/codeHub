const userService = require("../service/user.service.js")
const md5password = require("../utils/md5-password.js")

const verifyUser = async (ctx, next) => {
    //1.
    const { name, password } = ctx.request.body
    if (!name || !password) {
        // return ctx.body = {
        //     code: -1001,
        //     message: '用户名或密码不能为空'
        // }
        //ctx里有个app属性，app属性里有一个emit方法，可以触发事件，事件处理器处理事件
        //emit方法的第一个参数是事件名称，第二个参数是事件处理器的参数
        //
        return ctx.app.emit('error', 'name_or_password_is_required', ctx) //触发错误事件，并传递错误信息，事件处理器处理错误信息
    }
    //2.
    const values = await userService.findUserByName(name)
    if (values.length) {
        // return ctx.body = {
        //     code: -1002,
        //     message: '用户名已经存在,不能使用',
        // }
        return ctx.app.emit('error', 'name_is_exist', ctx) //触发错误事件，并传递错误信息，事件处理器处理错误信息
    }
    //执行下一个中间件
    await next()
}
const handlePassword = async (ctx, next) => {
    let { password } = ctx.request.body
    //封装个加密工具
    ctx.request.body.password = md5password(password)
    await next()
}
module.exports = { verifyUser, handlePassword } 