const router = require('express').Router()

const newsService = require('../services/newsService')



router.get('/getLatest', (req, res) => newsService.getLatest(req, res))

router.post('/createArticle', (req, res) => newsService.createArticle(req, res))

router.delete('/:id', (req, res) => newsService.deleteArticle(req, res))

router.get('/:id', (req, res) => newsService.getArticle(req, res))


module.exports = router