const momentService = require('../service/moment.service')
class momentController {
    //发表动态
    async create(ctx, next) {
        //获取发表的内容
        const { content } = ctx.request.body

        //动态由谁发布的token(id|name)
        const { id } = ctx.user
        //将相关动态保存数据库中
        const result = await momentService.create(content, id)
        ctx.body = {
            code: 0,
            message: '发布动态成功',
            data: result
        }

    }
    //列表
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const res = await momentService.queryList(offset, size)
        ctx.body = {
            code: 0,
            message: '查询成功',
            data: res
        }
    }
    //详情
    async details(ctx, next) {
        // 获取动态id
        const { momentId } = ctx.params;
        // 根据id查询动态
        const result = await momentService.queryDetails(momentId);
        ctx.body = {
            code: 0,
            message: '查询成功',
            data: result
        }
    }
    //修改
    async update(ctx, next) {
        //修改的id和内容
        const { momentId } = ctx.params;
        const { content } = ctx.request.body;
        // console.log(momentId, content)
        const res = await momentService.updateContent(content, momentId)
        ctx.body = {
            code: 0,
            message: '修改成功',
            data: res
        }
    }
    //删除
    async deleteContent(ctx, next) {
        const { momentId } = ctx.params;
        const res = await momentService.remove(momentId)
        ctx.body = {
            code: 0,
            message: '删除成功',
            data: res
        }
    }
    //为moment添加label
    async addLabels(ctx, next) {
        //拿到labels和momentId,让他俩产生关系
        const labels = ctx.labels
        // console.log(labels)
        const { momentId } = ctx.params
        // console.log(momentId)
        //插入关系表中
        try {
            for (let label of labels) {
                //判断label_id是否已经moment_id存在关系
                const result = await momentService.hasLabel(momentId, label.id)
                if (!result) {
                    //不存在关系做插入操作
                    const InsertResult = await momentService.addLabel(momentId, label.id)                              
                }
            }

            ctx.body = {
                labels,
                momentId
            }
        } catch (error) {
            ctx.body = {
                error,
                code: -1,
                message: '添加标签失败'
            }
        }

    }


}
module.exports = new momentController();