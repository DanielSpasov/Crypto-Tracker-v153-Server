const router = require('express').Router()

const { upload } = require('../config/multer')

const newsService = require('../services/newsService')





router.get('/search', (req, res) => newsService.searchNews(req, res))
router.get('/getLatest', (req, res) => newsService.getLatest(req, res))
router.get('/image/:id', (req, res) => newsService.getImage(req, res))
router.get('/:id', (req, res) => newsService.getArticle(req, res))

router.post('/createArticle', (req, res) => newsService.createArticle(req, res))
router.post('/uploadImage', upload.single('file'), (req, res, next) => newsService.uploadImage(req, res, next))

router.delete('/:id', (req, res) => newsService.deleteArticle(req, res))

router.patch('/:id', (req, res) => newsService.editArticle(req, res))



module.exports = router