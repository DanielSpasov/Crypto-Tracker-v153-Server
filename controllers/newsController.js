const multer = require('multer')

const router = require('express').Router()

const newsService = require('../services/newsService')


const storage = multer.diskStorage({
    destination: (req, file, callblack) => {
        callblack(null, 'uploads')
    },
    filename: (req, file, callback) => {
        callback(null, `article_${file.originalname}`)
    }
})

const upload = multer({ storage })


router.get('/getLatest', (req, res) => newsService.getLatest(req, res))
router.get('/image/:id', (req, res) => newsService.getImage(req, res))
router.get('/:id', (req, res) => newsService.getArticle(req, res))

router.post('/createArticle', (req, res) => newsService.createArticle(req, res))
router.post('/uploadImage', upload.single('file'), (req, res, next) => newsService.uploadImage(req, res, next))

router.delete('/:id', (req, res) => newsService.deleteArticle(req, res))

router.patch('/:id', (req, res) => newsService.editArticle(req, res))



module.exports = router