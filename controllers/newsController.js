const router = require('express').Router()

const newsService = require('../services/newsService')



router.post('/createArticle', (req, res) => newsService.createArticle(req, res))



module.exports = router