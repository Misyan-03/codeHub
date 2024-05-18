const koaRouter = require('@koa/router')
const {create,showAvatar} = require('../controller/user.controller')
//中间件
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
// prefix前缀
const userRouter = new koaRouter({ prefix: '/users' })
//创建用户
userRouter.post('/', verifyUser, handlePassword, create)
//获取用户头像
userRouter.get('/avatar/:userId',showAvatar)
//导出路由
module.exports = userRouter