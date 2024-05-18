const { UNPERMISSION, SOURCENOTFOUND } = require("../config/error")
const permissionService = require("../service/permission.service")
//1.
 /*const verifyMomentPermission = async (ctx, next) => {
     //获取登录id，修改动态的id
     const { momentId } = ctx.params
     const { id: userId } = ctx.user
     console.log(userId)
     //查询是否有修改的权限 WHERE id=1 AND user_id=21;
     const res = await permissionService.check(momentId, userId)
     if (!res) {
         ctx.app.emit('error', UNPERMISSION, ctx)
         return
     }
     //有权限，执行下一个中间件
     await next()
 }*/
//2.
/* const verifyPermission = function (table) {
     return async (ctx, next) => {
         //获取登录id，修改动态的id
         const { momentId } = ctx.params
         const { id: userId } = ctx.user
         console.log(userId)
         //查询是否有修改的权限 WHERE id=1 AND user_id=21;
         const res = await permissionService.check(momentId, userId)
         if (!res) {
             ctx.app.emit('error', UNPERMISSION, ctx)
             return
         }
         //有权限，执行下一个中间件
         await next()
     }
 } */
// 3.更通用,把他变动态，但表的命名要符合我们定义的规范 Id结尾
const verifyPermission = async (ctx, next) => {
    //获取登录id，修改动态的id
    const { id: userId } = ctx.user
    /* console.log(ctx.params)                  { momentId: '2' }
       console.log(Object.keys(ctx.params)[0])  momentId
       console.log(Object.keys(ctx.params))     [ 'momentId' ]
    */
    const keyName = Object.keys(ctx.params)[0]
    const resourceID = ctx.params[keyName]
    const resourceName = keyName.replace('Id', '')
    //保证是有这个资源
    const result = await permissionService.checkIsExist(resourceID, resourceName)
    if (!result) {
        ctx.app.emit('error', SOURCENOTFOUND, ctx)
        return
    }

    //查询是否有修改的权限 WHERE id=1 AND user_id=21;
    const res = await permissionService.check(resourceID, resourceName, userId)
    if (!res) {
        ctx.app.emit('error', UNPERMISSION, ctx)
        return
    }
    //有权限，执行下一个中间件
    await next()
}
module.exports = {
    verifyPermission
}