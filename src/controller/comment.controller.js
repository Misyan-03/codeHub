const { SOURCENOTFOUND } = require("../config/error")
const commentService = require("../service/comment.service")

class commentController {
    //发表评论
    async create(ctx, next) {
        //1.获取body的参数
        const { content, momentId } = ctx.request.body
        console.log(content, momentId)
        const { id: userId } = ctx.user
        // console.log(content, momentId, userId)
        // 2.操作数据库,将数据插入到数据库中
        const res = await commentService.create(momentId, content, userId)
        if (res) {
            ctx.body = {
                code: 0,
                message: '发表评论成功',
                data: res
            }
        }

    }
    //回复评论
    async reply(ctx, next) {
        const { content, momentId, commentId } = ctx.request.body
        const { id: userId } = ctx.user
        const res = await commentService.reply(momentId, content, userId, commentId)
        if (res) {
            ctx.body = {
                code: 0,
                message: '回复评论成功',
                data: res
            }
        }
    }
    //删除评论
    async remove(ctx, next) {
        const { commentId } = ctx.params
        const res = await commentService.removeComment(commentId)
        // console.log(res) false  !!转布尔类型
        ctx.body = {
            code: 0,
            message: '删除评论成功',
            data: res
        }
    }
}
module.exports = new commentController()