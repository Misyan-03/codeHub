const labelService = require("../service/label.service")

const verifyLabelsExist = async (ctx, next) => {
    //获取客户端传来的labels
    // const labels = ctx.request.body.labels
    let newsLabels = []
    const { labels } = ctx.request.body
    for (let name of labels) {
        const result = await labelService.queryLabelByName(name)
        const labelObject = { name }
        if (result) {  //获取name对应的label的id 
            labelObject.id = result.id //=>{labelName:xxx,id:xxx}
        } else { //插入name，并插入后的id
            const insertRes = await labelService.save(name)
            console.log(insertRes)
            /*
            ResultSetHeader {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 22,
  info: '',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0
}*/
            labelObject.id = insertRes.insertId
        }
        newsLabels.push(labelObject)
    }
    ctx.labels = newsLabels; //把新的label放到ctx上，供后面使用
    await next()
}
module.exports = {
    verifyLabelsExist
}