const app = require('../app')
const { NAME_IS_EXIST, NAME_OR_PASSWORD_IS_REQUIRED, NAME_IS_NOT_EXIST, PASSWORD_IS_INCORRECT, UNAUTHORIZATION, UNPERMISSION, SOURCENOTFOUND } = require('../config/error')
//绑定错误事件，在main.js执行
app.on('error', (error, ctx) => {
    let code = 0
    let message = ''
    switch (error) {
        case NAME_OR_PASSWORD_IS_REQUIRED:
            code = -1001
            message = '用户名或密码不能为空'
            break;
        case NAME_IS_EXIST:
            code = -1002
            message = '用户名已经存在,不能使用'
            break;
        case NAME_IS_NOT_EXIST:
            code = -1003
            message = '用户名不存在'
            break;
        case PASSWORD_IS_INCORRECT:
            code = -1004
            message = '密码错误'
            break;
        case UNAUTHORIZATION:
            code = -1005
            message = '未授权,未授权或者token已经过期'
            break;
        case UNPERMISSION:
            code = -1006
            message = '没有权限修改'
            break;
        case SOURCENOTFOUND:
            code = -1007
            message = '资源不存在'
            break;
    }
    ctx.body = {
        code,
        message,
        error
    }
})