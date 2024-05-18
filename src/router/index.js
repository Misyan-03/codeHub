const fs = require('fs')
//自当导入程序
function registerRouter(app) {
    const files = fs.readdirSync(__dirname)
    for (let file of files) {
        if (!file.endsWith('.router.js')) continue
        const router = require(`./${file}`)
        app.use(router.routes())
        app.use(router.allowedMethods())
    }
}
module.exports = registerRouter