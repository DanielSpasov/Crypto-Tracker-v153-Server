const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, callblack) => {
        callblack(null, 'uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `article_${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}