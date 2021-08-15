const multer = require('multer')
const fs = require('fs')



const storage = multer.diskStorage({
    destination: (req, file, callblack) => {
        callblack(null, 'uploads')
    },
    filename: (req, file, callback) => {
        if (req.headers.oldname) callback(null, `article_${req.headers.oldname}`)
        if (!req.headers.oldname) callback(null, `article_${file.originalname}`)
    }
})

const upload = multer({ storage })

module.exports = {
    upload
}