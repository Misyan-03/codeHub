// 项目执行代码
const koa = require('koa')
const bodyParser = require('koa-bodyparser')
// const userRouter = require('../router/user.router')
// const loginRouter = require('../router/login.router')
const registerRouter = require('../router')
const app = new koa()
app.use(bodyParser())
//
registerRouter(app)
// app.use(userRouter.routes())
// app.use(loginRouter.routes())
// //处理预检请求
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.allowedMethods())
module.exports = app