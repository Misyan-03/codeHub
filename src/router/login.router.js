const koaRouter = require('@koa/router')
const {verifyLogin,verifyAuth} = require('../middleware/login.middleware')
const {sign,test}=require('../controller/login.controller')
//中间件

// prefix前缀
const loginRouter = new koaRouter({ prefix: '/login' })
loginRouter.post('/',verifyLogin, sign)
//测试
loginRouter.get('/test',verifyAuth,test)
//导出路由
module.exports = loginRouter