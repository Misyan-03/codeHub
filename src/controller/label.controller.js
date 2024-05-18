const labelService = require("../service/label.service");

class labelController {
    //创建标签
    async create(ctx, next) {
        //获取标签名,存到数据库中
        const { name } = ctx.request.body;
        const result = await labelService.save(name);
        ctx.body = {
            code: 0,
            message: "创建标签成功",
            data: result
        }
    }
    //标签列表
    async list(ctx, next) {
        const { offset, limit } = ctx.query;
        const result = await labelService.getLabels(offset, limit);
        ctx.body = {
            code: 0,
            message: "获取标签成功",
            data: result
        }
    }
}
module.exports = new labelController();