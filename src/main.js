// 项目执行代码
const app = require('./app/index.js')
const { SERVER_PORT } = require('./config/server')
require('./utils/handle-error.js')
app.listen(SERVER_PORT, () => {
    console.log(`服务器${SERVER_PORT}启动成功~`)
})