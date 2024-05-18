const { UPLOAD_PATH } = require('../config/path')
const userService = require('../service/user.service')
const fs = require('fs')
class UserController {
    async create(ctx, next) {
        //1.获取用户传递来的信息
        const user = ctx.request.body
        /**判断，验证客户端传来的数据是否能保存到数据库
         * 1.判断用户名，密码是否为空
         * 2.name是否在数据库中已经存在
        */
        //这里太多了，我们可以把他做成中间件router/usr.router.js
        //1.
        /**   const { name, password } = user
          if (!name || !password) {
              return ctx.body = {
                  code: -1001,
                  message: '用户名或密码不能为空'
              }
          }
          //2.
          const values = await userService.findUserByName(name)
          if (values.length) {
              return ctx.body = {
                  code: -1002,
                  message: '用户名已经存在,不能使用',
              }
          }
          */
        //2.将user信息存储到数据库中
        const result = await userService.create(user)
        //3.查看操作结果，告知前端创建成功
        ctx.body = {
            message: '创建成功',
            data: result
        }
    }
    async showAvatar(ctx, next) {
        //1.获取用户id
        const { userId } = ctx.params
        //2.查询用户头像
        try {
            const avatarIfo = await userService.getAvatarByUserId(userId)
            const { filename, mimetype } = avatarIfo
            //3.返回结果
            ctx.response.set('content-type', mimetype)
            ctx.body = fs.readFileSync(`${UPLOAD_PATH}/${filename}`)
            // http://localhost:8000/users/avatar/21
        } catch (error) {
            ctx.body ={
                error,
                message:'此用户没有头像'
            }
        }
    }
}
module.exports = new UserController();