const router = require('express').Router()

const cryptoService = require('../services/cryptoService')



router.get('/getTop100', (req, res) => cryptoService.getTop100(req, res))
router.get('/addToWatchlist', (req, res) => cryptoService.addToWatchlist(req, res))
router.get('/removeFromWatchlist', (req, res) => cryptoService.removeFromWatchlist(req, res))



module.exports = router