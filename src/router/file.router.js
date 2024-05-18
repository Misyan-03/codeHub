const KoaRouter = require('@koa/router')

const { verifyAuth } = require('../middleware/login.middleware')
const { uploadAvatar } = require('../middleware/file.middleware')
const {create} = require('../controller/file.controller')
// const { verifyPermission } = require('../middleware/permission.middleware')
const fileRouter = new KoaRouter({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, uploadAvatar,create)
module.exports = fileRouter
