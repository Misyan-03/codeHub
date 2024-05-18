// const SEVER_PORT = 8000
// dotenv库：加载配置的变量，自动读取.env文件
const dotenv = require('dotenv')
dotenv.config()
//写在env中修改变得方便
module.exports = {
    SERVER_PORT,
    SERVER_HOST,
}=process.env
//使用
// 导入 const { SERVER_HOST } = require("../config/server")