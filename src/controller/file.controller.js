const fileService = require("../service/file.service")
const { SERVER_HOST,SERVER_POST } = require("../config/server")
class fileController {
    async create(ctx, next) {
        console.log(ctx.request.file)
        const { filename, mimetype, size } = ctx.request.file
        const { id: userId } = ctx.user
        //将图片信息和用户id存入数据库
        const result = await fileService.save(filename, mimetype, size, userId)
        //不能写死，在线上环境
        let avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/users/avatar/${userId}`
        //将头像地址信息，存到user表中
        const avatarRes = await fileService.updateUser(avatarUrl, userId)
        ctx.body = {
            code: 0,
            message: '图像上传成功',
            data: avatarUrl
        }
    }
}
module.exports = new fileController();  