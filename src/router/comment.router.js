const koaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create,reply,remove } = require('../controller/comment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')


// prefix前缀
const commentRouter = new koaRouter({ prefix: '/comment' })
//新增评论接口
commentRouter.post('/', verifyAuth, create)
//回复评论
commentRouter.post('/reply', verifyAuth, reply)
//删除评论
commentRouter.delete('/:commentId', verifyAuth, verifyPermission,remove)
//导出路由
module.exports = commentRouter