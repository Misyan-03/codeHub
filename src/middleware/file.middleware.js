const multer = require('@koa/multer')
const { UPLOAD_PATH } = require('../config/path')
// 相对目录相对于启动目录
//头像上传
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, `${UPLOAD_PATH}`)
        }
        , filename: function (req, file, cb) {
            cb(null, Date.now() + '_' + file.originalname)
        }
    })

})
const uploadAvatar = upload.single('avatar')
module.exports = {
    uploadAvatar
}