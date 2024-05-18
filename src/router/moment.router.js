const KoaRouter = require('@koa/router')
const { verifyAuth } = require('../middleware/login.middleware')
const { create, list, details, update, deleteContent, addLabels } = require('../controller/moment.controller')
const { verifyPermission } = require('../middleware/permission.middleware')
const { verifyLabelsExist } = require('../middleware/label.middleware')
//增
//评论接口
const momentRouter = new KoaRouter({ prefix: '/moment' })
momentRouter.post('/', verifyAuth, create)
//查
//获取动态列表
momentRouter.get('/', list)
//获取动态详情
momentRouter.get('/:momentId', details)

//删
// momentRouter.delete('/:momentId', verifyAuth, verifyMomentPermission, deleteContent)
//改,问题：登录的id，动态表的user_id一致才能修改，不然任何人都可以修改了，
// 所以还需要一个中间件来验证,只有当前登录的用户可以查询
// momentRouter.patch('/:momentId', verifyAuth, verifyMomentPermission, update)

// momentRouter.delete('/:momentId', verifyAuth, verifyPermission('moment'), deleteContent)
// momentRouter.patch('/:momentId', verifyAuth, verifyPermission('moment'), update)


momentRouter.delete('/:momentId', verifyAuth, verifyPermission, deleteContent)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)

/**
1. 是否登录
2. 验证是否有操作此动态的权限，不然任何用户都能操作，这是不对的
3. 额外的中间件，验证label的name是否在数据库中存在
   *如果存在直接使用，否则创建
4. 最后，所有的labels都在label表中
   *动态和label的关系添加到关系表中
 */
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelsExist, addLabels)

module.exports = momentRouter